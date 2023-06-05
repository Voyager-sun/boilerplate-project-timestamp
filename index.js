// index.js
// where your node app starts

// init project
var express = require('express')
var app = express()

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors')
app.use(cors({ optionsSuccessStatus: 200 })) // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'))

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html')
})

// your first API endpoint...
// app.get('/api/hello', function (req, res) {
//   res.json({ greeting: 'hello API' })
// })

function isValidDate(date) {
  return date instanceof Date && !isNaN(date.getTime())
}

app.get('/api/:date?', function (req, res) {
  let date
  if (!isNaN(req.params.date)) {
    date = Number(req.params.date)
  } else {
    date = req.params.date
  }

  let data = {}
  if (date && isValidDate(new Date(date))) {
    data = {
      unix: new Date(date).getTime(),
      utc: new Date(date).toGMTString(),
    }
  } else if (date && !isValidDate(date)) {
    data = { error: 'Invalid Date' }
  } else {
    data = {
      unix: new Date().getTime(),
      utc: new Date().toGMTString(),
    }
  }
  console.log('params', date)
  console.log(data)
  res.json(data)
})

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
