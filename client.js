const request = require('request');
var opentracing = require('opentracing');
var lightstep   = require('lightstep-tracer');

opentracing.initGlobalTracer(new lightstep.Tracer({
    access_token   : '<access_token>',
    component_name : 'node-client',
    collector_host : 'localhost',
    collector_port : 8181,
    verbosity      : 4,
    collector_encryption : 'none',
    propagators    : {
    	[opentracing.FORMAT_HTTP_HEADERS]: new lightstep.B3Propagator(),
        [opentracing.FORMAT_TEXT_MAP]: new lightstep.B3Propagator()
    }
}));

var span = opentracing.globalTracer().startSpan('clientStart');
span.log({ event : 'query_started' });

var spanContext = span.context();
var carrier = {};
opentracing.globalTracer().inject(spanContext, opentracing.FORMAT_HTTP_HEADERS, carrier);
console.log(carrier);
carrier['x-b3-traceid'] = carrier['x-b3-traceid'].substring(16) + carrier['x-b3-traceid'].substring(0,16)
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