//  Each child process runs in a completely separate memory space and
// execution environment.This means they have a separate V8 engine instance,
// Node.js event loop, and memory space.

// Communication between the parent process and child processes
// occurs through inter - process communication(IPC), which can be
// set up when spawning a child process. This communication is more
// costly than sharing memory because it involves serializing and
// deserializing messages.

// Spawning a new child process involves more overhead compared to
// spawning a worker thread, due to the need to create a completely
// new execution environment.

// They're most useful for application isolation and multi-core computations

function calculateFibonacci (n: number): number {
  if (n < 2) {
    return n
  }
  return calculateFibonacci(n - 1) + calculateFibonacci(n - 2)
}

process.on('message', (n: number) => {
  const result = calculateFibonacci(n)
  if (process.send != null) {
    process.send(result)
    process.exit()
  }
})
