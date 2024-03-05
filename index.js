const fs = require("fs");
const DATA = JSON.parse(fs.readFileSync("./heartrate.json", "utf8"));
let consolidateDates = {};

let output = [];
// Group data by date
for (let i = 0; i < DATA.length; i++) {
    const DATE = DATA[i].timestamps.startTime.split("T")[0];
    console.log("DATES:", DATE);
    // Set the unique Dates into the Consolidated Dates array
    if (!consolidateDates[DATE]) {
        consolidateDates[DATE] = [];
    }
    consolidateDates[DATE].push(DATA[i].beatsPerMinute);
}
console.log("Consolidated Dates with BPM's:", consolidateDates);

// Calculate min, max, median and latestDataTimestamp for each DATE
for (let dates in consolidateDates) {
    let beatsPerMinute = consolidateDates[dates];
    let maxHeartRate = Math.max(...beatsPerMinute);
    let minHeartRate = Math.min(...beatsPerMinute);
    console.log(`Date: ${dates} , Min heart rate: ${minHeartRate},Max heart rate: ${maxHeartRate}`);
    const min = beatsPerMinute[0];
    const max = beatsPerMinute[beatsPerMinute.length - 1];
    const median = beatsPerMinute[Math.floor(beatsPerMinute.length / 2)];

    output.push({ dates, min, max, median });
}
// Write output to 'output.json'
fs.writeFileSync('output.json', JSON.stringify(output,null,2));
