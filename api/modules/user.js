require('dotenv').config();
const express = require('express');
const rout = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const sha256 = x => crypto.createHash('sha256').update(x).digest('hex');
const formData = require("express-form-data");
const os = require("os");

const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPTR_KEY);

const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
};

rout.use(formData.parse(options));
rout.use(formData.format());
rout.use(formData.stream());

// My modules
const SQL = require('../../config.js').pool;

const authorization = require('../../authorization.js').authorization;

const authentication = require('../../authentication.js').authentication;

const mail = require('../foo/mail.js');

const { uploadOneFile, removeFileOne, createFolder } = require('../../admin/foo/upload.js');

const { createCertificate } = require('../foo/pdfCreator.js');

rout.post('/sign-up', authorization, async (req,resp) => {
    try {
        const { email, pass } = req.body;
        
        const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!email.trim()) {
            return resp.json({err: 'Email is required'});
        } else if (!filter.test(email)) {
            return resp.json({err: 'Email is not valid'});
        }  else if (!pass.trim()) {
            return resp.json({err: 'Password is required'});
        }

        const check_email = await SQL.query('SELECT id FROM user WHERE email=? AND is_deleted=?', [email, 0]);

        if (check_email[0][0] !== undefined) return resp.json({err: 'mail exist'});
        
        let accessToken = jwt.sign({email, pass}, process.env.ACCESS_TOKEN_SECRT, {expiresIn:'720h'});
        
        const set_user = await SQL.query(`INSERT INTO user (email,pass,date,is_deleted) VALUES (?,?,?,?)`, [email,sha256(pass),new Date().toDateString(),0]);
        
        const insertId = set_user[0].insertId;

        await mail.emailVerifySignIn(email, accessToken);
        
        await createFolder(`users/${insertId}`);
        
        resp.json({success: true, email: email});
    } catch(err) {
        console.log(err)
        resp.status(403).json({ msg: 'Something Was Wrong, Try Again'});
    }
})

rout.post('/sign-in', authorization, async (req, resp) => {
    try {
        const { email, pass } = req.body;

        const exist_user = await SQL.query('SELECT * FROM user WHERE email=? AND pass=? AND is_deleted=?', [email, sha256(pass), 0]);
        
        if (exist_user[0].length === 0) return resp.json({err: "False User"});
        
        const user = exist_user[0][0];

        var date = new Date,
            date = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') + ' ' + [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

        await SQL.query('UPDATE user SET last_login=? WHERE id=?', [date, user.id])

        delete user.pass;
        
        let accessToken = jwt.sign({email,pass}, process.env.ACCESS_TOKEN_SECRT, {expiresIn:'720h'});

        if (user.pasport_number && user.pasport_number.length > 20) {
            user.pasport_number = cryptr.decrypt(user.pasport_number)
        }

        resp.json({user, accessToken});
    } catch(err) {
        console.log(err)
        resp.status(403).json({ msg: 'Something Was Wrong, Try Again'});
    }
})

rout.get('/verify', async (req, resp) => {
    jwt.verify(req.query.token, process.env.ACCESS_TOKEN_SECRT, async err => {
        if (err) return resp.redirect(process.env.HOST_FRONT+'/verified/?success=false');

        await SQL.query('UPDATE user SET verify=1 WHERE email=? AND is_deleted=?', [req.query.email, 0]);

        return resp.redirect(process.env.HOST_FRONT+`/verified/?success=true&email=${req.query.email}&token=${req.query.token}`);
    })
})

rout.get('/verify-recover', async (req, resp) => {
    jwt.verify(req.query.token, process.env.ACCESS_TOKEN_SECRT, async err => {
        if (err) return resp.redirect(`${process.env.HOST_FRONT}/recover/?success=false`);

        await SQL.query('UPDATE user SET verify=1 WHERE email=? AND is_deleted=?', [req.query.email, 0]);

        return resp.redirect(`${process.env.HOST_FRONT}/recover/?success=true&email=${req.query.email}&token=${req.query.token}`);
    })
})

rout.post('/after-verify', authorization, async (req, resp) => {
    jwt.verify(req.body.token, process.env.ACCESS_TOKEN_SECRT, async err => {
        if (err) return resp.status(401).json({ message: 'Missing Authentication Header'});
        
        try {
            const get_user = await SQL.query('SELECT * FROM user WHERE email=? AND is_deleted=?', [req.body.email, 0]);
            
            const user = get_user[0][0];
            
            delete user.pass;

            const accessToken = req.body.token;
            
            return resp.json({user, accessToken});
        } catch (err) {
            return resp.status(403).json({ msg: 'Something Was Wrong, Try Again'});
        }
    })
})

rout.post('/check-verification', async (req, resp) => {
    jwt.verify(req.body.token, process.env.ACCESS_TOKEN_SECRT, async err => {
        if (err) return resp.status(401).json({message: 'Missing Authentication Header'});

        try {
            const get_verify = await SQL.query('SELECT verify FROM user WHERE email=? AND is_deleted=?', [req.body.email, 0]);
            
            const verify = get_verify[0][0];

            return resp.json(verify);
        } catch(err) {
            return resp.status(403).json({msg: 'Something Was Wrong, Try Again'});
        }
    })
})

rout.post('/recover-pass', authorization, async(req, resp) => {
    try {
        const { email } = req.body;

        const check_email = await SQL.query('SELECT id FROM user WHERE email=? AND is_deleted=?', [email, 0]);
        
        if (check_email[0][0] === undefined) return resp.json({err: 'False email'});
        
        let accessToken = jwt.sign({email}, process.env.ACCESS_TOKEN_SECRT, {expiresIn: '15m'});
        
        await mail.emailVerifyRecover(email, accessToken);
        
        resp.json({success: true});
    } catch (err) {
        console.log(err)
        resp.status(403).json({ msg: 'Something Was Wrong, Try Again'});
    }
})

rout.post('/recover-pass-final', authorization, async(req,resp)=>{
    jwt.verify(req.body.token, process.env.ACCESS_TOKEN_SECRT, async err => {
        if (err) return resp.status(401).json({ message: 'Missing Authentication Header'});
        
        try {
            await SQL.query('UPDATE user SET pass=? WHERE email=? AND is_deleted=?', [sha256(req.body.pass), req.body.email, 0]);
            
            return resp.json({success: true});
        } catch(err) {
            console.log(err);
            return resp.status(403).json({ msg: 'Something Was Wrong, Try Again' });
        }
    })
})

/////////
///////JWT
/////////

rout.post('/update-settings', authentication, (req, resp) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRT, async err => {
        if (err) return resp.status(401).json({message: 'Missing Authentication Header'});
        
        try {
            let { id, email, fname, lname, phone, pasport_number, date_birthday, medical_institut } = req.body;
            
            pasport_number = cryptr.encrypt(pasport_number);

            const { profile } = req.files;

            const checkEmail = await SQL.query('SELECT * FROM user WHERE email=? AND id<>? AND is_deleted=?', [email, id, 0]);
            
            if (checkEmail[0][0] !== undefined) return resp.json({err: 'mail exist'});
            
            const get_usr = await SQL.query('SELECT email, verify, img FROM user WHERE id=? AND is_deleted=?', [id, 0]);
            
            const oldImg = get_usr[0][0].img;
            
            const oldEmail = get_usr[0][0].email;
            
            let verify = get_usr[0][0].verify;
            
            if (oldEmail !== email) verify = 0;

            if (profile !== undefined) {
                oldImg !== "" ? await removeFileOne(`users/${id}`, oldImg) : '';
                const filename = await uploadOneFile(`users/${id}`, profile);

                await SQL.query('UPDATE user SET email=?,fname=?,lname=?,phone=?,pasport_number=?,date_birthday=?,medical_institut=?=?,verify=?,img=? WHERE id=?',
                                [email,fname,lname,phone,pasport_number,date_birthday,medical_institut,verify,filename,id]);
            } else {
                await SQL.query('UPDATE user SET email=?,fname=?,lname=?,phone=?,pasport_number=?,date_birthday=?,medical_institut=?=?,verify=? WHERE id=?',[email,fname,lname,phone,pasport_number,date_birthday,medical_institut,verify,id]);
            }

            const upd_user = await SQL.query('SELECT * FROM user WHERE id=? AND is_deleted=?', [id, 0]);
            
            const user = upd_user[0][0];

            user.pasport_number = cryptr.decrypt(user.pasport_number)

            return resp.json({success: true, user});
        } catch (err) {
            console.log(err)
            resp.status(403).json({ msg: 'Something Was Wrong, Try Again'});
        }
    })
})

rout.post('/delete-account', authentication, (req, resp) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRT, async err => {
        if (err) return resp.status(401).json({ message: 'Missing Authentication Header'});
        
        try {
            const { email } = req.body;

            const res = await SQL.query(`UPDATE user SET is_deleted=? WHERE email=? AND is_deleted=?`, [1, email, 0]);

            if (!res[0].affectedRows) return resp.json({success: false});
            
            return resp.json({success: true});
        } catch(err) {
            resp.status(403).json({msg: 'Something Was Wrong, Try Again'});
        }
    })
});

rout.post('/email-verify', authentication, (req, resp) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRT, async err => {
        if (err) return resp.status(401).json({ message: 'Missing Authentication Header'});
        
        try {
            const { email } = req.body;

            await mail.emailVerify(email, req.token);
            
            return resp.json({success: true});
        } catch (err) {
            resp.status(403).json({msg: 'Something Was Wrong, Try Again'});
        }
    })
})

rout.post('/get-quiz-data', authentication, (req, resp) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRT, async err => {
        if (err) return resp.status(401).json({message: 'Missing Authentication Header'});
        
        try {
            const { id } = req.body;

            let get_quiz_data_success = await SQL.query('SELECT * FROM user_quiz WHERE user_id=? AND success=1 ORDER BY id DESC', [id]);
        
            if (get_quiz_data_success[0][0] && get_quiz_data_success[0][0].step !== 1) {
                get_quiz_data_success = await SQL.query(`
                SELECT * FROM user_quiz WHERE course_id=? AND user_id=? AND step=(SELECT MAX(step) FROM user_quiz WHERE course_id=? AND user_id=?)
                `, [get_quiz_data_success[0][0].course_id, get_quiz_data_success[0][0].user_id, get_quiz_data_success[0][0].course_id, get_quiz_data_success[0][0].user_id]);
            }

            const get_quiz_data_failed = await SQL.query(`SELECT * FROM user_quiz WHERE user_id=? AND success=0 ORDER BY id DESC`, [id]);
        
            const quiz_data = new Object();

            quiz_data.success = get_quiz_data_success[0];
            
            quiz_data.failed = get_quiz_data_failed[0];
            
            for (let i = 0; i < quiz_data.failed.length; i++) {
                let get_course_url = await SQL.query('SELECT url FROM courses WHERE id=?',[quiz_data.failed[i].course_id]);
                
                if (quiz_data.failed[i].step === 3) {
                    let get_expire_date = await SQL.query(`SELECT date FROM quiz_disable WHERE user_id=? AND course_id=?`, [quiz_data.failed[i].user_id, quiz_data.failed[i].course_id]);
                    
                    if (!get_expire_date[0][0]) {
                        quiz_data.failed[i].expire_date = null;
                    } else {
                        quiz_data.failed[i].expire_date = get_expire_date[0][0]["date"];
                    }
                }
                
                quiz_data.failed[i].course_url = get_course_url[0][0].url;
            }
             
             let quiz_failed = quiz_data.failed;
             let quiz_uniq=[];
             
           
      
               quiz_failed.forEach(item => {
               let filteritem= quiz_failed.filter((elem)=> elem.course_id==item.course_id);
                 if(!filteritem.length){
                    quiz_uniq.push(item)
                 }else{
                 let sortitem = filteritem.sort((a,b)=>b.step-a.step);
                  if(!quiz_uniq.length){
                    quiz_uniq.push(sortitem[0])
                  }else{
                    let newfilterdata = quiz_uniq.filter((item)=>item.course_id==sortitem[0].course_id);
                    if(!newfilterdata.length){
                        quiz_uniq.push(sortitem[0])
                    }
                  }
                
                 }
            });
        
           

            quiz_uniq=quiz_uniq.sort((a,b)=>b.step-a.step)
           

              
            quiz_data.failed=quiz_uniq;
            return resp.json(quiz_data);
        } catch (err) {
            console.log(err)
            resp.status(403).json({ msg: 'Something Was Wrong, Try Again' });
        }
    })
})

rout.post("/check-fields", authentication, async (req, resp) => {
    try {
        const { id } = req.body;

        const sql = await SQL.query("SELECT email, fname, lname, pasport_number, phone, verify, date_birthday FROM user WHERE id=?", [id]);

        if (!sql[0].length) return resp.json({status: false});

        if (!sql[0][0].email || !sql[0][0].fname || !sql[0][0].lname || !sql[0][0].pasport_number || !sql[0][0].phone || !sql[0][0].verify || !sql[0][0].date_birthday) {
            return resp.json({status: false});
        }

        return resp.json({status: true});
    } catch (err) {
        console.log(err);
        resp.status(403).json({msg: 'Something Was Wrong, Try Again'});  
    }
});

rout.post('/create-certificate', authentication, async (req, resp) => {
    try {
        const { user_id, course_id } = req.body;

        const get_user = await SQL.query('SELECT * FROM user WHERE id=? AND is_deleted=?', [user_id, 0]);

        const User = get_user[0][0];

        if (User && User.pasport_number && User.pasport_number.length > 20) {
            User.pasport_number = cryptr.decrypt(User.pasport_number)
        }

        const get_course = await SQL.query('SELECT * FROM courses WHERE id=?', [course_id]);

        const Course = get_course[0][0];

        const get_quiz_data = await SQL.query('SELECT * FROM user_quiz WHERE course_id=? AND user_id=?', 
        [course_id, user_id]);

        const Quiz_data = get_quiz_data[0][0];
        
        var date = Quiz_data && Quiz_data.date;
        
        if (date) {
            date = date.split("T")
            date = date[0];
            date = date.split("-").join(".");
        }

        const passedData = {
            uid: User && User.id,
            name: User && User.fname,
            lname: User && User.lname,
            passport: User && User.pasport_number,
            course: Course && Course.title,
            quiz_title: Quiz_data && Quiz_data.quiz_titile,
            description: Course && Course.description,
            date: date,
            point: Quiz_data && Quiz_data.point,
            host: process.env.HOST
        }

        await createCertificate(passedData);

        const filename = `${passedData.quiz_title}_${passedData.date}`;
        
        if (Quiz_data && User) {
            await SQL.query(`INSERT INTO certificate (user_id,quiz_id,file_name,date,title) VALUES (?,?,?,?,?)`, 
            [User.id, Quiz_data.quiz_id, filename, 
            Quiz_data.date, Quiz_data.quiz_titile]);
        }

        return resp.json({pdf: filename});

        // let get_quiz_data = await SQL.query('SELECT * FROM user_quiz WHERE id=?', [user_quiz_id]);

        // let Quiz_data = get_quiz_data[0][0];

        // if (Quiz_data.step !== 1) {
        //     get_quiz_data = await SQL.query('SELECT * FROM user_quiz WHERE course_id=? AND user_id=? AND step=?', 
        //     [Quiz_data.course_id, Quiz_data.user_id, 1]);
            
        //     Quiz_data = get_quiz_data[0][0];

        //     if (Quiz_data) {
        //         await SQL.query(`DELETE FROM user_quiz WHERE course_id='${Quiz_data.course_id}' AND user_id='${Quiz_data.user_id}' AND step IN ('2', '3')`)
            
        //         await SQL.query(`UPDATE user_quiz SET success='1' WHERE course_id='${Quiz_data.course_id}' AND user_id='${Quiz_data.user_id}' AND step='1'`)

        //         Quiz_data.success = 1;
        //     }
        // }

        // if (Quiz_data && Quiz_data.success !== 1) return resp.json({err: 'Failed quiz'});
        
        // const quiz_id = Quiz_data && Quiz_data.quiz_id;
        // const user_id = Quiz_data && Quiz_data.user_id;
        // const get_certificate = await SQL.query('SELECT * FROM certificate WHERE user_id=? AND quiz_id=?', [user_id, quiz_id]);  

        // if (get_certificate[0][0] !== undefined) return resp.json({pdf: get_certificate[0][0].file_name});
        
        // const get_quiz = await SQL.query('SELECT * FROM cours_quiz WHERE id=?', [quiz_id]);
        // const Quiz = get_quiz[0][0];

        // const get_user = await SQL.query('SELECT * FROM user WHERE id=? AND is_deleted=?', [user_id, 0]);

        // const User = get_user[0][0];
        
        // const course_id = Quiz && Quiz.cours_id;

        // const get_course = await SQL.query('SELECT * FROM courses WHERE id=?', [course_id]);
        
        // const Course = get_course[0][0];

        // var date = Quiz_data && Quiz_data.date;
        // date = date.split("T")
        // date = date[0];
        // date = date.split("-").join(".");
        
        // if (User.pasport_number && User.pasport_number.length > 20) {
        //     User.pasport_number = cryptr.decrypt(User.pasport_number)
        // }

        // const passedData = {
        //     uid: User.id,
        //     name: User.fname,
        //     lname: User.lname,
        //     passport: User.pasport_number,
        //     prof: User.medical_profesional,
        //     course: Course.title,
        //     quiz_title: Quiz && Quiz.title,
        //     description: Course.description,
        //     date: date,
        //     point: Quiz_data && Quiz_data.point,
        //     host: process.env.HOST
        // }

        // await createCertificate(passedData);

        // const filename = `${passedData.quiz_title}_${passedData.date}`;

        // await SQL.query(`INSERT INTO certificate (user_id,quiz_id,file_name,date,title) VALUES (?,?,?,?,?)`, [User.id,Quiz.id,filename,Quiz_data.date,Quiz.title]);

        // return resp.json({pdf: filename});
    } catch(err) {
        console.log(err);
        resp.status(403).json({ msg: 'Something Was Wrong, Try Again'});
    }
})

// rout.post('/create-certificate', authentication, async(req,resp)=>{
//     // jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRT, async(err)=>{
//     //     if(err)return resp.status(401).json({ message: 'Missing Authentication Header'});
//         try{
//             const {user_quiz_id}=req.body;
//             const get_quiz_data=await SQL.query('SELECT * FROM user_quiz WHERE id=?',[user_quiz_id]);
//             const Quiz_data=get_quiz_data[0][0];
//             if(Quiz_data.success!==1)return resp.json({err:'Failed quiz'});
//             const quiz_id=Quiz_data.quiz_id;
//             const user_id=Quiz_data.user_id;
//             const get_certificate=await SQL.query('SELECT * FROM certificate WHERE 	user_id=? AND quiz_id=?',[user_id,quiz_id]);
//             if(get_certificate[0][0]!==undefined)return resp.json({pdf:get_certificate[0][0].file_name});
//             const get_quiz=await SQL.query('SELECT * FROM cours_quiz WHERE id=?',[quiz_id]);
//             const Quiz=get_quiz[0][0];
//             const get_user=await SQL.query('SELECT * FROM user WHERE id=?',[user_id]);
//             const User=get_user[0][0];
//             const course_id=Quiz.cours_id;
//             const get_course=await SQL.query('SELECT * FROM courses WHERE id=?',[course_id]);
//             const Course=get_course[0][0];
//             const passedData={
//                 uid:User.id,
//                 name:User.fname,
//                 lname:User.lname,
//                 prof:User.medical_profesional,
//                 passport:User.pasport_number,
//                 course:Course.title,
//                 quiz_title:Quiz.title,
//                 description:Course.description,
//                 date:new Date().toDateString(),
//                 point:Quiz_data.point,
//                 host:process.env.HOST
//             }
            
//             await createCertificate(passedData);
//             const filename=`${passedData.quiz_title}_${passedData.date}`;
//             await SQL.query(`INSERT INTO certificate (user_id,quiz_id,file_name,date,title) VALUES (?,?,?,?,?)`,
//                                                       [User.id,Quiz.id,filename,passedData.date,Quiz.title]);
//             return resp.json({pdf:filename});
//         }
//         catch(err){
//             console.log(err);   
//             resp.status(403).json({ msg: 'Something Was Wrong, Try Again'});
//         }
//     // })
// })

rout.post("/user-all-certificates", authentication, (req, resp) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRT, async err => {
        if (err) return resp.status(401).json({message: 'Missing Authentication Header'});

        try {
            const get_cert = await SQL.query(`
                SELECT quiz_id, file_name, title, date FROM certificate WHERE user_id=?
            `, [req.body.user_id]);

            let final_data = get_cert[0];

            if (final_data.length) {
                for (var i = 0; i < final_data.length; i++) {
                    let get_point = await SQL.query(`
                        SELECT point FROM user_quiz WHERE 
                        quiz_id=? AND user_id=? AND success=?
                    `, [final_data[i].quiz_id, req.body.user_id, 1]);

                    if (get_point[0][0]) {
                        final_data[i]['point'] = get_point[0][0]["point"];
                    } else {
                        final_data[i]['point'] = 0;
                    }
                }

                resp.json({data: final_data})
            } else {
                resp.json({data: []})
            }

            // return;

            // const data = await SQL.query(
            //     `SELECT DISTINCT u.pasport_number, c.title, c.date, uq.point, c.file_name FROM certificate as c JOIN user as u ON c.user_id=u.id JOIN user_quiz as uq 
            //     ON uq.quiz_id=c.quiz_id AND uq.success=? WHERE u.id=?
            //     `, [1, req.body.user_id]
            // );
            
            // let res = data[0];

            // if (res.length) {
            //     for (var i = 0; i < res.length; i++) {
            //         if (res[i].pasport_number && res[i].pasport_number.length > 20) {
            //             res[i].pasport_number = cryptr.decrypt(res[i].pasport_number)
            //         }
            //     }
            // }

            // resp.json({data: res})
        } catch (err) {
            console.log(err);
            resp.status(403).json({msg: 'Something Was Wrong, Try Again'});
        }
    })
})

rout.post('/get-certificate', authentication, (req, resp) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRT, async err => {
        if (err) return resp.status(401).json({ message: 'Missing Authentication Header'});
        
        try {
            const { user_id, courseId } = req.body;

            const get_user = await SQL.query('SELECT * FROM user WHERE id=?', [user_id]);

            const User = get_user[0][0];

            if (User && User.pasport_number && User.pasport_number.length > 20) {
                User.pasport_number = cryptr.decrypt(User.pasport_number)
            }

            const get_course = await SQL.query('SELECT * FROM courses WHERE id=?', [courseId]);
            
            const Course = get_course[0][0];

            let get_quiz_data = await SQL.query('SELECT * FROM user_quiz WHERE user_id=? AND course_id=? AND success=?', [user_id, courseId, 1]);
        
            let Quiz_data = get_quiz_data[0][0];

            if (Quiz_data) {                
                Quiz_data.success = 1;
            }
            
            if (Quiz_data.success !== 1) return resp.json({err: 'Failed quiz'});

            var date = Quiz_data.date;
            date = date.split("T")
            date = date[0];
            date = date.split("-").join(".");

            const passedData = {
                uid: User.id,
                name: User.fname,
                lname: User.lname,
                passport: User.pasport_number,
                course: Course.title,
                quiz_title: Quiz_data.quiz_titile,
                description: Course.description,
                date: date,
                point: Quiz_data.point,
                host: process.env.HOST
            }

            const all_get_certificate = await SQL.query('SELECT * FROM certificate WHERE user_id=?',[user_id]);
            
            const certificate = all_get_certificate[0];

            return resp.json({certificate: certificate, passedData: passedData});

            // const get_quiz_data = await SQL.query('SELECT * FROM user_quiz WHERE user_id=? AND quiz_id=?', [user_id, quizId]);
        
            // const Quiz_data = get_quiz_data[0][0];
            
            // if (Quiz_data.success !== 1) return resp.json({err: 'Failed quiz'});

            // const quiz_id = Quiz_data.quiz_id;
            // const q_user_id = Quiz_data.user_id;
            // const get_certificate = await SQL.query('SELECT * FROM certificate WHERE user_id=? AND quiz_id=?', [q_user_id, quiz_id]);  

            // const get_quiz = await SQL.query('SELECT * FROM cours_quiz WHERE id=?', [quiz_id]);

            // const Quiz = get_quiz[0][0];

            // const get_user = await SQL.query('SELECT * FROM user WHERE id=?', [q_user_id]);

            // const User = get_user[0][0];
            
            // const course_id = Quiz.cours_id;

            // const get_course = await SQL.query('SELECT * FROM courses WHERE id=?', [course_id]);
            
            // const Course = get_course[0][0];

            // var date = Quiz_data.date;
            // date = date.split("T")
            // date = date[0];
            // date = date.split("-").join(".");

            // if (User.pasport_number && User.pasport_number.length > 20) {
            //     User.pasport_number = cryptr.decrypt(User.pasport_number)
            // }

            // const passedData = {
            //     uid: User.id,
            //     name: User.fname,
            //     lname: User.lname,
            //     passport: User.pasport_number,
            //     prof:User.medical_profesional,
            //     course:Course.title,
            //     quiz_title:Quiz.title,
            //     description:Course.description,
            //     date:date,
            //     point:Quiz_data.point,
            //     host:process.env.HOST
            // }

            // const all_get_certificate = await SQL.query('SELECT * FROM certificate WHERE user_id=?',[user_id]);
            
            // const certificate = all_get_certificate[0];

            // return resp.json({certificate: certificate, passedData: passedData});
        } catch (err) {
            console.log(err);
            resp.status(403).json({ msg: 'Something Was Wrong, Try Again'});
        }
    })
})

rout.post('/send-certificate', authentication, (req, resp) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRT, async err => {
        if (err) return resp.status(401).json({ message: 'Missing Authentication Header'});

        try {
            const { user_email, user_id, pdf_name, quiz_id } = req.body;

            await mail.sendCertificate(user_email, user_id, pdf_name, quiz_id);
            
            return resp.json({success: true});
        } catch(err) {
            console.log(err);
            resp.status(403).json({ msg: 'Something Was Wrong, Try Again'});
        }
    })
})
rout.post("/send_success_quiz_admin_mail",authentication,(req,resp)=>{
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRT, async err => {
        if (err) return resp.status(401).json({ message: 'Missing Authentication Header'});

        try {
            const { title,date_crt,name,surname,phone,email,institut } = req.body;
          console.log(req.body);
            await mail.emailQuizSuccess(title,date_crt,name,surname,phone,email,institut);
            
            return resp.json({success: true});
        } catch(err) {
            console.log(err);
            resp.status(403).json({ msg: 'Something Was Wrong, Try Again'});
        }
    })
})

rout.post('/get-credits-data', authentication, (req, resp) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRT, async err => {
        if (err) return resp.status(401).json({ message: 'Missing Authentication Header'});
        
        try {
            const { user_id } = req.body;

            const get_user_quiz = await SQL.query(`SELECT * FROM user_quiz WHERE user_id=? AND step=(SELECT MAX(step) FROM user_quiz WHERE user_id='${user_id}') ORDER BY id DESC`, [user_id]);
            
            const list = get_user_quiz[0];
            
            let credit = 0;

            for (let i = 0; i < list.length; i++) {
                credit += +list[i].credit;

                if (list[i].step === 3) {
                    let get_expire_date = await SQL.query(`SELECT date FROM quiz_disable WHERE user_id=? AND course_id=?`, [list[i].user_id, list[i].course_id]); 
                
                    if (!get_expire_date[0][0]) {
                        list[i].expire_date = null;
                    } else {
                        list[i].expire_date = get_expire_date[0][0]["date"];
                    }
                }
            }
            
            return resp.json({credit, list});
        } catch (err) {
            resp.status(403).json({ msg: 'Something Was Wrong, Try Again'});
        }
    })
})

rout.post('/change-pass', authentication, (req, resp) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRT, async err => {
        if (err) return resp.status(401).json({ message: 'Missing Authentication Header' });
        
        try {
            const { user_id, oldPass, newPass } = req.body;
            
            const get_user = await SQL.query(`SELECT pass FROM user WHERE id=? AND is_deleted=?`, [user_id, 0]);
            
            const user = get_user[0][0];
            
            if (user.pass !== sha256(oldPass)) {
                resp.json({err: "False Pass"});
            } else {
                await SQL.query('UPDATE user SET pass=? WHERE id=?', [sha256(newPass),user_id])
            }

            return resp.json({success: true});
        } catch(err) {
            console.log(err)
            resp.status(403).json({ msg: 'Something Was Wrong, Try Again'});
        }
    })
})

module.exports = rout;




