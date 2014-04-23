'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var EventEmitter = require('events').EventEmitter;
//TODO: line 86
//var	git = require('simple-git');
//var bonesRepo = "git://github.com/eddiemachado/bones.git";

var WpBonesGenerator = module.exports = function WpBonesGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
        if (this.themeNameSpace) {
        process.chdir(this.themeNameSpace+"/grunt/");
        this.installDependencies({ skipInstall: options['skip-install'], bower: false });
       }
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(WpBonesGenerator, yeoman.generators.Base);

WpBonesGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  //ASCII art
  
console.log(chalk.blue.bold("       :::::::::        ::::::::        ::::    :::        ::::::::::        :::::::: "));  
console.log(chalk.blue.bold("     :+:    :+:      :+:    :+:       :+:+:   :+:        :+:              :+:    :+:  "));  
console.log(chalk.blue.bold("    +:+    +:+      +:+    +:+       :+:+:+  +:+        +:+              +:+          "));  
console.log(chalk.blue.bold("   +#++:++#+       +#+    +:+       +#+ +:+ +#+        +#++:++#         +#++:++#++    "));   
console.log(chalk.blue.bold("  +#+    +#+      +#+    +#+       +#+  +#+#+#        +#+                     +#+     "));  
console.log(chalk.blue.bold(" #+#    #+#      #+#    #+#       #+#   #+#+#        #+#              #+#    #+#      "));   
console.log(chalk.blue.bold("#########        ########        ###    ####        ##########        ########        "));  
  
  console.log(chalk.blue.bold("              ////////////////////////////////////////////////"));    
  console.log(chalk.blue.bold("              START YOUR GRUNTED BONES WORDPRESS STARTER THEME"));
  console.log(chalk.blue.bold("              ////////////////////////////////////////////////"));

  var prompts = [{
    name: 'themeName',
    message: 'Name of the theme you want to create?'
  },{
    name: 'themeNameSpace',
    message: 'Uniq name-space for the theme (alphanumeric)?',
    default: function( answers ) {
return answers.themeName.replace(/\W/g, '').toLowerCase();
}
  },{
    name: 'themeAuthor',
    message: 'Name of the themes author?',
    default: function( answers ) {
return 'John Doe';
}
  },{
    name: 'themeAuthorURI',
    message: 'Website of the themes authors?',
    default: function( answers ) {
return 'http://www.'+answers.themeAuthor.replace(/\W/g, '').toLowerCase()+'.com';
}
  },{
    name: 'themeURI',
    message: 'Website of the theme?',
default: function( answers ) {
return answers.themeAuthorURI+'/'+answers.themeNameSpace;
}
  },{
    name: 'themeDescription',
    message: 'Description of the theme?',
    default: function( answers ) {
return 'This is a description for the '+answers.themeName+' theme.';
}
  }];

  this.prompt(prompts, function (props) {
    this.themeName = props.themeName;
    this.themeNameSpace = props.themeNameSpace;
    this.themeAuthor = props.themeAuthor;
    this.themeAuthorURI = props.themeAuthorURI;
    this.themeURI = props.themeURI;
    this.themeDescription = props.themeDescription;
    this.jshintTag = '<%= jshint.all %>';

    cb();
  }.bind(this));
};


WpBonesGenerator.prototype.app = function app() {
  var currentDate = new Date()
  this.themeCreated = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
  this.directory('theme', this.themeNameSpace);
  //TODO: Fetch the most recent version from git (see top)
//  require('simple-git')().clone(this.bonesRepo,this.themeNameSpace)
  
  
  this.mkdir(this.themeNameSpace+'/library/dist');
  this.mkdir(this.themeNameSpace+'/library/fonts');
  this.mkdir(this.themeNameSpace+'/library/grunt');

  this.template('_gruntfile.js', this.themeNameSpace+'/library/grunt/gruntfile.js')
  this.template('_package.json', this.themeNameSpace+'/library/grunt/package.json')
};
