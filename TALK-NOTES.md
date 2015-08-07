# How it works

[What is webpack?](https://webpack.github.io/docs/what-is-webpack.html)

* mainly a bundler
  * It can take many resources and comebine them into one, efficiently divided parts
* module requirement standards have not been unified in JS, and differs between libraries and modules
  * competing standards are commonJS and AMD
  * some modules express themselves in both
* webpack tries to solve the problems many other bundlers face when dealing with large applications and their requirements.
  * it has the ability to split assets up into logical chunks for more efficient loading

# Getting setup

Prerequisites:
* nodeJs and npm installed

**A basic webpack configuration file**

`webpack.config.js`
```javascript
module.exports = {
    entry: "./src/entry.js",
    output: {
        path: __dirname + '/dest/',
        filename: "bundle.js"
    }
};
```

You could also do:
```bash
webpack ./src/entry.js ./dest/bundle.js
```

If webpack is installed globally

**Da HTML**

`index.html`
```html
<html>
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <script type="text/javascript" src="dest/bundle.js" charset="utf-8"></script>
    </body>
</html>
```

**The start of our large JS app**

`entry.js`
```javascript
document.write("I'm alive!");
```

| tag `setting-up`

**Run it!**
```bash
npm run build && open index.html
```

look magic!

You should see a webpage with `I'm alive!` in the body.

Wait that isn't impressive at all…

# Understanding Loaders

How can webpack know what your desires are in building your application? Many times you want to include some css along with your JS component or jQuery plugin. Howe can webpack help with this?

Loaders to the rescue! have you ever used nodeJS and had to include another module into your script? You were using a module loader. The same applies here. But what if we want to include many different types of modules ( most of which compile down to JS ).

By default webpack only includes a loader for js files.

The javascript loaders can use both requirejs and commonjs module patterns, we'll be using the requireJS syntax because it's easier!

[List of loaders](https://webpack.github.io/docs/list-of-loaders.html)

Let's test it out.

`utilities.js`
```javascript
document.write("Need input ");
```

`entry.js`
```javascript
require('./utilities');
document.write("Johnny 5 is alive!");
```

| tag `js-require`

**Run it!**
```bash
npm run build && open index.html
```

Cool, notice the order our two `document.write` methods output in.

Let's now share code from one module to another.

`utilities.js`
```javascript
module.exports = {
  needs_input: function(){
    return true;  
  }
}
```

`entry.js`
```javascript
var utilities = require('./utilities');
var program = ["Johnny 5 is alive!"];
if (utilities.needs_input()) {
  program.push("Needs input!");
}
document.write(program.join(" "));
```

| tag 'exports'

# Adding our css loaders

First We need to install the loaders with NPM.

```
npm install css-loader style-loader --save
```

`style.css`
```css
body {
  background-color: black;
  color: white;
  font-size: 20px;
  text-align: center;
}
```

`entry.js`
```javascript
require('!style!css!./style.css');
var utilities = require('./utilities');
var program = ["Johnny 5 is alive!"];
if (utilities.needs_input()) {
  program.push("Needs input!");
}
document.write(program.join(" "));
```

**Run it!**
```bash
npm run build && open index.html
```

This is called binding loaders, we've specifically specified them when including a module.

| tag `styles`

Now let's update the config. It's quite silly to have to always specify what loaders to use in your requirements. ( binding )

`webpack.config.js`
```javascript
module.exports = {
    entry: "./src/entry.js",
    output: {
        path: __dirname + '/dest/',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};
```

`entry.js`
```javascript
require('./style.css');
var utilities = require('./utilities');
var program = ["Johnny 5 is alive!"];
if (utilities.needs_input()) {
  program.push("Needs input!");
}
document.write(program.join(" "));
```

**Run it!**
```bash
npm run build && open index.html
```

Ah yes, much better and the same result.

# Source maps!

Man all that combined JS just isn't jiving with me, what am I to do?

Well use source maps of course.

`webpack.config.js`
```javascript
module.exports = {
  entry: "./src/entry.js",
  output: {
    path: __dirname + '/dest/',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: "style!css" }
    ]
  },
  devtool: "source-map"
};
```

| tag `source-maps`

# Adding hot reloading to our project with webpack-dev-server

That's all find and dandy, but how about something that helps me never have to refresh a webpage while developing ever again? That's what I'm really after.

Well you're in luck today. For the low price of FREE, we've got what you need.

```bash
npm install webpack webpack-dev-server --save
```

`webpack.config.hot.js`
```javascript
var base = require('./webpack.config.js');

module.exports = {
  entry: [
    "webpack/hot/only-dev-server",
    "./src/entry.js"
  ],
  output: {
    filename: "dest/bundle.js"
  },
  module: base.module,
  devtool: "source-map"
};
```

`package.json`
```javascript
"scripts": {
  "build": "webpack",
  "server-hot": "webpack-dev-server --config webpack.config.hot.js --hot --progress --colors --port 2992 --inline",
  "hot": "npm run server-hot"
},
"bin": {
  "webpack": "node_modules/webpack/bin/webpack.js",
  "webpack-dev-server": "node_modules/webpack-dev-server/bin/webpack-dev-server.js"
},
```

Now run the dev server

```bash
npm run hot
```

Then open up `http://127.0.0.1:2992` in your browser

| tag `hot`

# Extending our javascript loader with pre processors

https://babeljs.io/

```bash
npm install babel-loader --save
npm install babel-runtime --save
```

`utilities.js`
```javascript
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
      this.add_to_program(this.name + " is" + (this.alive ? "" : " not") + " alive!");
    }
  }
  add_to_program(input) {
    this.program.push(input);
  }
  run_program() {
    document.write(this.program.join(" "));
  }
}
```

`entry.js`
```javascript
require('./style.css');

import Robot from "./utilities"

var robot = new Robot("Johnny 5");
robot.is_alive();
robot.alive = true;
robot.is_alive();
robot.add_to_program("Needs input!");
robot.run_program();
```

| tag `babel`

# Understanding the plugin process

Plugins are most often other npm modules that add capabilities to the buils process or webpack.

Some examples of plugins:

* minifiy our code
* gather stats about files that are built
* split out our build modules into seperate files
* library specific transformers and minifiers
* fetch required remote resources for insertion into the build
* pull local binary resources like images into the build
* adding dynamic module headers for release builds
* a lot more

[List of plugins](https://webpack.github.io/docs/list-of-plugins.html)

# Using the Dedupe and UglifyJs plugins to minify our code

Adding our plugins

`webpack.config.js`
```javascript
var webpack = require("webpack");

module.exports = {
  ...
  "plugins": [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ output: {comments: false} })
  ]
};
```

**Run it!**
```bash
npm run build && open index.html
```

Also check out the bundled up JS file!

Let's separate out our CSS into another file as well.

```bash
npm install extract-text-webpack-plugin --save
```

`webpack.config.js`
```javascript
...
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  ...
  "module": {
    "loaders": {
      ...
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      }
    }
  }
  ...
  "plugins": [
    ...
    new ExtractTextPlugin('[name].css', {allChunks: true})
  ]
};
```

`webpack.config.hot.js`
```javascript
module: {
  loaders: [
    {
      test: /\.css$/,
      loader: "style!css"
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        optional: ['runtime'],
        stage: 0
      }
    }
  ],
},
```

Now let's add the css to the head of our html.

`index.html`
```html
<link rel="stylesheet" href="dest/main.css">
```

```bash
npm run build && open index.html
```

Look at the source code with the inspector. You should see our CSS included.
Look at the dist/bundle.js file, It's a lot smaller isn't it? We don't need any more of that support code for inserting the CSS into the page.

We had to make our hot loader config less modular as the loaders became more specific as the hot reloader doesn't need to know about our final build process css separation step.

| tag `ext-css`

# Let's at some CSS pre-processors

We have a very picky designer who wants to use stylus, how can we support them in our build process?
Let's add a new loader that supports this very awesome css pre-processor.

```bash
npm install stylus-loader --save
```

`webpack.config.js`
```javascript
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader")
      },
```

Look how we continue to use the ExtractTextPlugin to make sure it's aware of our stylus loader.

`webpack.config.hot.js`
```javascript
...
{
  test: /\.styl$/,
  loader: "style!css!stylus"
},
...
```

`picky-designer.styl`
```stylus
$robot-name-color = blue

.robot-name
  color $robot-name-color
```

`entry.js`
```javascript
require('./style.css');
require('./picky-designer.styl')
...
```

`utilities.js`
```javascript
is_alive() {
  if (this.is_alive) {
    this.add_to_program("<span class=\"robot-name\">" + this.name + "</span>" + " is" + (this.alive ? "" : " not") + " alive!");
  }
}
```

|tag `preproc`

Test out your build and hot reload scripts. Try modifying the stylus file with the hot reload build!

# That's all folks, any questions?
