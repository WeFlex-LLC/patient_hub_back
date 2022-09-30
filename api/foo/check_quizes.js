const nodemailer = require("nodemailer");

const SQL = require('../../config.js').pool;

const cron = require('node-cron');

const shell = require("shelljs");

const sendEmail = status => {
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

    

    transporter.sendMail({
        from: process.env.MAIL_USER,
        to: "info@weflex.am",
        subject: status ? 'Success' : "Fail",
        sender: "Admin",
        replyTo: process.env.MAIL_USER,
        html: status ? "<p>Success</p>" : "<p>Fail</p>"
    }).then(info => {
        console.log(info);
        // return('Preview URL: ' + nodemailer.getTestMessageUrl(info));
    }).catch(err => console.log(err))
}

const CheckQuizes = async () => {
    try {
        //will run every day at 12:00 AM
        cron.schedule("0 0 0 * * *", async function() {
            let disable_quizes = await SQL.query(`SELECT * FROM quiz_disable`);

            disable_quizes = disable_quizes[0];

            for (let i = 0; i < disable_quizes.length; i++) {
                if (new Date() > new Date(disable_quizes[i].date)) {
                    await SQL.query(`DELETE FROM user_quiz WHERE 
                    course_id='${disable_quizes[i].course_id}' AND user_id='${disable_quizes[i].user_id}'
                    AND step IN ('1', '2', '3') AND success=0`);

                    await SQL.query(`DELETE FROM quiz_disable WHERE id='${disable_quizes[i].id}'`);
                }
            }

            if (shell.exec("dir").code !== 0) {
                sendEmail(false);
            } else {
                sendEmail(true);
            }

            resp.json({status: "Success"});
        });
    } catch (err) {
        sendEmail(false);
        console.log(err)
    }
}

module.exports = { CheckQuizes }
