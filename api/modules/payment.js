require('dotenv').config();

const express = require('express');

const rout = express.Router();

const SQL = require('../../config.js').pool;

const authentication = require('../../authentication.js').authentication;

const axios = require("axios");
const { readFileSync } = require('fs');
const { join } = require('path');

rout.get('/confirm/:course_id', authentication, async (req, resp) => {
    try {        
        const { paymentID } = req.query;

        const get_course_url = await SQL.query('SELECT url FROM courses WHERE id=?', [req.params.course_id]);
        
        if (!get_course_url[0][0]) return resp.redirect(process.env.WEBSITE_URI);

        const courseURI = get_course_url[0][0]["url"];

        const json = {
            PaymentID: paymentID,
            Username: process.env.AMERIA_BANK_Username,
            Password: process.env.AMERIA_BANK_Password
        }
        
        const res = await axios.post(`${process.env.AMERIA_BANK_URI}/VPOS/api/VPOS/GetPaymentDetails`, json);
        
        if (!res.data.ApprovalCode) return resp.redirect(`${process.env.WEBSITE_URI}/profile/courses/${courseURI}?status=false`);

        const order_update = await SQL.query('UPDATE orders SET status=? WHERE paymentID=?', [1, paymentID]);
        const [orderRes] = await SQL.query('Select user_id from orders Where paymentID=?', [paymentID]);
        await SQL.query('UPDATE subscription SET payment_date=? WHERE user_id=?', [new Date(), orderRes[0].user_id]);

        if (!order_update[0].affectedRows) return resp.redirect(`${process.env.WEBSITE_URI}/profile/courses/${courseURI}?status=false`);

        return resp.redirect(`${process.env.WEBSITE_URI}/profile/courses/${courseURI}?status=true`);
    } catch (err) {
        console.log(err)
        return resp.status(403).json({msg: 'Something Was Wrong, Try Again'});
    }
});

rout.post('/make', authentication, async (req, resp) => {
    try {        
        // const payURI = `${process.env.AMERIA_BANK_URI}/VPOS/Payments/Pay`;

        const optionsData = readFileSync(join(__dirname, '../../resources', 'options.json'), {
            encoding: 'utf-8',
        });
        const options = JSON.parse(optionsData);
       
        await SQL.query(`DELETE FROM orders WHERE user_id=? AND course_id=? AND status=?`, [req.body.user_id, req.body.course_id, 0]);

        let add_course = await SQL.query(`INSERT INTO orders (paymentID, user_id, course_id, money) VALUES (?,?,?,?)`, ["", req.body.user_id, req.body.course_id, options[req.body.type]]);
        await SQL.query(`INSERT INTO subscription (user_id, type) VALUES (?,?)`, [req.body.user_id, options[req.body.type]]);
        
        add_course = add_course[0];
    
        if (!add_course.affectedRows) return resp.json({success: false});

        var json = {
            "ClientID": process.env.AMERIA_BANK_CLIENT_ID,
            "Amount": options[req.body.type],
            "OrderID": process.env.IS_DEV === "true" ? 2512109 : add_course.insertId,
            "Username": process.env.AMERIA_BANK_Username,
            "Password": process.env.AMERIA_BANK_Password,
            "Description": "CME",
            "BackURL": `${process.env.BACKEND_URI}/api/payment/confirm/${req.body.course_id}`
        };

        const res = await axios.post(`${process.env.AMERIA_BANK_URI}/VPOS/api/VPOS/InitPayment`, json);
        console.log("req",res);
        if (res.data.ResponseMessage !== "OK") return resp.json({success: false});

        await SQL.query(`UPDATE orders SET paymentID=?, money=? WHERE user_id=? AND course_id=?`, [res.data.PaymentID, options[req.body.type], req.body.user_id, req.body.course_id]);

        resp.json({success: true, url: `${process.env.AMERIA_BANK_URI}/VPOS/Payments/Pay?id=${res.data.PaymentID}&lang=am`});
    } catch (err) {
        console.log(err);
        return resp.status(403).json({msg:'Something Was Wrong, Try Again'});
    }
});
rout.post("/payPromocode" ,authentication,async (req,resp)=>{
    if(req.body.promo_code){
        let promocodeProduct = await SQL.query(`SELECT promo_code, sale,special_price FROM courses WHERE id=?`,[req.body.course_id]);
        
        if(req.body.promo_code!=promocodeProduct[0][0].promo_code){
            
            try {        
            
               await SQL.query(`DELETE FROM orders WHERE user_id=? AND course_id=? AND status=?`, [req.body.user_id, req.body.course_id, 0]);
        
                let add_course = await SQL.query(`INSERT INTO orders (paymentID, user_id, course_id, money) VALUES (?,?,?,?)`, ["", req.body.user_id, req.body.course_id, options[req.body.type]]);
                await SQL.query(`INSERT INTO subscription (user_id, type) VALUES (?,?)`, [req.body.user_id, options[req.body.type]]);

                add_course = add_course[0];
            
                if (!add_course.affectedRows) return resp.json({success: false});
        
                var json = {
                    "ClientID": process.env.AMERIA_BANK_CLIENT_ID,
                    "Amount": options[req.body.type],
                    "OrderID": process.env.IS_DEV === "true" ? 251180 : add_course.insertId,
                    "Username": process.env.AMERIA_BANK_Username,
                    "Password": process.env.AMERIA_BANK_Password,
                    "Description": "CME",
                    "BackURL": `http://localhost:4004/api/payment/confirm/${req.body.course_id}`
                };
        
                const res = await axios.post(`${process.env.AMERIA_BANK_URI}/VPOS/api/VPOS/InitPayment`, json);
               
                if (res.data.ResponseMessage !== "OK") return resp.json({success: false});
        
                await SQL.query(`UPDATE orders SET paymentID=?, money=? WHERE user_id=? AND course_id=?`, [res.data.PaymentID, options[req.body.type], req.body.user_id, req.body.course_id]);
        
                resp.json({success: true, url: `${process.env.AMERIA_BANK_URI}/VPOS/Payments/Pay?id=${res.data.PaymentID}&lang=am`});
            } catch (err) {
                console.log(err);
                return resp.status(403).json({msg:'Something Was Wrong, Try Again'});
            }
        }else if(req.body.promo_code==promocodeProduct[0][0].promo_code){
            var NewPrice = "0";
           if(promocodeProduct[0][0].sale){
                NewPrice = +options[req.body.type]-((+options[req.body.type]/100)*(+promocodeProduct[0][0].sale));
           }else if(promocodeProduct[0][0].special_price){
                NewPrice =+options[req.body.type]-(+promocodeProduct[0][0].special_price);
           }

           if(NewPrice>0){
             console.log(NewPrice,"newPrice");
             try {        
            
                await SQL.query(`DELETE FROM orders WHERE user_id=? AND course_id=? AND status=?`, [req.body.user_id, req.body.course_id, 0]);
         
                 let add_course = await SQL.query(`INSERT INTO orders (paymentID, user_id, course_id, money) VALUES (?,?,?,?)`, ["", req.body.user_id, req.body.course_id, options[req.body.type]]);
                 
                 add_course = add_course[0];
             
                 if (!add_course.affectedRows) return resp.json({success: false});
         
                 var json = {
                     "ClientID": process.env.AMERIA_BANK_CLIENT_ID,
                     "Amount": NewPrice,
                     "OrderID": process.env.IS_DEV === "true" ? 251181 : add_course.insertId,
                     "Username": process.env.AMERIA_BANK_Username,
                     "Password": process.env.AMERIA_BANK_Password,
                     "Description": "CME",
                     "BackURL": `http://localhost:4004/api/payment/confirm/${req.body.course_id}`
                 };
         

                 const res = await axios.post(`${process.env.AMERIA_BANK_URI}/VPOS/api/VPOS/InitPayment`, json);
                
                 if (res.data.ResponseMessage !== "OK") return resp.json({success: false});
         
                 await SQL.query(`UPDATE orders SET paymentID=?, money=? WHERE user_id=? AND course_id=?`, [res.data.PaymentID, options[req.body.type], req.body.user_id, req.body.course_id]);
         
                 resp.json({success: true, url: `${process.env.AMERIA_BANK_URI}/VPOS/Payments/Pay?id=${res.data.PaymentID}&lang=am`});
             } catch (err) {
                 console.log(err);
                 return resp.status(403).json({msg:'Something Was Wrong, Try Again'});
             }
           }else if(NewPrice<=0){
               try {
                
                await SQL.query(`DELETE FROM orders WHERE user_id=? AND course_id=? AND status=?`, [req.body.user_id, req.body.course_id, 0]);
               

                let add_course = await SQL.query(`INSERT INTO orders (paymentID, user_id, course_id, money,status) VALUES (?,?,?,?,?)`, ["", req.body.user_id, req.body.course_id, 0, 1]);
                 
                
                return resp.json({success:"free"})
            } catch (error) {
                console.log(error);
               }
           }
        }
    }
})

module.exports = rout;