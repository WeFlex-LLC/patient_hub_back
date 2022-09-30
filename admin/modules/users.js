require('dotenv').config();
const HOST = process.env.HOST;
const express = require('express');
const rout = express.Router();
const path = require('path');
const excel = require('exceljs');
const fs = require('fs');
const session = require('cookie-session');

const SQL = require('../../config.js').pool;

const healthcare_center = require("../foo/healthcare");

const healthcare_proffesion = require("../foo/healthcare_proffesion");

const Cryptr = require('cryptr');

const cryptr = new Cryptr(process.env.CRYPTR_KEY);

rout.use(session({secret: process.env.SESSION_KEY}));

// GET
rout.get('/', async (req, resp) => {
    if (req.session.logged) {
        try {
            const { search } = req.query;
            
            let get_users;

            if (search !== undefined && search !== "") {
                get_users = await SQL.query(`SELECT * FROM user WHERE is_deleted=0 AND fname LIKE "%${search}%" ORDER BY id DESC`);
            } else {
                get_users = await SQL.query('SELECT * FROM user WHERE is_deleted=0 ORDER BY id DESC');
            }
            
            const users = get_users[0];

            for (let i = 0; i < users.length; i++) {
                const get_credits = await SQL.query('SELECT SUM(credit) FROM user_quiz WHERE user_id=?', [users[i].id]);
                
                users[i].credits = get_credits[0][0]['SUM(credit)'];
            }

            return resp.render('users.ejs', { users, search });
        } catch(err) {
            return;
        }
    } else {
        resp.render('login.ejs', {error: 'Please Login'});
    }
});

rout.get('/export', async (req, resp) => {
    if (req.session.logged) {
        try {
            const get_users = await SQL.query('SELECT id,fname,lname,email,phone,pasport_number,date_birthday,medical_institut,medical_profesional,last_login,is_deleted FROM user ORDER BY id DESC');
        
            const users = get_users[0];

            for (var i = 0; i < users.length; i++) {
                let get_orders = await SQL.query(`SELECT SUM(money) AS money, COUNT(*) as count FROM orders WHERE user_id='${get_users[0][i]["id"]}' AND status='1'`);

                get_orders = get_orders[0][0];

                get_orders["money"] ? users[i]["money"] = get_orders["money"] : users[i]["money"] = 0;

                users[i]["course_count"] = get_orders["count"];

                let failed_quizes = await SQL.query(`SELECT COUNT(success) as success FROM user_quiz WHERE user_id='${get_users[0][i]["id"]}' AND success='0'`);

                let success_quizes = await SQL.query(`SELECT COUNT(success) as success FROM user_quiz WHERE user_id='${get_users[0][i]["id"]}' AND success='1'`);

                !failed_quizes[0][0] ? users[i]["failed_quizes"] = 0 : users[i]["failed_quizes"] = failed_quizes[0][0]["success"];
                
                !success_quizes[0][0] ? users[i]["success_quizes"] = 0 : users[i]["success_quizes"] = success_quizes[0][0]["success"];
                
                if (users[i].pasport_number && users[i].pasport_number.length > 20) {
                    users[i].pasport_number = cryptr.decrypt(users[i].pasport_number)
                }

                users[i]["is_deleted"] ? users[i]["is_deleted"] = "Այո" : users[i]["is_deleted"] = "Ոչ";
                
                let date = users[i]["last_login"];

                delete users[i]["last_login"];

                if (date) {
                    users[i]["last_login"] = date + " (օր/ամիս/տարի)";
                }
            }

            let health = healthcare_center.healthcare_center;

            let profession = healthcare_proffesion.healthcare_proffesion;

            let workbook = new excel.Workbook();
            let worksheet = workbook.addWorksheet('users');
            worksheet.addRow(['Անուն','Ազգանուն','Էլ․ հասցե','Հեռախոսահամար','Անձնագրի համար','Ծննդյան ամսաթիվ', 'Բժշկական հաստատություն', 'Բժշկական մասնագիտացումը', 'Ակտիվ հաշիվ', 'Կատարված գնումները', 'Դասընթացների քանակը', 'Ձախողված թեսթերի քանակը', 'Հաջողված թեսթերի քանակը', 'Վերջին անգամ լոգին եղած ժամանակը՝ Երևանի ժամանակով']);
            
            for (let i = 0; i < users.length; i++) {
                delete users[i]["id"];

                for (var j = 0; j < health.length; j++) {
                    if (users[i]["medical_institut"] === health[j]["value"]) {
                        users[i]["medical_institut"] = health[j]["label"];
                    }
                }

                for (var x = 0; x < profession.length; x++) {
                    if (users[i]["medical_profesional"] === profession[x]["value"]) {
                        users[i]["medical_profesional"] = profession[x]["label"];
                    }
                }

                worksheet.addRow(Object.values(users[i]));
            }
            
            workbook.xlsx.writeFile("users.xlsx")
            .then(() => {
                resp.setHeader('Content-Type', 'application/vnd.openxmlformats');
                resp.setHeader("Content-Disposition", "attachment; filename=" + "users.xlsx");
                workbook.xlsx.write(resp);
                fs.unlink( path.join(__dirname,'../../users.xlsx'),err=>{if(err)console.error(err);});
            });
        } catch(err) {
            return;
        }
    } else {
        resp.render('login.ejs', {error: 'Please Login'});
    }
});

rout.get('/user-one/:id/courses', async(req, resp) => {
    if (req.session.logged) {
        try {
            const { id } = req.params;
            const get_user = await SQL.query('SELECT id,fname,lname FROM user WHERE id=?', [id]);
            const users = get_user[0][0];
            return resp.render('user-one.ejs', { users, key: 'courses' });
        } catch(err) {
            return;
        }
    } else {
        resp.render('login.ejs', {error:'Please Login'});
    }
});



rout.get('/user-one/:id/quizzes', async (req, resp) => {
    if (req.session.logged) {
        try {
            const { id } = req.params;
            const get_user = await SQL.query('SELECT id,fname,lname FROM user WHERE id=?',[id]);
            const users = get_user[0][0];

            const get_quiz_data_success = await SQL.query('SELECT * FROM user_quiz WHERE user_id=? AND success=1 ORDER BY id DESC', [id]);
            const get_quiz_data_failed = await SQL.query('SELECT * FROM user_quiz WHERE user_id=? AND success=0   ORDER BY id DESC', [id]);
            
            const quiz_data = new Object();
            
            quiz_data.success = get_quiz_data_success[0];
             
            let quiz_failed =get_quiz_data_failed[0];
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


            quiz_data.failed =quiz_uniq;
            
            return resp.render('user-one.ejs', { users, key: 'quizzes', quiz_data });
        } catch(err) {
            return;
        }
    } else {
        resp.render('login.ejs', {error:'Please Login'});
    }
});
    

rout.get('/user-one/:id/payments', async(req, resp) => {
    var ordersData=[];
    const host = HOST;
    if (req.session.logged) {
        try {
            const { id } = req.params;
            const get_user = await SQL.query('SELECT id,fname,lname FROM user WHERE id=?', [id]);
            const users = get_user[0][0];
            const userOrders = await SQL.query('SELECT course_id,money,date_crt FROM orders WHERE user_id=? AND status =1 ORDER BY id DESC', [id]);
             // console.log(userOrders[0],"orderdata");
             
            if(userOrders[0].length){
                
                userOrders[0].forEach(async (coursesId)=>{
                   let getcursesPayment = await SQL.query("SELECT id,title,description,front_image FROM courses WHERE id=?",[coursesId.course_id])
                   
                   ordersData.push(getcursesPayment[0][0])
                })
                
            
                setTimeout(()=>{
                   
                   if(ordersData.length){
                   
                    let payData = userOrders[0].map((elem)=>{
                        return {
                           ...elem,
                           ...ordersData.filter((item)=>item.id==elem.course_id)[0]
                        }
                   })
                 //  console.log(payData,"pay");
                   return resp.render('user-one.ejs', { users, key: 'payments', payData,host });
                   }
                   
                },1000)
                
            }else{
                return resp.render('user-one.ejs', { users, key: 'payments', payData:[],host }); 
            }
            
            

           
        } catch(err) {
            return;
        }
    } else {
        resp.render('login.ejs', {error:'Please Login'});
    }
});

rout.get('/user-one/:id/credits', async(req, resp) => {
    if (req.session.logged) { 
        try {
            const { id } = req.params;
            const get_user = await SQL.query('SELECT id,fname,lname FROM user WHERE id=?',[id]);
            const users = get_user[0][0];
            const get_user_quiz = await SQL.query('SELECT * FROM user_quiz WHERE user_id=? ORDER BY id DESC',[id]);
            const list = get_user_quiz[0];
            let credit = 0;

            for (let i = 0; i < list.length; i++) {
                credit += parseFloat(list[i].credit);
            }

            return resp.render('user-one.ejs', { users, key: 'credits', list, credit });
        } catch(err) {
            return;
        }
    } else {
        resp.render('login.ejs', {error:'Please Login'});
    }
});

rout.get('/user-one/:id/certificate', async(req, resp) => {
    if (req.session.logged) {
        try {
            const { id } = req.params;
            const get_user = await SQL.query('SELECT id,fname,lname FROM user WHERE id=?',[id]);
            const users = get_user[0][0];
            const get_certificate = await SQL.query('SELECT * FROM certificate WHERE user_id=?',[id]);
            const certificates = get_certificate[0];
            const host = HOST;
            return resp.render('user-one.ejs', { users, key: 'certificate', certificates, host });
        } catch(err) {
            return;
        }
    } else {
        resp.render('login.ejs', {error: 'Please Login'});
    }
});

module.exports = rout;