// Worker threads can share memory with the parent thread through
// SharedArrayBuffer, making communication between threads more
// efficient and faster.They still run in parallel but within
// the same process.

// Worker threads have less overhead compared to child processes
// since they share the same process space.

// Best suited for CPU - intensive JavaScript tasks that don't
// require the isolation of a separate Node.js environment.

import { parentPort } from 'worker_threads'

const calculateFibonacci = (n: number): number => {
  const fib = (n: number): number => (n < 2 ? n : fib(n - 1) + fib(n - 2))
  return fib(n)
}

parentPort?.on('message', (n: number) => {
  const result = calculateFibonacci(n)
  parentPort?.postMessage(result)
})
