require('dotenv').config();
const express=require('express');
const rout=express.Router();
const session = require('cookie-session');
const crypto=require('crypto');
const sha256=x=>crypto.createHash('sha256').update(x).digest('hex');

// My modules
const DB=require('../../config.js');
//Usage
rout.use(session({secret: process.env.SESSION_KEY}));


//Routing
// /////////////////////////////////////////
// ADD ACCOUNT

rout.get('/', (req, resp) => {
    if (req.session.logged && req.session.status === 1) {
        let sql_check=(`SELECT * FROM admins`);
        DB.DB_Connect.query(sql_check ,(err, result)=>{
            if(err)console.error(err);
            else{
                resp.render('account-add.ejs', {result});  
            }
        });
    } else {
        resp.render('login', {error: 'Please Login With <Full Admin>'});
    } 
});

rout.post('/add', (req,resp)=>{
    if(req.session.logged){
        let sql_check=(`SELECT * FROM admins WHERE login='${req.body[0].value}'`);
        DB.DB_Connect.query(sql_check ,(err, result)=>{
            if(err) return resp.json({success:err.message});
            else{
                if(result.length>0)return resp.json({success:"This Mail Already Exist"});
                else{
                    let sql=(`INSERT INTO admins (login,pass,status,name) VALUES ('${req.body[0].value}','${sha256(req.body[1].value)}',${req.body[2].value},'${req.body[3].value}')`);
                    DB.DB_Connect.query(sql, (err)=>{
                        if(err)resp.json({success:err.message});
                        else resp.json({success:true})
                    })
                }
            }
        });

    }
});


rout.post('/del', (req, resp) => {
    if (req.session.logged) {
        const { listID } = req.body;

        let sql = (`DELETE FROM admins WHERE id IN (${listID.join(',')})`);
        
        DB.DB_Connect.query(sql, err => {
            if (err) return resp.json({success: err}) ;
            
            resp.json({success:true});
        });
    }
});

// EDIT ACCOUNT
rout.get('/edit', (req,resp) => {
    if (!req.session.logged) return resp.render('login', {error: 'Please Login'});
    
    resp.render('account-edit.ejs');
});

rout.post('/edit', (req,resp)=>{
    if(req.session.logged){
        let sql_check=(`SELECT * FROM admins WHERE login='${req.body[0].value}'`);
        DB.DB_Connect.query(sql_check ,(err, result)=>{
            if(err) return resp.json({success:err.message});
            else{
                if(result[0].pass!==sha256(req.body[1].value))return resp.json({success:"Wrong Old Password"});
                else{
                    let sql;
                    if(req.body[2].value==="")sql=(`UPDATE admins SET name='${req.body[3].value}' WHERE login='${req.body[0].value}'`);
                    else sql=(`UPDATE admins SET pass='${sha256(req.body[2].value)}', name='${req.body[3].value}' WHERE login='${req.body[0].value}'`);
                    DB.DB_Connect.query(sql, (err)=>{
                        console.error(err);
                        if(err)resp.json({success:err.message});
                        else resp.json({success:true})
                    })
                }
            }
        });
    }
});
module.exports=rout;