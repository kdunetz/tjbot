var TJBot = require("tjbot");

// You can change the voice of the robot to your favorite voice.
var voice = 'en-US_MichaelVoice';
// Some of the available options are:
// en-US_AllisonVoice
// en-US_LisaVoice
// en-US_MichaelVoice (the default)

// Credentials for Watson Speech to Text service
var STTUsername = '4af71d53-934d-497b-8e22-e7b1a27afcb7';
var STTPassword = 's7ZphfkbZBIa';

// Credentials for Watson Conversation service
var ConUsername = 'f472ec31-7108-4288-8098-4c03617da12f';
var ConPassword = 'y4klmz8rzxEA';
var ConWorkspace = '50b4a170-aecd-4481-bc0f-244264b6d48a'

//Credentials for Watson Tone Analyzer service
var ToneUsername = 'b56b3368-cbb6-4c69-980d-53fb1d110b64';
var TonePassword = 'Jkl3qSkFIsg1';

//Credentials for Watson Text to Speech service
var TTSUsername = '5ec638ac-1d67-4c0f-aad1-cbc6db0b6e09';
var TTSPassword = 'RfyjhknLrugG';

// Credentials for Watson Discovery service
var DiscoUsername = 'c77d2f43-f8b2-492c-9227-7d0960d62b58';
var DiscoPassword = 'gpZk2nXmeTqH';
var DiscoEnvironmentId = '';
var DiscoCollectionId = '';

var hardware = ['led', 'servo', 'microphone', 'speaker', 'camera'];
var configuration = {
    robot: {
        gender: 'male'
    },
    listen: {
        language: 'en-US'
    },
    speak: {
        language: 'en-US'
    }
};
var credentials = {
    conversation: {
        username: ConUsername,
        password: ConPassword
    },
    speech_to_text: {
        username: STTUsername,
        password: STTPassword
    },
    text_to_speech: {
        username: TTSUsername, 
        password: TTSPassword
    },
    tone_analyzer: {
        username: ToneUsername, 
        password: TonePassword
    },
    visual_recognition: {
        api_key: "cd0ffd366486fb2b1101e32e971aad84d6e47f66" 
    }
}
var tj = new TJBot(hardware, configuration, credentials);

tj.wave();
//tj.shine("red");
/*
tj.analyzeTone("hello world").then(function(response) {
    console.log(JSON.stringify(response,null,2)); 
});
*/


var i = 0;

setInterval(function() {
   //tj.wave();
   console.log("IN HERE");
   //tj.speak("Hi Hulia");
   console.log(i);
   if (i++ % 2)
      tj.shine("red");
   else
      tj.shine("blue");

tj.see().then(function(objects) {
    console.log(JSON.stringify(objects,null,2)); 
});
tj.read().then(function(texts) {
    console.log(JSON.stringify(texts,null,2));
});

}
, 30000);


tj.listen(function(text) {
   console.log(text); 
   console.log("in listening");
tj.converse(ConWorkspace, text.trim(), function(response) {
    console.log(JSON.stringify(response,null,2)); 
    console.log(JSON.stringify(response.object.output.text, null,2));
    var speak = response.object.output.text[0];
    if (speak.length == 0)
      speak = response.object.output.text[1];
    tj.speak(speak);
});
   if (text.trim() === "wave") tj.wave();
   if (text.trim().startsWith('Ryan')) { console.log("in here Ryan"); 

}
   if (text.trim() === "lower arm") tj.lowerArm();
   if (text.trim() === "blue") tj.shine("blue");
   if (text.trim() === "red") tj.shine("red");
   if (text.trim() === "orange") tj.shine("orange");
   if (text.trim() === "green") tj.shine("green");
   if (text.trim() === "arm back") tj.armBack();
});
