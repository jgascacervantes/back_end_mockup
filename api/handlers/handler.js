'use strict';
var spawn = require('child_process').spawn;

//create a nova instance
exports.createNovaInstance = function(req,res){
    //TODO CHANGE THIS TO RUN A PLAYBOOK THAT DOES REAL THINGS
    var ansibleProcess = spawn('ansible-playbook',["../playbooks/HelloWorld.yml"]);

    //on success listener
    ansibleProcess.stdout.on('data', function(data){
        console.log(data.toString());

    });

    //on error listener
    ansibleProcess.stderr.on('data', function (data) {
       console.error(data.toString());

    });

    //on exit send response
    ansibleProcess.on('exit', function(code,signal) {
        console.log('child process exited with code ' + code + "\n");
        if (code == 0) {
            res.send("Successfully launched nova Instance");
        }else{
            res.send("an error occurred");
        }
    });
};

//create nova instance using heat
exports.callHeat = function(req,res){
    //TODO: this is a filler response
    res.send("nova instance launched with HEAT");
    console.log("nova instance launched with HEAT");
};