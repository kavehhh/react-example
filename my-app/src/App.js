import React from 'react';
import logo from './logo.svg';
import './App.css';
const request = require('request');
var opentracing = require('opentracing');
var lightstep   = require('lightstep-tracer');

const tracer = new lightstep.Tracer({
    access_token   : process.env.LIGHTSTEP_ACCESS_TOKEN,
    component_name : 'node-client',
    collector_host : 'ingest.lightstep.com',
    collector_port : 443,
    collector_encryption : 'tls',
    verbosity : 4,
    propagators    : {
      [opentracing.FORMAT_HTTP_HEADERS]: new lightstep.B3Propagator(),
      [opentracing.FORMAT_TEXT_MAP]: new lightstep.B3Propagator()
    }
});
opentracing.initGlobalTracer(tracer);

function testLightstep() {
  console.log(tracer);

  var span = tracer.startSpan('clientStart');
  span.log({ event : 'query_started' });

  var spanContext = span.context();
  var carrier = {};
  tracer.inject(spanContext, opentracing.FORMAT_HTTP_HEADERS, carrier);
  console.log(carrier);

  var options = {
    url: 'http://localhost:3001/test',
    headers: carrier
  };

  console.log(options);

  function callback(err, res, body) {
    if (err) { return console.log(err); }
    console.log(body);
  }

  request(options, callback);

  span.finish();
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          Hi!
          <button onClick={testLightstep}>
            Activate Trace
          </button>
      </header>
    </div>
  );
}

export default App;
