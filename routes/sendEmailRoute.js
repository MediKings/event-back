import express from "express"
import nodemailer from "nodemailer"

const router = express.Router()

var transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        // host: 'smtp.gmail.com',
        // port: 465,
        // secure: true,
        tls: {
            rejectUnauthorized: false
        },
        auth: {
            user: 'jehovahmbote3@gmail.com',
            pass: 'yangofilm'
        }
    }
);


const sendEmailSubscribers = ({emails, subject, message}) => {
    return new Promise((resolve, reject) => {
        let mailDetails = {
            from: 'travailenligne3@gmail.com',
            to: emails,
            subject: subject,
            html: message,
        };
        transporter.sendMail(mailDetails, (err, data) => {
            if (err) {
                console.log('Error Occurs');
                return reject({message: `An error has occured`})
            } else {
                console.log('Email sent with success');
                return resolve({message: `Email sent successfully`})
            }
        });
    })
}
router.post('/sendMail/subscribers', (req, res) => {
    sendEmailSubscribers(req.body)
        .then((res) => res.send(res.message))
        .catch((err) => err.status(500).send(err.message))
})


const sendEmail = ({email}) => {
    return new Promise((resolve, reject) => {
        let mailDetails = {
            from: 'travailenligne3@gmail.com',
            to: email,
            subject: 'Vous êtes abonné(e) à notre newsletter',
            html: `
                <h4>Bienvenue dans notre newsletter</h4>
                <p>Nous sommes ravis,</p>
                <p>A partir de maintenant, vous serez tenu au courant de toutes les nouveaux évenements qui seront publiés sur notre site web</p>
            `
        };
        transporter.sendMail(mailDetails, (err, data) => {
            if (err) {
                console.log(err);
                // return reject({message: `An error has occured`})
            } else {
                console.log('Email sent with success');
                // return resolve({message: `Email sent successfully`})
            }
        });
    })
}
router.post('/sendMail/welcome', (req, res) => {
    sendEmail(req.body)
        .then((res) => res.send(res.message))
        .catch((err) => res.status(500).send(err.message))
})

export default router;
