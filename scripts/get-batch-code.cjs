const fs = require('fs');
const path = require('path');
const batchNum = process.argv[2];
if (!batchNum) {
  console.error('Please specify batch number.');
  process.exit(1);
}
const codePath = path.join(__dirname, 'extraction-payloads', `batch-${batchNum}.js`);
if (!fs.existsSync(codePath)) {
  console.error(`Batch ${batchNum} does not exist at ${codePath}`);
  process.exit(1);
}
const content = fs.readFileSync(codePath, 'utf8');
console.log(content);
