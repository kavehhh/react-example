To run...

Open up 2 terminal windows

In first window you need to set two env variables..

`export DD_TRACE_AGENT_URL=http://localhost:8181` //change to your host and port

`export DD_TRACE_GLOBAL_TAGS="lightstep.service_name:node-server,lightstep.access_token:<access_token>"`

In the second window..

`cd my-app`

`npm start`

That should open up a window in the browser for you. There's a button that says "Activate trace". Hit that button. Check Lightstep Explorer for the trace. 
