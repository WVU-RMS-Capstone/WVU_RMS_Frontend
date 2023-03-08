function queryString(str) { // Function to return entries in a table based on a string SQL command.

    var data;

    const sql = require('mssql');

    const config = {
        user: 'azureuser', // better stored in an app setting such as process.env.DB_USER
        password: 'WVUrms12', // better stored in an app setting such as process.env.DB_PASSWORD
        server: 'wvurms.database.windows.net', // better stored in an app setting such as process.env.DB_SERVER
        port: 1433, // optional, defaults to 1433, better stored in an app setting such as process.env.DB_PORT
        database: 'RMS APP', // better stored in an app setting such as process.env.DB_NAME
        authentication: {
            type: 'default'
        },
        options: {
            encrypt: true
        }
    }

    //console.log("Starting...");
    data = connectAndQuery();

    async function connectAndQuery() {
        try {
            var poolConnection = await sql.connect(config);

            //console.log("Reading rows from the Table...");
            var resultSet = await poolConnection.request().query(str);

            //console.log(`${resultSet.recordset.length} rows returned.`);

            // close connection only when we're certain application is finished
            poolConnection.close();
            let ret = JSON.stringify(resultSet); // Parsing data from DB in order to produce usable and parsable data       
            //console.log(ret);     
            var b = ret.indexOf("recordset\":", b) + 14; // Finds the location to start parsing
            var out = "";
            for (let i = 0; i < resultSet.recordset.length; i++) { 
                b = ret.indexOf("\":", b);
                let c = ret.indexOf(",", b);
                let e = ret.indexOf("}", b);
                while (b <= e) {
                    let field = ret.substring((b + 2), c);
                    out += (field + ";");
                    b = ret.indexOf("\":", b + 1);
                    c = ret.indexOf(",", b);
                }

                var len = out.length;
                out = out.substring(0, (len - 3));
                out += "\n";
            }

            out = out.replace(/"/g, "");
            return out;


        } catch (err) {
            console.error(err.message);
        }
    }

    return data;
}

function Login(user) { // Function to check login credentials and return the name of the user as well as the type of user they are
    let string = "SELECT Password, UserType, UserID, FirstName FROM [dbo].[Users] WHERE Username = \'" + user + "\'"; 
    return Promise.resolve(queryString(string));
    
}

function Roster(name) { // Function to return the full roster of players allows for searching
    let string;
    if (name == "") {
        string = "SELECT UserId, FirstName, LastName, PlayerNumber FROM [dbo].[Users] WHERE UserType = \'P\'";
    }
    else {
        if (name.indexOf(' ') >= 0) {
            name = name.toLowerCase();
            const names = name.split(' ');
            string = "SELECT UserId, FirstName, LastName, PlayerNumber FROM [dbo].[Users] WHERE UserType = \'P\' AND (lower(FirstName) like \'" + names[0] + "%\' AND lower(LastName) like \'" + names[1] + "%\')";
        }
        else {
            name = name.toLowerCase();
            string = "SELECT UserId, FirstName, LastName, PlayerNumber FROM [dbo].[Users] WHERE UserType = \'P\' AND (lower(FirstName) like \'" + name + "%\' OR lower(LastName) like \'" + name + "%\')";
        }
    }
    return Promise.resolve(queryString(string));
}

function Assigned(userId) { // Function to return a players assigned programs
    let string = "SELECT AssignmentId, RoutineId, Notes FROM [dbo].[Assignments] WHERE UserId = \'" + userId + "\'";
    return Promise.resolve(queryString(string));
}

function GetRoutines() { // Pulls a complete list of all the general routines
    let string = "SELECT RoutineId, RoutineName FROM [dbo].[Routines] WHERE Visible = 1 ORDER BY RoutineName";
    return Promise.resolve(queryString(string));
}

function RoutineDetails(RoutId) { // Returns the associated exercises and details for a particular routine
    let string = "SELECT RoutineName, ExerciseIds, SetNums, RepNums FROM [dbo].[Routines] WHERE RoutineId = " + RoutId.toString();
    return Promise.resolve(queryString(string));
}

function GetExercise(exId) { // Function to return the details of an exercise using its Id Number
    let string = "SELECT ExerciseName, Link, Descript FROM [dbo].[Exercises] WHERE ExerciseId = \'" + exId + "\'";
    return Promise.resolve(queryString(string));
}

function ExerciseName(exId) { // Function to return the name of an exercise using its Id Number
    let string = "SELECT ExerciseName FROM [dbo].[Exercises] WHERE ExerciseId = \'" + exId + "\'";
    return Promise.resolve(queryString(string));
}

function DupExercise(name) { 
    let dupCheck = "SELECT * FROM [dbo].[Exercises] WHERE ExerciseName = \'" + name + "\'";
    return Promise.resolve(queryString(dupCheck));
}

function AddExercise(name, link, descript) { // Function for trainer to add exercise
        let string = "Insert Into [dbo].[Exercises] values (\'" + name + "\',\'" + link + "\',\'" + descript + "\')";
        string = string.replace(/\'\'/g, "null");
        return Promise.resolve(queryString(string));
}

function DupRoutine(name) { 
    let dupCheck = "SELECT * FROM [dbo].[Routines] WHERE RoutineName = \'" + name + "\'";
    return Promise.resolve(queryString(dupCheck));
}

function AddRoutine(name, exIds, setNums, repNums, visible) { // Function for trainer to add routine
    let string = "Insert Into [dbo].[Routines] values (\'" + name + "\',\'" + exIds + "\',\'" + setNums + "\',\'" + repNums + "\'," + visible.toString() + ")";
    return Promise.resolve(queryString(string));
}

function AddActivity(ID,sDate,eDate,notes,RoutineId) { // Function to record a player's activity with a routine
    let string = "Insert Into [dbo].[Activity] values (\'" + ID + "\',\'" + sDate + "\',\'" + eDate + "\',\'" + notes + "\'," + RoutineId.toString() + ")";
    string = string.replace(/\'\'/g, "null");
    return Promise.resolve(queryString(string));
}

function AddUser(fname, mname, lname, type, username, password, number, code) { // Function for trainer to add a new user such as a player or student assistant
    let string = "Insert Into [dbo].[Users] values (\'" + fname + "\',\'" + mname + "\',\'" + lname + "\',\'" + type + "\',\'" + username + "\',\'" + password + "\',\'" + number + "\',\'" + code + "\')";
    string = string.replace(/\'\'/g, "null");
    return Promise.resolve(queryString(string));
}

function DupUser(username) { // Function to check if the user already exists in the system
    let dupCheck = "SELECT * FROM [dbo].[Users] WHERE UserName = \'" + username + "\'";
    return Promise.resolve(queryString(dupCheck));
}

function RemoveUser(userID) { // Function to remove athletes from the system
    let string = "DELETE FROM [dbo].[Users] WHERE UserId = " + userID.toString();
    return Promise.resolve(queryString(string));
}

function RemoveRoutine(ID) { // Function to remove assigned programs 
    let string = "DELETE FROM [dbo].[Assignments] WHERE AssignmentId = " + ID.toString();
    return Promise.resolve(queryString(string));
}

function PlayerActivity(ID,start,end) { // Returns the activity logs for a specific player for a specific time period
    let string = "SELECT RoutineId, StartTime, EndTime, Notes FROM [dbo].[Activity] WHERE UserId = " + ID + " AND StartTime between \'" + start + "\' AND \'" + end + "\'";
    return Promise.resolve(queryString(string));
}

//Front End Code to Perform Login

Login("ch2035").then(function(result) {
    let success;
    pass = "Voodood1!";
    const fields = result.split(';');
    if (pass == fields[0]) {
        success = fields[1] + ";" + fields[2] + ";" + fields[3];
    }
    else {
            success = "D";
    }
    console.log(success);
});

//Front End Code to Pull Roster

let name = "";

Roster(name).then( function(result) {
    console.log(result);
});


//Front End Code to Add Users

fname = "Chase";
lname = "Harrison";
mname = "Austin";
username = "ch2035";
password = "Voodood1!";
type = "P";
number = 5;
code = "";

DupUser(username).then( function(result) {
    let out;
    if (fname == "" || lname == "" || username == "" || password == "") {
        out = "Empty Fields";
    }
    else {
        if (result == "") {
            AddUser(fname, mname, lname, type, username, password, number, code).then( function(result) {
                out = "Successfully Added";
            });
        }
        else {
            out = "User Already Exists";
        }
    }
    console.log(out);
});


/*

//Front End Code to Add Exercises

let name = "Bench";
let link = "";
let description = "";


DupExercise(name).then( function(result) {
    let out;
    if (name == "") {
        out = "Invalid Name";
    }
    else {
        if (result == "") {
            AddExercise(name, link, descript).then( function(result) {
                out = "Successfully Added";
            });
        }
        else {
            out = "Exercise Already Exists";
        }
    }
    console.log(out);
});
*/

//Front End Code to Add Routines

/*
let name = "Legs";
let exIds = "4/5/6";
let repNums = "10/10/10";
let setNums = "3/4/5";
let visible = 1;

DupRoutine(name).then( function(result) { 
    let out;
    if (name == "") {
        out = "Invalid Name";
    }
    else {
        if (result == "") {
            AddRoutine(name, exIds, setNums, repNums, visible).then( function(result) {
                out = "Successfully Added";
            });
        }
        else {
            out = "Routine Already Exists";
        }
    }
    console.log(out);
});
*/

//Front End Code to Pull Assigned Routines for a Player

Assigned(8).then( function(results) {
    const assignments = results.split('\n');
    let size = assignments.length; 
    let i;
    for (i = 0; i < (size - 1); i++) {
        let ID = assignments[i].split(';');
        RoutineDetails(ID[1]).then(function (set) {
            set = set.replace(/\n/, '');
            console.log(set + ";" + ID[0] + ";" + ID[2]);
        });
    }
});


// Create Activity Log for Player

/*
let ID = 8;
let RoutineId = 1;
let sDate = "2022-07-20T10:00:00"
let eDate = new Date().toJSON();
let notes = "";

AddActivity(ID,sDate,eDate,notes,RoutineId).then( function(result) {
});
*/

//Front End Code to Pull Details of an Exercise

GetExercise(4).then( function(result) {
    console.log(result);
});

//Front End Code to Get Player Activity

name = "";
sDate = "2022-07-20";
eDate = "2022-07-21";

Roster(name).then( function(result) {
    const players = result.split('\n');
    let size = players.length; 
    let i;
    let j = 0;
    let log = "Player Name;Date;Start Time;End Time;Routine Name;Exercises;Notes";
    for (i = 0; i < (size - 1); i++) {
        const IDs = players[i].split(';');
        PlayerActivity(IDs[0],sDate,eDate).then( function(result) {
            const act = result.split('\n');
            let a = act.length;
            let l;
            let n = 0;
            for (l = 0; l < (a - 1); l++) {
                const data = act[l].split(';');
                const start = data[1].split('T');
                const end = data[2].split('T');
                
                let sTime = start[1].split('.');
                let eTime = end[1].split('.');
                let entry = "\n" + IDs[1] + " " + IDs[2] + ";" + start[0] + ";" + sTime[0] + ";" + eTime[0] + ";";
                RoutineDetails(parseInt(data[0],10)).then( function(result) {
                    const rout = result.split(';');
                    const exerNums = rout[1].split('/');
                    let exers = exerNums.length;
                    let k;
                    let m = 0;
                    entry += (rout[0] + ";");
                    for (k = 0; k < (exers - 1); k++) {
                        ExerciseName(parseInt(exerNums[k],10)).then( function(result) {
                            result = result.replace(/\n/, '');
                            entry += (result + ",");
                            if (m == (exers - 2)) {
                                n += 1;
                                entry += ";" + data[3];
                                log += entry.replace(/null/g, "");
                                if (n == (a - 1)) {
                                    console.log(log);
                                }
                            }
                            m += 1;
                        });
                    }
                });
            }
            j += 1;
        });
    }
});

//Front End Code to Remove User

/*
RemoveUser(2).then( function(result) {
    console.log("User Removed");
});
*/

//Front End Code to Remove Routine

/*
RemoveRoutine(1).then( function(result) {
});
*/

//Front End Code to Pull Nonassigned Routines

GetRoutines().then( function(result) {
    console.log(result);
});

//Front End Code to Pull Details of a Routine

RoutineDetails(1).then( function(result) {
    console.log(result);
});

//console.log(access);

//queryString(`SELECT * FROM [dbo].[Exercises]`).then(function(results){
  //  console.log(results);
//});
