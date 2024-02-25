import { WebSocketServer } from 'ws'

const wss = new WebSocketServer({ port: 8080 })

wss.on('connection', function connection (ws) {
  console.log('A new client connected.')

  ws.on('message', function incoming (message: string) {
    console.log('received: %s', message)

    // Echo the message back to the client
    ws.send(`Server received: ${message}`)
  })

  ws.send('Welcome to the WebSocket server!')
})

console.log('WebSocket server started on ws://localhost:8080')
