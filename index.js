const express = require("express");
// templating engine without logic unlike views
const hbs = require("express-handlebars");
// get text from u
const bodyParser = require("body-parser");
// const con = require("./models/taskModel");
const db = require("./models/taskModel");
const port = process.env.PORT || 5000;

const app = express();
// middleware and static files like css
app.use(express.static("public"));

app.engine(
  "hbs",
  hbs.engine({
    // help set the class of the task (ongoing or not)
    helpers: {
      isCompleted: function (status) {
        if (status == "completed") {
          return true;
        } else {
          return false;
        }
      },
    },
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout: "main",
    extname: ".hbs",
  })
);

app.set("view engine", "hbs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//parsing incoming request body to access the data
app.use(bodyParser.json());

app.get("/", (req, res) => {
  // retreiving all the rows and passing them to index
  let sql = "SELECT * FROM todos";
  let items = [];
  db.query(sql, (err, result) => {
    if (err) throw err;
    items = result;
    console.log(items);
    res.render("index", { items: items });
  });
});

app.post("/", (req, res) => {
  console.log(req.body);
  // inserting task in the todo app and ? is placeholder for task(user entry)
  let sql = "INSERT INTO todos(task,status) VALUES ?";
  // data to be insterted as an 2 dimension array that allows you to add multiple rows
  // status ongoing
  data = [[req.body.task, "ongoing"]];
  db.query(sql, [data], (err, result) => {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});

app.get("/:status/:id", (req, res) => {
  console.log(req.params);
  let sql =
    "UPDATE todos SET status='" +
    req.params.status +
    "' WHERE task_id=" +
    req.params.id;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});

app.get("/:id", (req, res) => {
  console.log(req.params);
  let sql = "DELETE FROM todos WHERE task_id=" + req.params.id;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log("server running on 3000");
});
