
function initDB (connection, name = "nodeexamplesdb"){
    connection.query("CREATE DATABASE " + name, function(err, result){
        if(err) throw err;
        console.log("Databsed created");
        
    })
}

module.exports = initDB;