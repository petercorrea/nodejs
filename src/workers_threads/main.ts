import { Worker } from 'worker_threads'

console.log('Main thread start')

const worker = new Worker('./dist/worker_threads/fibonacciWorker.js')

worker.on('message', (result) => {
  console.log(`Fibonacci result: ${result}`)
})
worker.on('error', (error: string) => {
  console.error(`Worker error: ${error}`)
})
worker.on('exit', (code) => {
  if (code !== 0) console.error(`Worker stopped with exit code ${code}`)
})

worker.postMessage(50) // 12_586_269_025

setInterval(() => { console.log('Main thread is not blocked...') }, 1000)
