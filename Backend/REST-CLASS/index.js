const express = require("express");
const path = require("path");
const app = express();

const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // to support JSON-encoded bodies.
app.use(express.static(path.join(__dirname, "/public"))); // Serve static files from the public folder.

app.set("view engine", "ejs");
app.set("view engine", path.join(__dirname, "views"));

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})

app.get("/", (req, res) => {
    res.send("Server is live.");
});

let posts = [
    {
        id: "1a",
        username: "apnacollege",
        content: "Do Not Stop unil the goal is reached."
    },
    {
        id: "2b",
        username: "Aman Dhattarwal",
        content: "Tu Phodega!"
    },
    {
        id: "3c",
        username: "Shrasha Khapra",
        content: "Success requires hardwork."
    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});

app.post("/posts", (req, res) => {
    // console.log(req.body); // Logs data sent by user in request body.
    let { username, content } = req.body;
    posts.push({ username, content });
    res.redirect("/posts");
});