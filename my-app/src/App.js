import React from 'react';
import logo from './logo.svg';
import './App.css';
var opentracing = require('opentracing');
var lightstep   = require('lightstep-tracer');
const request = require('request');

const tracer = opentracing.initGlobalTracer(new lightstep.Tracer({
    access_token   : process.env.LIGHTSTEP_ACCESS_TOKEN,
    component_name : 'node-client',
    collector_host : 'localhost',
    collector_port : 8181,
    collector_encryption : 'none',
    propagators    : {
      [opentracing.FORMAT_HTTP_HEADERS]: new lightstep.B3Propagator(),
      [opentracing.FORMAT_TEXT_MAP]: new lightstep.B3Propagator()
    }
}));

function testLightstep() {
  var span = opentracing.globalTracer().startSpan('clientStart');
  span.log({ event : 'query_started' });

  var spanContext = span.context();
  var carrier = {};
  opentracing.globalTracer().inject(spanContext, opentracing.FORMAT_HTTP_HEADERS, carrier);
  console.log(carrier);
  //carrier['x-b3-traceid'] = carrier['x-b3-traceid'].substring(16) + carrier['x-b3-traceid'].substring(0,16)

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
          Kaveh
          <button onClick={testLightstep}>
            Activate Trace
          </button>
      </header>
    </div>
  );
}

export default App;