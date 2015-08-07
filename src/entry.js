require('./picky-designer.styl');
require('./style.css');

import Robot from './utilities.js';

var robot = new Robot("Johnny 5");
robot.is_alive();
robot.alive = true;
robot.is_alive();
robot.add_to_program("Needs input!");
robot.run_program();
