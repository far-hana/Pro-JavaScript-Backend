const express = require("express");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;

const app = express();

cloudinary.config({
    // cloud_name: process.env.CLOUD_NAME,
    cloud_name: "dwzps9zgx",
    api_key: "784867944983153",
    api_secret: "meHNR71PeJa05JDuvRILq14D6HQ",
});

// middleware

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/"
}));

app.get("/myget", (req, res) => {
    console.log(req.body);
    // res.send(req.query);
    res.send(req.body);
})

app.post("/mypost", async (req, res) => {
    console.log(req.body);
    console.log(req.files);

    /* for single file

    let file = req.files.samplefile;

    result = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "users",
    });

    console.log(result);

    details = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        result,
    }
    */

    let result;
    let imageArray = [];

    if(req.files) {
        for (let index = 0; index < req.files.samplefile.length; index++) {
            
            result = await cloudinary.uploader.upload(req.files.samplefile[index].tempFilePath, {
                folder: "users"
            });

            imageArray.push({
                public_id: result.public_id,
                secure_url: result.secure_url,
            });
            
        }
    }

    console.log(result);

    details = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        result,
        imageArray,
    }

    console.log(details);
    res.send(details);
})

// render routes
app.get("/mygetform", (req, res) => {
    res.render("getForm");
});

app.get("/mypostform", (req, res) => {
    res.render("postForm");
});

app.listen(4000, () => console.log("Server is running at port 4000"));