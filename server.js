const tracer = require('ls-trace').init({
  experimental: {
    b3: true
  }
})

const express = require('express')
const cors = require('cors')
const app = express()
const port = 3001

app.use(cors());

app.get('/', function (req, res) {
	console.log(req.headers);
	res.send('Hello Server!') 
})

app.get('/test', function (req, res) {
  console.log(req.headers);
  res.send('send response');
})

app.listen(port, () => console.log(`Server app listening on port ${port}!`))