'use strict';
var spawn = require('child_process').spawn;
var request = require('request');

//create a nova instance
exports.createNovaInstance = function(req,res){
    //send POST request to create NOVA
    getAuthToken();

    //TODO CHANGE TO CONFIGURATION PLAYBOOK
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

//Deletes the newly created VM
exports.tearDown = function(req,res){
    //TODO: this is a filler response
    res.send("tearing down");
    console.log("Deleted");
};

//acquires Auth token then sends it to the Nova API function
function getAuthToken(){
    request.post(
        'http://192.168.56.101/identity/v3/auth/tokens',
        {json:{
                "auth": {
                    "identity": {
                        "methods": [
                            "password"
                        ],
                        "password": {
                            "user": {
                                "name": "admin",
                                "domain": {
                                    "name": "Default"
                                },
                                "password": "Pass12345"
                            }
                        }
                    }
                }
            }},
        function (error, response, body) {
            if(response.statusCode ==201) {
                var authtoken = response.headers['x-subject-token'];
                callNovaAPI(authtoken);
            }
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('header:',response.headers);
            console.log('body:', body);
        }
    );
}
//Calls the nova api to launch the instance
function callNovaAPI(authtoken){
    request.post(
        'http://192.168.56.101/compute/v2.1/servers',
        {headers:{"X-Auth-Token":authtoken},
            json:{"server": {
                    "name": "test-server",
                    "imageRef": "70a599e0-31e7-49b7-b260-868f441e862b",
                    "flavorRef": "http://openstack.example.com/flavors/1",
                    "networks": "auto"//TODO FIND SETTINGS FOR NETWORK
                }}},
        function (error, response, body) {
            console.log(authtoken);
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);
        }
    );
}
