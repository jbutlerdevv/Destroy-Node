const findRemoveSync = require("find-remove");
const colors = require("colors");
const term = require("terminal-kit").terminal;

// REFERENCE NOTES ON LINE 63 - NEEDS TO BE CHANGED TO WORK PROPERLY

var progressBar;

var thingsToDo = [
    "Bot Starting Destroy Node process...".red,
    "finding node_modules folders".red,
    "super serious stuff happening".red,
    "getting some coffee...LOL".red,
    "deleting node_modules".red,
    "finishing up the destroy process".red,
];

var countDown = thingsToDo.length;

function start() {
    if (!thingsToDo.length) {
        return;
    }

    var task = thingsToDo.shift();

    progressBar.startItem(task);

    // Finish the task in...
    setTimeout(done.bind(null, task), 500 + Math.random() * 1200);

    // Start another parallel task in...
    setTimeout(start, 400 + Math.random() * 400);
}

function done(task) {
    progressBar.itemDone(task);
    countDown--;

    // Cleanup and exit
    if (!countDown) {
        setTimeout(function () {
            term("\n");
            process.exit();
        }, 200);
        console.log(
            "Your files have been successfully deleted or no node_modules detected. Hooray you did it!"
                .brightGreen
        );
    }
}

progressBar = term.progressBar({
    width: 80,
    title: "Daily tasks:".brightCyan,
    eta: true,
    percent: true,
    items: thingsToDo.length,
});

start();

// Change "yourFilePathHere" to an actual file path that contains node_modules
// i.e. C:/Users/Desktop/Fullstackweb/Express-Course
// OR you can delete EVERYTHING in a single folder by simply naming the path to the parent folder
// i.e. C:/Users/Desktop/Fullstackweb
// This function goes into all sub-directories and looks for node_modules directories and deletes them.
var result = findRemoveSync("yourFilePathHere", {
    dir: "node_modules",
});

// After edited the path above, simply run the application by typing `node index.js` and run in terminal
