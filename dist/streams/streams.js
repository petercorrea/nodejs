import fs from 'fs';
import path from 'path';
import { Transform } from 'stream';
// Setup performance observer
const perfObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
        console.log(`${entry.name}: ${entry.duration}ms`);
    });
    console.log('Memory Usage: ', process.memoryUsage());
});
perfObserver.observe({ entryTypes: ['measure'], buffered: true });
// Create large file
const fileStream = fs.createWriteStream(path.join(path.resolve(), 'largeTextFile.txt'));
fileStream.on('finish', () => {
    // Process func
    const uppercaseTransform = new Transform({
        transform(chunk, encoding, callback) {
            this.push(chunk.toString().toUpperCase());
            callback();
        }
    });
    // Start performance monitoring
    performance.mark('start');
    // Process file on 'finish'
    const readStream = fs.createReadStream('largeTextFile.txt');
    const writeStream = fs.createWriteStream('outputFile.txt');
    readStream
        .pipe(uppercaseTransform)
        .pipe(writeStream)
        .on('finish', () => {
        performance.mark('end');
        performance.measure('File processing', 'start', 'end');
        // Force garbage collection to get a more accurate memory usage reading
        if (global?.gc != null) {
            global.gc();
        }
        else {
            console.warn('Garbage collection is not exposed. Run the program with `--expose-gc`.');
        }
    });
});
for (let i = 0; i < 1_000_000_000; i++) {
    // manually handle back pressure
    const overWatermark = fileStream.write(`${i}: This is some looooooooooooooong string of text.\n`);
    if (!overWatermark) {
        await new Promise((resolve) => {
            fileStream.once('drain', resolve);
        });
    }
}
fileStream.end();
// run "node --expose-gc --max-old-space-size=20480 streams.js"
