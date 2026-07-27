const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../js/script.js');
const code = fs.readFileSync(file, 'utf8');
try {
  new Function(code);
  console.log("No syntax error found by new Function!");
} catch (e) {
  console.log("Error:", e.message);
  
  // To get the line number, we can use a library if available, but let's just log the error stack
  console.log(e.stack);
}
