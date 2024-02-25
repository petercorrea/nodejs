import fs from 'fs'
import https from 'https'

const options = {
  key: fs.readFileSync('private.key'),
  cert: fs.readFileSync('certificate.crt')
}

https.createServer(options, (req, res) => {
  res.writeHead(200)
  res.end('Hello Secure World\n')
}).listen(443, () => {
  console.log('Server listening on port 443')
})
