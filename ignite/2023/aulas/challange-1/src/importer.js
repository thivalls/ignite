import fs from 'fs'
import { parse } from 'csv-parse';

(async () => {
  // Initialise the parser by generating random records

  const parser = fs.createReadStream('./import.csv')
    .pipe(
        parse({})
    )
  // Intialise count
  let count = 0;
  // Report start
  process.stdout.write('start\n');
  // Iterate through each records
  for await (const record of parser) {
    if(count === 0) {
        count++
        continue
    }
    const data = record.toString().split(',');
    const myObject = {
        title : data[0],
        description : data[1]
    }
    await fetch("http://localhost:1313/tasks", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(myObject) // body data type must match "Content-Type" header
      });
  }
})();