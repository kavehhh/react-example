const tracer = require('ls-trace').init(
   {
 	experimental: {
 	  b3: true
 	 },
 	 debug: true
   }
 )

const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => res.send('Hello Server!'))

app.get('/test', function (req, res) {
  console.log(req.headers);
  res.send('gang gang gang');
})

app.listen(port, () => console.log(`Server app listening on port ${port}!`))