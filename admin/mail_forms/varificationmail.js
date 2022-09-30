const nodemailer = require("nodemailer");

const mailVarifacationCode = (email, code) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.beget.com",
        port: 2525,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'no-reply@ustian.com',
            pass: '%*1tgZ9G'
        }
    });
    transporter.sendMail({
        from: 'The House  <no-reply@ustian.com>',
        to: email,
        subject: "Varification Code",
        html: "<html><body><div style='width:100%; padding:30px;'><h1>Dear customer you need enter the code in web site, for verify your email, after it you can reset you password:</h1><p>Email:<b>"+email+"</b><p></p>Verification Code:<b>"+code+"</b></p><br/><h3><b style='color:red;'>Warning:</b>This code will be considered invalid if you close verification page of website</h3><div></body></html>",
    }).then(info => {
        return('Preview URL: ' + nodemailer.getTestMessageUrl(info));
    });
}

module.exports = mailVarifacationCode;
