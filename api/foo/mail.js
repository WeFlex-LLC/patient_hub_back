const HOST = process.env.HOST;

const MAIL = process.env.MAIL;

const MAIL_PASS = process.env.MAIL_PASS;

const MAIL_PORT = parseInt(process.env.MAIL_PORT);

const nodemailer = require("nodemailer");

const path = require('path');

const HTML = require('./mail_html');

const fs = require("fs");

const SQL = require('../../config.js').pool;

const { createCertificate } = require('../foo/pdfCreator.js');

// let transporter = nodemailer.createTransport({
//     // host: "smtp.beget.com",
//     host: "vmi423113.contaboserver.net",
//     port: MAIL_PORT,
//     secure: true,
//     auth: {
//         user: MAIL,
//         pass: MAIL_PASS
//     }
// });

let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});



const emailVerify = async (email, token) => {
    transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Email Verification',
        sender: "Admin",
        replyTo: process.env.MAIL_USER,
        html: HTML.EmailVerify(HOST, email, token)
    }).then(info => {
        return('Preview URL: ' + nodemailer.getTestMessageUrl(info));
    }).catch(err => console.log(err))
}


const emailQuizSuccess =async (title,date_crt,name,surname,phone,email,institut,medical_profesional)=>{
    transporter.sendMail({
        from: process.env.MAIL_USER,
        to: "aleksanyannata@gmail.com",
        subject: 'Բարեհաջող թեստ',
        sender: "Admin",
       html: `<p>
       Quiz name -${title} <br/>
       institut - ${institut} <br/>
       Medical profesional -${medical_profesional}<br/>
       Full name ${name} ${surname} <br/>
       Email -${email}<br/>
       Phone -${phone}<br/>
       Date -${date_crt}<br/>
       </p>`
    }).then(info => {
        return('Preview URL: ' + nodemailer.getTestMessageUrl(info));
    }).catch(err => console.log(err))
}

const emailVerifySignIn = async (email, token) => {
    transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Email Verification',
        sender: "Admin",
        replyTo: process.env.MAIL_USER,
        html: HTML.EmailVerifySignIn(HOST, email, token)
    }).then(info => {
        return('Preview URL: ' + nodemailer.getTestMessageUrl(info));
    }).catch(err => console.log(err))
}

const emailVerifyRecover = async(email, token) => {
    transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Գաղտնաբառի Վերականգնում',
        sender: "Admin",
        replyTo: process.env.MAIL_USER,
        html: HTML.EmailVerifyRecover(HOST, email, token)
    }).then(info => {
        return('Preview URL: ' + nodemailer.getTestMessageUrl(info));
    }).catch(err => console.log(err))
}

const sendCertificate = async (email, uid, pdf, quiz_id) => {
    var filepath = path.join(__dirname, `../../admin/uploads/users/${uid}/${pdf}`);
    
    if (!fs.existsSync(filepath)) {
        const get_quiz_data = await SQL.query('SELECT * FROM user_quiz WHERE quiz_id=? AND user_id', [quiz_id, uid]);
        
        const Quiz_data = get_quiz_data[0][0];

        const get_quiz = await SQL.query('SELECT cours_id, title FROM cours_quiz WHERE id=?', [quiz_id]);
        const Quiz = get_quiz[0][0];

        const get_user = await SQL.query('SELECT id, fname, lname, pasport_number, medical_profesional FROM user WHERE id=?', [uid]);
        const User = get_user[0][0];

        const course_id = Quiz.cours_id;

        const get_course = await SQL.query('SELECT title, description FROM courses WHERE id=?', [course_id]);
        
        const Course = get_course[0][0];

        var date = Quiz_data.date;
        date = date.split("T")
        date = date[0];
        date = date.split("-").join(".");
        
        const passedData = {
            uid: User.id,
            name: User.fname,
            lname: User.lname,
            passport: User.pasport_number,
            prof:User.medical_profesional,
            course:Course.title,
            quiz_title:Quiz.title,
            description:Course.description,
            date:date,
            point:Quiz_data.point,
            host:process.env.HOST
        }

        var is_file = await createCertificate(passedData);

        if (is_file.status === "success") {
            // transporter.sendMail({
            //     from: `cme.am  <${MAIL}>`,
            //     to: email,
            //     subject: 'Վկայական',
            //     replyTo: `${MAIL}`,
            //     html: HTML.EmailCertificate(),
            //     // text: 'Հարգելի օգտատեր, Կից կարող եք տեսնել Ձեր վկայականը։',
            //     attachments: [{
            //         filename: `${pdf}`,
            //         path: filepath,
            //         contentType: 'application/pdf'
            //     }],
            // }).then(info => {
            //     return('Preview URL: ' + nodemailer.getTestMessageUrl(info));
            // }).catch(err => console.log(err))
            transporter.sendMail({
                from: process.env.MAIL_USER,
                to: email,
                subject: 'Վկայական',
                sender: "Admin",
                replyTo: process.env.MAIL_USER,
                html: HTML.EmailCertificate(),
                attachments: [{
                    filename: pdf,
                    path: filepath,
                    contentType: 'application/pdf'
                }]
            }).then(info => {
                return('Preview URL: ' + nodemailer.getTestMessageUrl(info));
            }).catch(err => console.log(err))
        }

        return;
    }

    transporter.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Վկայական',
        sender: "Admin",
        replyTo: process.env.MAIL_USER,
        html: HTML.EmailCertificate(),
        attachments: [{
            filename: pdf,
            path: filepath,
            contentType: 'application/pdf'
        }]
    }).then(info => {
        return('Preview URL: ' + nodemailer.getTestMessageUrl(info));
    }).catch(err => console.log(err))

    // transporter.sendMail({
    //     from: `cme.am  <${MAIL}>`,
    //     to: email,
    //     subject: 'Վկայական',
    //     replyTo:`${MAIL}`,
    //     html: HTML.EmailCertificate(),
    //     // text: 'Հարգելի օգտատեր, Կից կարող եք տեսնել Ձեր վկայականը։',
    //     attachments: [{
    //         filename: `${pdf}`,
    //         path: filepath,
    //         contentType: 'application/pdf'
    //     }],
    // }).then(info => {
    //     return('Preview URL: ' + nodemailer.getTestMessageUrl(info));
    // }).catch(err => console.log(err))
}

module.exports = { emailVerify, emailVerifyRecover, emailVerifySignIn, sendCertificate,emailQuizSuccess }