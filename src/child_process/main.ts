import { fork } from 'child_process'

const fibonacciIndices = [40, 45, 48, 50]

console.log(`Calculating Fibonacci numbers for indices: ${fibonacciIndices.join(', ')}`)

fibonacciIndices.forEach((index) => {
  const child = fork('./dist/child_process/fibonacciProcess.js')

  child.on('message', (result: number) => {
    console.log(`Fibonacci number for index ${index}: ${result}`)
  })

  child.send(index)
})
