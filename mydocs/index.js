const express = require("express");
const app = express();
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const fileUpload = require("express-fileupload");

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json());
app.use(fileUpload());

let courses = [
    {
        id: "11",
        name: "Learn ReactJS",
        price: 299
    },
    {
        id: "12",
        name: "Learn Angular",
        price: 399
    },
    {
        id: "13",
        name: "Learn VueJS",
        price: 499
    },
];



app.get("/", (req, res) => {
    res.send("Hiiiiii everyone");
});

app.get("/api/v1/docs", (req, res) => {
    res.send("Hello from docs");
});

app.get("/api/v1/objects", (req, res) => {
    res.send({id: "22", name: "Learn Backend", price: 499});
});

app.get("/api/v1/courses", (req, res) => {
    res.send(courses);
});

app.get("/api/v1/myCourse/:courseId", (req, res) => {
    const myCourse = courses.find( course => course.id === req.params.courseId);
    res.send(myCourse);
});

app.post("/api/v1/addCourse", (req, res) => {
    console.log(req.body);
    courses.push(req.body);
    res.send(true);
});

app.get("/api/v1/courseQuery", (req, res) => {
    let location = req.query.location;
    let device = req.query.device;
    
    res.send({location, device});
});

app.post("/api/v1/courseUpload", (req, res) => {
    console.log(req.headers);
    const file = req.files.file;
    console.log(file);
    let path = __dirname + "/images/" + Date.now() + ".jpg";

    file.mv(path, (err) => {
        res.send(true);
    });
});

app.listen(4000, () => console.log(`Server is running at port 4000`));