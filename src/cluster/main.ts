// The Node.js cluster module enables you to create
// child processes that run simultaneously and
// share the same server port.

import cluster from 'cluster'
import http from 'http'
import os from 'os'

const cpuCount = os.cpus().length

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`)

  // Fork workers for each CPU core
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`)
  })
} else {
  // Workers can share any TCP connection
  // In this case, it is an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200)
    res.end(`Hello World from worker ${process.pid}\n`)
  }).listen(8000)

  console.log(`Worker ${process.pid} started`)
}

// node dist/cluster/main.js
