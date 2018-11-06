/**
 * Copyright 2016 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var TJBot = require('tjbot');
var config = require('./config');

// obtain our credentials from config.js
var credentials = config.credentials;

// obtain user-specific config
var WORKSPACEID = config.conversationWorkspaceId;

// these are the hardware capabilities that TJ needs for this recipe
var hardware = ['microphone', 'speaker', 'servo', 'led'];

// set up TJBot's configuration
var tjConfig = {
    log: {
        level: 'verbose'
    }
};

// instantiate our TJBot!
var tj = new TJBot(hardware, tjConfig, credentials);

var inConversation = false;
var userName = "";
var counter = 0;
var welcomeCounter = 0;
var nameQueryCounter = 0;
var transferFundsCounter = 0;

// listen for utterances with our attentionWord and send the result to
// the Conversation service
tj.listen(function(msg) {
    // check to see if they are talking to TJBot
    if (true) {
        var turn = msg;

        // send to the conversation service
        tj.converse(WORKSPACEID, turn, function(response) {

/// GET THE INTENT AND THE ACTION WE ARE PERFORMING
var intent = null;
var action = null;
if (response.object.intents && response.object.intents[0])
{
console.log(response.object.intents[0].intent);
intent = response.object.intents[0].intent;
console.log("intent = " + intent);
}
if (response.object.context && response.object.context)
{
console.log(response.object.context);
action = response.object.context.action;
//userName = response.object.context.userName;
console.log("action = " + action);
}
billAmount = 500;
console.log("BEFORE IF " + action + "," + nameQueryCounter);
if (action != null && action == 'nameQuery' && nameQueryCounter++ == 0) 
{
console.log("IN HERE " + nameQueryCounter);
  nameQueryCounter = 1;
  userName = "Gavin";
  tj.speak("Hello " + userName + ",,,How was class today?");
}
if (intent != null && intent == 'hb_welcome' && action == 'welcome' && welcomeCounter++ == 0 ) 
{
   inConversation = true;
   counter = 0;
   tj.wave(); 
   //setTimeout(function() { tj.speak("OK then. Talk to you later"); inConversation = false;}, 15000);
}
if (action != null && action == 'payBill' && counter++ == 0) 
{
   // Run API for Balances API
   //API CALL RESULT
//INSERT API CODE HERE
doBalanceAPICall(function(response) {
console.log("API CALL RESPONSE = " + response);
   var result = response;
   if (result > billAmount)
   {
       tj.speak("Great. You have enough funds in your account, and I've just paid your rent.  Is there anything else you need?");
       tj.shine("green");
       //tj.wave();
       //setTimeout(function() { tj.speak("OK then. Talk to you later"); inConversation = false;}, 15000);
   }
   else
   {
       tj.speak("Bad News. You don't have enough money in your account.  Would you like me to transfer funds into the account?");
       tj.shine("red");
   }
});
   
}
else if (action != null && action == 'transferFunds' && transferFundsCounter++ == 0) 
{
doTransferFundsAPICall(function(response) {
console.log("API CALL RESPONSE = " + response);
       tj.speak("Great. You now have enough funds in your account, and I've just paid your rent.  Is there anything else you need?");
       tj.shine("green");
});
}
else
    if (!response.description.startsWith("Yes, you can send him"))
       tj.speak(response.description);
});
    } //true
});

function doBalanceAPICall(callback)
{
var https = require('https');

/**
 * HOW TO Make an HTTP Call - POST
 */
// do a POST request
// create the JSON object
jsonObject = JSON.stringify({
    "OperatingCompanyIdentifier" : "815",
    "ProductCode" : "DDA",
    "PrimaryIdentifier" : "00000000000000822943114"
});
 
// prepare the header
var postheaders = {
    'Content-Type' : 'application/json',
    'Content-Length' : Buffer.byteLength(jsonObject, 'utf8')
};
 
// the post options
var optionspost = {
    host : 'api119622live.gateway.akana.com',
    port : 443,
    path : '/account/transactions',
    method : 'POST',
    headers : postheaders
};

var RR = [];

 
//console.info('Options prepared:');
//console.info(optionspost);
//console.info('Do the POST call');
 
// do the POST call
var reqPost = https.request(optionspost, function(res) {
    //console.log("statusCode: ", res.statusCode);
    // uncomment it for header details
//  //console.log("headers: ", res.headers);
 
    res.on('data', function(d) {
        //console.info('POST result:\n');
        process.stdout.write(d);
response = 400;
if (userName == 'Gavin')
    response = 400;
else if (userName == 'Tim')
    response = 1000;

        callback(response);
        //console.info('\n\nPOST completed');
    });
});

 
// write the json data
reqPost.write(jsonObject);
reqPost.end();
reqPost.on('error', function(e) {
    console.error(e);
});
}

function doTransferFundsAPICall(callback)
{
var https = require('https');

/**
 * HOW TO Make an HTTP Call - POST
 */
// do a POST request
// create the JSON object
jsonObject = JSON.stringify({
    "personalUserID": "M01260604",
    "channelCode": "OLB_MM",
    "transactionTypeCode": "REGPMT",
    "fromOperatingCompanyIdentifier": "288",
    "fromProductCode": "DDA",
    "fromPrimaryAccountIdentifier": "100100511516",
    "fromAccountType": "SAVINGS",
    "toOperatingCompanyIdentifier": "52",
    "toProductCode": "CCD",
    "toPrimaryAccountIdentifier": "4718240047142264",
    "requestedTransferAmount": "200",
    "identityIdentifier": "MOBLBNKG",
    "paymentType": "OtherAmount",
    "paymentTypeCode": "FUTUREPMTMADETHRUWEB",
    "effectiveDate": "2016-01-21",
    "isRecurring": "true",
    "selectedDayOfMOnth": "25",
    "enhancedAutoPayTypeCode": "F"
}
);

// prepare the header
var postheaders = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(jsonObject, 'utf8')
};

// the post options
var optionspost = {
    host: 'api132269live.gateway.akana.com',
    port: 443,
    path: '/fundstransfer',
    method: 'POST',
    headers: postheaders
};

// do the POST call
var reqPost = https.request(optionspost, function (res) {
    console.log(res.statusCode);
    // uncomment it for header details
    //  //console.log("headers: ", res.headers);

    res.on('data', function (d) {
        //console.info('POST result:\n');
        //process.stdout.write(d);
        callback(d);
     //console.info('\n\nPOST completed');
    });
});

// write the json data
reqPost.write(jsonObject);
reqPost.end();
reqPost.on('error', function (e) {
    console.error(e);
});
}
