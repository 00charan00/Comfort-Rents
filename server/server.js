const express = require("express");
const bodyParser = require('body-parser');
const mysql = require("mysql2");
const cookieparser = require("cookie-parser");
const session = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const cors = require("cors");
const {hashPassword} = require("mysql/lib/protocol/Auth");
const app = express();
const setRounds =10;
app.use(express.json());
app.use(cors({origin:'*'}));
app.use(cookieparser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const nodemailer = require('nodemailer');



const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1030",
    database: "crents",
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log("Connected to database");
});
//session
app.use(
    session({
        key:'username',
        secret:'password',
        resave: false,
        saveUninitialized: false,
        cookie:{
            expire:60*10,
        }
    })
)

//register

app.post('/register',(req,res)=>{
    console.log(req.body);
    const name= req.body?.name;
    const email=req.body?.email;
    const password=req.body?.password;
    bcryptjs.hash(password,setRounds,(err,hash)=>{
        if(err){
            console.log(err)
        }

        db.query('INSERT INTO rentregistertable(name, email, password) VALUES (?,?,?)',
            [name, email, hash],
            (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({ error: 'Internal Server Error' });
                } else {
                    console.log(result);
                    sendEmail(req.body.email,req.body.name);
                    return res.status(200).json({ message: 'Registration Successful' });
                }
            }
        );
    })
});

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.send("We need token give it next time");
    } else {
        jwt.verify(token, "secret", (err, decoded) => {
            if (err) {
                res.json({ auth: false, message: "Failed to authenticate" });
            } else {
                req.mail = decoded.id;
                next();
            }
        });
    }
};

app.get('/isAuth',verifyJWT,(req,res)=>{
    res.send("Authenticeted Successfully");
})

app.post('/login', async (req, res) => {
    const email = req.body?.email;
    const password = req.body?.password;

    db.query(
        "SELECT * FROM rentregistertable WHERE email=?",
        [email],
        (err, result) => {
            if (err) {
                console.log("Error:", err);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }

            if (result.length > 0) {
                bcryptjs.compare(password, result[0].password, (err, response) => {
                    if (response) {
                        const id  = result[0].id;
                        const token = jwt.sign({ id }, "secret", { expiresIn: 5 });
                        res.json({ auth: true, token: token, result: result[0], message: 'Login Successful' });
                    } else {
                        res.status(401).json({ message: 'Invalid Credentials' });
                    }
                });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        }
    );
});



























const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'nodemailercharan@gmail.com',
        pass: 'brftpryzsogquwjk'
    }
});




function sendEmail(receiverEmail,receiverName) {
    var nodemailer = require('nodemailer');
    const name=receiverName

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nodemailercharan@gmail.com',
            pass: 'brftpryzsogquwjk'
        }
    });



    var mailOptions = {
        from: 'nodemailercharan@gmail.com',
        to: receiverEmail,
        subject: 'Welcome to Comfort Rents!',
        text: `
Dear ${name},

Welcome to Comfort Rents!

We are delighted to have you as part of our community. At Comfort Rents, we strive to provide you with the best rental experiences, tailored to meet your unique needs. Whether you are looking for a cozy apartment or a spacious house, we are here to help you find the perfect home.

As a new member, you will have access to a wide range of properties, comprehensive search features, and dedicated customer support. We are committed to making your house hunting journey as smooth and enjoyable as possible.

If you have any questions or need assistance, please do not hesitate to reach out to our support team at nodemailercharan@gmail.com . We are here to assist you every step of the way.

Thank you for choosing Comfort Rents. We look forward to helping you find your ideal home.

Warm regards,

Charan Adhithya
CEO, Comfort Rents
`
    };




    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}










app.get('/',(req,res)=>{
    //function to check if backend is running in browser
    res.json("Hii charan, backend is running");
})
app.listen(8080, () => {
    console.log("Listening in 8080");
});