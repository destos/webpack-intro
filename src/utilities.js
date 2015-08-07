export default class Robot{
  constructor(name) {
    this.name = name;
    this.alive = false;
    this.program = [];
  }
  needs_input() {
    return true;
  }
  is_alive() {
    if (this.is_alive) {
      this.add_to_program("<span class=\"robot-name\">" + this.name + "</span>" + " is" + (this.alive ? "" : " not") + " alive!");
    }
  }
  add_to_program(input) {
    this.program.push(input);
  }
  run_program() {
    document.write(this.program.join(" "));
  }
}
