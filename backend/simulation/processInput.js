// Method 2 (modern approach)
const Simulation = require('./src/simulation.js');
const dbModules = require("./src/dbmodules.js");
const modules = require("./src/modules.js");
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});


running = true

helpTxt = `
Exit: exits the interactive shell process but not the server.
Help: Displays the help text.
Start: Starts the simulation and creates the simulation instance.
test response: Checks if simulations instance is running.


`
let simulation
const processInput = () => {
    readline.question("", (input) => {
            const args = input.toLowerCase().split(' ');
            const command = args[0] + (args[1] ? ' ' + args[1] : '');
        switch(command) {
            case 'exit':
                running = false;
                readline.close();
                break;
            case "help":
                console.log(helpTxt)
                processInput();
                break;
            case "start":
                console.log("starting simulation")
                simulation = new Simulation()
                processInput();
                break;
            case "test response":
                if (simulation) {
                    let result = simulation.testResponse();
                    console.log(result)
                } else {
                    console.log("start simulation first")
                }
                processInput();
                break;
            case "initiate scooters":
                let amount = parseInt(args[2]);
                simulation.createNewBikeNode(amount);
                processInput();
                break;
            default:
                console.log("uknown command try help")
                processInput();
                break;
        }
    });
}

module.exports = { processInput };