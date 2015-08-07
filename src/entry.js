require('./style.css');
require('./picky-designer.styl')

import Robot from "./utilities"

var robot = new Robot("Johnny 5");
robot.is_alive();
robot.alive = true;
robot.is_alive();
robot.add_to_program("Needs input!");
robot.run_program();
