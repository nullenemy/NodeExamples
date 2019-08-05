module.exports = function add(con, user){
    con.connect(function(err) {
        if(err) throw err;
        con.query(`INSERT INTO users (name, email, password) VALUES ('${user.name}', '${user.email}', '${encryptPasswordSync(user.password)}')`, function(err, result) {
            if (err) throw err;
            console.log("user added");
            con.end();
        });
    })
}

