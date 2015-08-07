var utilities = require('./utilities');
var program = ["Johnny 5 is alive!"];
if (utilities.needs_input()) {
  program.push("Needs input!");
}
document.write(program.join(" "));
