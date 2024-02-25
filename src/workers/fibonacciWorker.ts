import { parentPort } from 'worker_threads'

const calculateFibonacci = (n: number): number => {
  const fib = (n: number): number => (n < 2 ? n : fib(n - 1) + fib(n - 2))
  return fib(n)
}

parentPort?.on('message', (n: number) => {
  const result = calculateFibonacci(n)
  parentPort?.postMessage(result)
})
