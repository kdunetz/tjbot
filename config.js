/*
User-specific configuration
    ** IMPORTANT NOTE ********************
    * Please ensure you do not interchange your username and password.
    * Hint: Your username is the lengthy value ~ 36 digits including a hyphen
    * Hint: Your password is the smaller value ~ 12 characters
*/ 

exports.conversationWorkspaceId = '8f1c9ce1-4e15-472b-be70-460ced182b16'; // replace with the workspace identifier of your conversation
exports.conversationWorkspaceId = 'b4062ba2-59f1-48c8-964f-489c6ff40ebe'; // replace with the workspace identifier of your conversation

// Create the credentials object for export
exports.credentials = {};

// Watson Conversation
// https://www.ibm.com/watson/developercloud/conversation.html
exports.credentials.conversation = {
	password: 'MYdmzcdNPyID',
	username: '6916abbd-8016-435d-badd-9e3ccc5cd050'
};

// Watson Speech to Text
// https://www.ibm.com/watson/developercloud/speech-to-text.html
exports.credentials.speech_to_text = {
	password: 'csk3L2EYV8n2',
	username: '770202d6-b472-4a86-8ea6-31f046fc1ff4'
};

// Watson Text to Speech
// https://www.ibm.com/watson/developercloud/text-to-speech.html
exports.credentials.text_to_speech = {
	password: '87stmOnIDteK',
	username: 'adf563a2-0e83-43e1-b01d-0cf7c5df1c72'
};
