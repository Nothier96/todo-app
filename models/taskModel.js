const mysql = require("mysql");

// initializing the connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "todo",
});
//opening the connection
db.connect((err) => {
  if (err) throw err;
  console.log("Connected to database");
  let sql =
    "CREATE TABLE IF NOT EXISTS todos (task_id int NOT NULL AUTO_INCREMENT, task VARCHAR(300) NOT NULL,status VARCHAR(300), PRIMARY KEY (task_id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});
//exporting to the index file
module.exports = db;
