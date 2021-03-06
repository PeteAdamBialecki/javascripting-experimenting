
// Before applying the flyweight design pattern:

// var Task = function(data) {
//     this.name = data.name;
//     this.priority = data.priority;
//     this.project = data.project;
//     this.user = data.user;
//     this.completed = data.completed;
// }

// function TaskCollection() {
//     var tasks = {};
//     var count = 0;
//     var add = function (data) {
//         tasks[data.name] =
//             new Task(data);
//                 count++;
//     };
//     var get = function(name) {
//         return task[name];
//     };
//     var getCount = function() {
//         return count;
//     };
//     return {
//         add: add,
//         get: get,
//         getCount: getCount
//     };
// }

// var tasks = new TaskCollection();

// var projects = ['none', 'courses', 'training', 'project'];
// var priorities = [1,2,3,4,5];
// var users = ['Jon', 'Erica', 'Amanda', 'Nathan'];
// var completed = [true, false];
// var initialMemory = process.memoryUsage().heapUsed;

// for (var i = 0; i < 10000; i++) {
//     tasks.add({
//         name: 'task' + i,
//         priority: priorities[Math.floor((Math.random() * 5))],
//         project: projects[Math.floor((Math.random() * 4))],
//         user: users[Math.floor((Math.random() * 4))],
//         completed: completed[Math.floor((Math.random() * 2))]
//     });
// };

// var afterMemory = process.memoryUsage().heapUsed;
// console.log('Used memory: ' + (afterMemory - initialMemory) / 1000000);

// console.log("Tasks generated: " + tasks.getCount());

// After applying the flyweight patter:

var Task = function(data) {
    // To test the difference between using and not using a flyweight, comment out line 60 and uncomment lines 62 - 65.
    this.flyweight = flyweightFactory.get(data.projects, data.priority, data.user, data.completed);
    this.name = data.name;
    // this.priority = data.priority;
    // this.project = data.project;
    // this.user = data.user;
    // this.completed = data.completed;
}

function Flyweight(project, priority, user, completed) {
    this.priority = priority;
    this.project = project;
    this.user = user;
    this.completed = completed;
};

var flyweightFactory = function(){
    var flyweights = {};
    var get = function(project, priority, user, completed){
        if (!flyweights[project + priority + user + completed]) {
            flyweights[project + priority + user + completed] =
                new Flyweight(project, priority, user, completed);
        }
        return flyweights[project + priority + user + completed];
    };
    var getCount = function () {
        var count = 0;
        for (var f in flyweights) count++;
        return count;
    }
    return{
        get: get,
        getCount: getCount
    }
}()

function TaskCollection() {
    var tasks = {};
    var count = 0;
    var add = function (data) {
        tasks[data.name] =
            new Task(data);
                count++;
    };
    var get = function(name) {
        return task[name];
    };
    var getCount = function() {
        return count;
    };
    return {
        add: add,
        get: get,
        getCount: getCount
    };
}

var tasks = new TaskCollection();

var projects = ['none', 'courses', 'training', 'project'];
var priorities = [1,2,3,4,5];
var users = ['Jon', 'Erica', 'Amanda', 'Nathan'];
var completed = [true, false];
var initialMemory = process.memoryUsage().heapUsed;

for (var i = 0; i < 100000; i++) {
    tasks.add({
        name: 'task' + i,
        priority: priorities[Math.floor((Math.random() * 5))],
        project: projects[Math.floor((Math.random() * 4))],
        user: users[Math.floor((Math.random() * 4))],
        completed: completed[Math.floor((Math.random() * 2))]
    });
};

var afterMemory = process.memoryUsage().heapUsed;
console.log('Used memory: ' + (afterMemory - initialMemory) / 1000000);
console.log("Tasks generated: " + tasks.getCount());
console.log("Flyweights: " + flyweightFactory.getCount());