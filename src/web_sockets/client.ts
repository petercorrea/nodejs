import WebSocket from 'ws'

const socket = new WebSocket('ws://localhost:8080')

socket.onopen = function (event) {
  console.log('Connected to the server')
  // Send a message to the server
  socket.send('Hello, server!')
}

socket.onmessage = function (event) {
  console.log('Message from server:', event.data)
}
