import fs from 'fs';
import path from 'path';
import { performance, PerformanceObserver } from 'perf_hooks';
// Setup Performance Observer
const perfObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
        console.log(`${entry.name}: ${entry.duration}ms`);
    });
    console.log('Memory Usage: ', process.memoryUsage());
});
perfObserver.observe({ entryTypes: ['measure'], buffered: true });
// Function to create a large file
function createLargeFile() {
    const filePath = path.join(path.resolve(), 'largeTextFile.txt');
    let fileContent = '';
    for (let i = 0; i < 100_000_000; i++) {
        fileContent += 'This is some looooooooooooooong string of text.\n';
    }
    fs.writeFileSync(filePath, fileContent);
}
// Function to read, transform, and write file content without streams
function processFileWithoutStreams() {
    const inputFile = path.join(path.resolve(), 'largeTextFile.txt');
    const outputFile = path.join(path.resolve(), 'outputFile.txt');
    // Start performance monitoring
    performance.mark('start');
    const fileContent = fs.readFileSync(inputFile, 'utf-8');
    const transformedContent = fileContent.toUpperCase();
    fs.writeFileSync(outputFile, transformedContent);
    performance.mark('end');
    performance.measure('File processing without streams', 'start', 'end');
    // Optionally, force garbage collection to get a more accurate memory usage reading
    if (global?.gc != null) {
        global.gc();
    }
    else {
        console.warn('Garbage collection is not exposed. Run the program with `--expose-gc`.');
    }
}
// Create a large file and then process it
createLargeFile();
processFileWithoutStreams();
// // run "node --expose-gc filesync.js"
