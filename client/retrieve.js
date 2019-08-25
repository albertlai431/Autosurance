import './App.css';

import React from 'react';

import logo from './logo.svg';

function App() {
  var AWS = require('aws-sdk');

  AWS.config = new AWS.Config();
  AWS.config.accessKeyId = "***REMOVED***";
  AWS.config.secretAccessKey = "***REMOVED***";
  AWS.config.region = "us-east-1";

  // create JSON object for parameters for invoking Lambda function
  var pullParams = {
    FunctionName : 'predictImage',
    InvocationType : 'RequestResponse',
    LogType : 'None',
    Payload : JSON.stringify({"Body" : "0001.jpg"})
  };

  // create variable to hold data returned by the Lambda function
  var pullResults;

  var lambda = new AWS.Lambda();

  lambda.invoke(pullParams, function(error, data) {
    if (error) {
      prompt(error);
    } else {
      pullResults = JSON.parse(JSON.stringify(data)).Payload;
      console.log(pullResults);
    }
  });
  console.log(pullResults);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
  className = "App-link"
  href = "https://reactjs.org"
  target = "_blank"
  rel = "noopener noreferrer" > Learn React</a>
      </header><
        /div>
  );
}

export default App;
