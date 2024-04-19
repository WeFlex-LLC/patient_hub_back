require('dotenv').config();
const express=require('express');
const rout=express.Router();
// const session = require('cookie-session');

// My modules
const DB = require('../../config.js');
const SQL = require('../../config.js').pool;
const { uploadOneFile, removeFileOne, delFolder } = require('../foo/upload.js')

const formData = require("express-form-data");
const os = require("os");

const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
};

rout.use(formData.parse(options));
rout.use(formData.format());
rout.use(formData.stream());
//Usage

rout.get('/', async(req, resp) => {
    if (req.session.logged) {
        try {
            const { public, cat, them, prof, sort } = req.query;
            
            let get_courses = null;

            // if (cat !== undefined && sort !== undefined) {
            //     get_courses = await SQL.query(`SELECT * FROM courses WHERE public=? AND f_category=? AND f_theme=? AND f_profesor=? ORDER BY ${sort} DESC`,[public,cat,them,prof]);
            // } else if (cat === undefined && sort !== undefined) {
            //     get_courses = await SQL.query(`SELECT * FROM courses WHERE public=?  ORDER BY ${sort} DESC `,[public,sort]);
            // } else if (cat !== undefined && sort === undefined) {
            //     get_courses = await SQL.query(`SELECT * FROM courses WHERE ${public ? `public=${public}` : ""} ${cat ? `AND f_category=${cat}` : ""} ${them ? `AND f_theme=${them}` : ""} ${prof ? `AND f_profesor=${prof}` : ""}`);
            // } else {
            //     get_courses = await SQL.query('SELECT * FROM courses WHERE public=?', [public]);
            // }

            if (sort === undefined) {
                var sqlQuery = `SELECT * FROM courses WHERE ${public ? `public=${public}` : ""} ${cat && cat!=0 ? `AND f_category=${cat}` : ""} ${prof && prof!=1 ? `AND f_profesor=${prof}` : ""}`;
                 
                get_courses = await SQL.query(sqlQuery.trim());
                if(them && them!=1){
                    get_courses[0]=get_courses[0].filter((item)=>{
                        if(item.f_theme!='' && item.f_theme.length){
                          if(item.f_theme.includes(them)){
                            return item
                          }

                        }
                    })
                }
               
              
            }else{
                var sqlQuery = `SELECT * FROM courses WHERE ${public ? `public=${public}` : ""} ${cat && cat!=0 ? `AND f_category=${cat}` : ""}  ${prof && prof!=1 ? `AND f_profesor=${prof}` : ""} ORDER BY ${sort} DESC`;
                 
                get_courses = await SQL.query(sqlQuery.trim());
                if(them && them!=1){
                    get_courses[0]=get_courses[0].filter((item)=>{
                        if(item.f_theme!='' && item.f_theme.length){
                          if(item.f_theme.includes(them)){
                            return item
                          }

                        }
                    })
                }
            }

            const get_category = await SQL.query('SELECT * FROM cours_categories');
            const get_theme = await SQL.query('SELECT * FROM cours_theme');
            const get_profs = await SQL.query('SELECT * FROM cours_profs');
            const theme = get_theme[0].sort((a, b) => a.title.localeCompare(b.title));
            const profs = get_profs[0].sort((a, b) => a.title.localeCompare(b.title));
            const category = get_category[0];
            const courses = get_courses[0];
        //    console.log(courses,"courses");
            resp.render('courses.ejs', { courses, theme, profs, category });
        } catch(err) {
            resp.send(err);
        }
    } else {
        resp.render('login', {error:'Please Login'});
    }
})

rout.get('/add', async (req, resp) => {
    if (req.session.logged) {
        try {
            const get_category = await SQL.query('SELECT * FROM cours_categories');
            const get_theme = await SQL.query('SELECT * FROM cours_theme');
            const get_profs = await SQL.query('SELECT * FROM cours_profs');
            const theme = get_theme[0];
            const profs = get_profs[0];
            const category = get_category[0];
            resp.render('courses-add.ejs', { theme, profs, category });
        } catch(err) {
            resp.send(err);
        }
    } else {
        resp.render('login', {error: 'Please Login'});
    }
})

rout.get('/one/:id', async (req, resp) => {
    if (req.session.logged) {
        try {
            const get_courses = await SQL.query('SELECT * FROM courses WHERE id=? ORDER BY id DESC', [req.params.id]);
            const get_videos = await SQL.query('SELECT * FROM courses_videos WHERE course_id=? ORDER BY id DESC', [req.params.id]);
            const get_category = await SQL.query('SELECT * FROM cours_categories');
            const get_theme = await SQL.query('SELECT * FROM cours_theme');
            const get_profs = await SQL.query('SELECT * FROM cours_profs');

            const category = get_category[0];
            const theme = get_theme[0];
            const profs = get_profs[0];
            const course = get_courses[0][0];
            const videos = get_videos[0];

            course.f_theme = course.f_theme ? JSON.parse(course.f_theme) : "";

            if (typeof course.f_theme !== "object") course.f_theme = [course.f_theme];

            for (var i = 0; i < theme.length; i++) {
                for (var x = 0; x < course.f_theme.length; x++) {
                    if (theme[i].id === +course.f_theme[x]) theme[i]["selected"] = true;
                }
            }

            let steps = await SQL.query(`SELECT step FROM cours_quiz WHERE cours_id='${course.id}'`);

            steps = steps[0];
             
             
            resp.render('courses-one.ejs', { course, videos, category, theme, profs, steps,});
        } catch (err) {
            resp.send(err);
        }
    } else {
        resp.render('login', {error: 'Please Login'});
    }
})

rout.get('/filter/:name', async (req, resp) => {
    if (req.session.logged) {
        try {
            const db_name = req.params.name;
            const get_filters = await SQL.query(`SELECT * FROM cours_${db_name} ORDER BY id DESC`);
            const filters = get_filters[0];
            let category = null;

            if (db_name !== 'categories') {
                let get_category = await SQL.query('SELECT * FROM cours_categories');

                category = get_category[0];
            }
            
            resp.render(`courses-filters.ejs`, { filters, category });
        } catch (err) {
            resp.send(err);
        }
    } else {
        resp.render('login', {error: 'Please Login'});
    }
})

rout.get('/one-comment/:course_id', async (req, resp) => {
    if (req.session.logged) {
        try {
            const { course_id } = req.params;
            
            const get_comments = await SQL.query('SELECT * FROM cours_comment WHERE course_id=? ORDER by id DESC',[course_id]);
            
            const comments = get_comments[0];

            resp.render('courses-one-comment.ejs', { comments });
        } catch(err) {
            resp.send(err);
        }
    } else {
        resp.render('login', {error: 'Please Login'});
    }
})

////////
///POST/
////////

rout.post('/add', async (req, resp) => {
    if (req.session.status === 3 && !req.session.logged) return;

    try {
        let {title,url,front_text,description,duration,for_woman,for_parents,for_future_parents,price_woman,price_parents,price_future_parents,promo_code,special_price,sale,f_category,f_theme,f_profesor,tizer_video}=req.body;
        
        f_theme = JSON.stringify(f_theme);

        const { front_image,front_pdf } = req.files;
          
        const date = new Date().toDateString().split(" ").splice(1,3).join(" ");
        
        const for_woman_val = for_woman !== undefined ? for_woman : 0;
        
        const for_parents_val = for_parents !== undefined ? for_parents : 0;
        
        const for_future_parents_val = for_future_parents !== undefined ? for_future_parents : 0;

        const check_url = await SQL.query('SELECT id FROM courses WHERE url=?', [url]);
        
        if (check_url[0].length > 0) return resp.json({err: 'This URL Already exist'});
        
        const set_courses = await SQL.query(`
            INSERT INTO courses (
            title, url, front_text, description, duration, for_woman, for_parents, for_future_parents, price_woman, price_parents, 
            price_future_parents, promo_code, special_price, sale, 
            f_category, f_theme, f_profesor, crt_date, creator
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            title, url, front_text, description, duration, for_woman_val, for_parents_val,
            for_future_parents_val, price_woman, price_parents, price_future_parents, 
            promo_code, special_price, sale, f_category,
            f_theme, f_profesor, date, req.session.name
        ]
        );

        const insertId = set_courses[0].insertId; 
        
        const front_image_name = await uploadOneFile(`courses/${insertId}`,front_image);
        var front_pdf_name = null;
          if(front_pdf){
            front_pdf_name = await uploadOneFile(`courses/${insertId}`,front_pdf);
          }
          //console.log(front_image_name,"im nameee");
        //  console.log(req.files,"filesss");
        //  console.log(front_pdf,"PDF FILE");
        await SQL.query('UPDATE courses SET front_image=?,front_pdf=?, tizer_video=? WHERE id=?',[front_image_name,front_pdf_name,tizer_video,insertId]);
        
        await SQL.query('INSERT INTO cours_quiz (cours_id) VALUES (?)',[insertId]);
        
        resp.json({id: insertId});
    } catch(err) {
        console.error(err)
        resp.json({err:err.message});
    }
})

rout.post('/edit/public', async (req, resp) => {
    if (req.session.status === 3 && !req.session.logged) return;

    try {
        const { public, uid } = req.body
        
        const set_courses = await SQL.query('UPDATE courses SET public=? WHERE id=?', [public, uid]);

        if (!set_courses[0].affectedRows) return resp.json({success: false});

        resp.json({success: true});
    } catch (err) {
        console.error(err)
        resp.json({err: err.message, success: false});
    }
});
rout.post('/edit', async(req, resp) => {
    if (req.session.status === 3 && !req.session.logged) return;
   
    try {
        let { uid,title,url,front_text,description,duration,for_woman,for_parents,for_future_parents,price_woman,price_parents,price_future_parents,promo_code,special_price,sale,f_category,f_theme=[],f_profesor,tizer_video } = req.body;
         
       
       // console.log(uid,",uidddd");
        const { front_image ,front_pdf} = req.files;
        
        const for_woman_val = for_woman !== undefined ? for_woman : 0;
        
        const for_parents_val = for_parents !== undefined ? for_parents : 0;
        
        const for_future_parents_val = for_future_parents !== undefined ? for_future_parents : 0;

        const check_url = await SQL.query('SELECT id FROM courses WHERE url=? AND id<>?', [url, uid]);
    
        if (check_url[0].length > 0) return resp.json({err: 'This URL Already exist'});
        
        const old_data = await SQL.query('SELECT * FROM courses WHERE id=?', [uid]);
        let olddataParse =old_data[0][0].f_theme ? JSON.parse(old_data[0][0].f_theme)  : [];
         
        if(olddataParse.length){
            olddataParse.forEach(elem => {
                f_theme.push(elem)
            });
        }
         

        f_theme = JSON.stringify(f_theme);

        let cart_image_name = old_data[0][0].front_image;
        let cart_pdf_name=old_data[0][0].front_pdf ? old_data[0][0].front_pdf : "";
       
        if (front_image !== undefined) {
            if (cart_image_name !== "") await removeFileOne(`courses/${uid}`,cart_image_name);
            
            cart_image_name = await uploadOneFile(`courses/${uid}`, front_image);
        }
        if(front_pdf){
            if(cart_pdf_name!="" ) await removeFileOne(`courses/${uid}`,cart_pdf_name)

            cart_pdf_name = await uploadOneFile(`courses/${uid}`, front_pdf)
        }else{

            
        }


        
        const set_courses = await SQL.query('UPDATE courses SET title=?,url=?,front_text=?,description=?,duration=?, for_woman=?,  for_parents=?,  for_future_parents=?,  price_woman=?, price_parents=?, price_future_parents=?, promo_code=?,special_price=?,sale=?,f_category=?,f_theme=?,f_profesor=?,front_image=?, front_pdf=?, tizer_video=? WHERE id=?',
        [title,  url,  front_text,  description,  duration,  for_woman_val, for_parents_val, for_future_parents_val,  price_woman,   price_parents,   price_future_parents,  promo_code,  special_price,  sale,  f_category,  f_theme,  f_profesor,  cart_image_name,cart_pdf_name, tizer_video, uid]);

        if (!set_courses[0].affectedRows) return resp.json({success: false});

        resp.json({success: true});
    } catch (err) {
        console.error(err)
        resp.json({err: err.message, success: false});
    }
});

rout.post("/deletePdf",async (req,resp)=>{
    let {id}=req.body;
    let old_Data = await SQL.query("SELECT front_pdf FROM courses WHERE id =? ",[id]);
    if(old_Data[0][0].front_pdf!="" && old_Data[0][0].front_pdf!=null){
       
        await removeFileOne(`courses/${id}`,old_Data[0][0].front_pdf)
      let newdate =   await SQL.query('UPDATE courses SET front_pdf="" WHERE id=?',[id]);
      if (!newdate[0].affectedRows) return resp.json({success: false});
        return resp.json({success:true});
    }


})

rout.post("/deletef_team",async (req,resp)=>{
     let {course_id,filter}=req.body;
     let old_Data = await SQL.query("SELECT f_theme FROM courses WHERE id =? ",[course_id]);

     let jsonparseFtheme = JSON.parse(old_Data[0][0].f_theme);
      if(jsonparseFtheme.length){
        let newF_theme = jsonparseFtheme.filter((item)=>item!=filter);
        newF_theme = JSON.stringify(newF_theme);
        let updatedata =   await SQL.query('UPDATE courses SET f_theme=? WHERE id=?',[newF_theme,course_id]);
      if (!updatedata[0].affectedRows) return resp.json({success: false});
        return resp.json({success:true});
       }


})


rout.post('/publish', async (req, resp) => {
    if (req.session.status === 3 && !req.session.logged) return;

    try {
        const { id, val } = req.body;
        
        await SQL.query('UPDATE courses SET public=? WHERE id=?', [val, id]);
        
        resp.json({success: true});
    } catch(err) {
        resp.json({err: err.message});
    }
})

rout.post('/del', async (req, resp) => {
    if (req.session.status === 3 && !req.session.logged) return;

    try {
        const { id } = req.body;
        
        await SQL.query('DELETE FROM courses WHERE id=?', [id]);
        
        await delFolder(`courses/${id}`); 
        
        resp.json({success: true});
    } catch(err) {
        console.error(err);
        resp.json({err: err.message});
    }
})


rout.post('/add-video', async (req, resp) => {
    if (req.session.status === 3 && !req.session.logged) return;

    try {
        const { id, title, url, part, vimeo } = req.body;
        
        const { video_image, video_video } = req.files;

        const newImg = await uploadOneFile(`courses/${id}`, video_image);
        
        let newVideo = "";

        if (video_video !== undefined) {
            newVideo = await uploadOneFile(`courses/${id}`,video_video);
        }

        await SQL.query('INSERT INTO courses_videos (title,url,video_part,cart_img,video,vimeo,course_id) VALUES (?,?,?,?,?,?,?)',[title,url,part,newImg,newVideo,vimeo,id]);
        
        resp.json({success: true});
    } catch(err) {
        resp.json({err: err.message});
    }
})

rout.post('/del-video', async(req, resp) => {
    if (req.session.status === 3 && !req.session.logged) return;

    try {
        const { id, c_id } = req.body;

        const old_data = await SQL.query('SELECT * FROM courses_videos WHERE id=?', [id]);
        
        let image_name = old_data[0][0].cart_img;
        
        let video_name = old_data[0][0].video;

        await removeFileOne(`courses/${c_id}`,image_name);
        
        if(video_name !== "") await removeFileOne(`courses/${c_id}`,video_name);
        
        await SQL.query('DELETE FROM courses_videos WHERE id=?', [id])
        
        resp.json({success: true});
    } catch(err) {
        console.error(err)
        resp.json({err:err.message});
    }
})

rout.post('/filter/add', async (req, resp) => {
    if (req.session.status === 3 && !req.session.logged) return;

    try {
        let { title, filter, category_id, category_name } = req.body;
        
        if (category_id === undefined) {
            category_id = 0;
            category_name = 0;
        }

        await SQL.query(`INSERT INTO cours_${filter} (title,category_id,category_name) VALUE (?,?,?)`,[title,category_id,category_name]);
        
        resp.json({success: true});
    } catch(err) {
        resp.json({err: err.message});
    }
})

rout.post('/filter/del', async (req, resp) => {
    if (req.session.status === 3 && !req.session.logged) return;

    try {
        const { id, filter } = req.body;
        
        await SQL.query(`DELETE FROM cours_${filter} WHERE id=?`, [id]);
        
        resp.json({success: true});
    } catch (err) {
        console.error(err)
        resp.json({err:err.message});
    }
})

// QUIZ
rout.post('/quiz/get', async (req, resp) => {
    if (!req.session.logged) return;

    try {
        const { course_id } = req.body;

        const get_quiz = await SQL.query('SELECT cours_id,questions,title,description,step FROM cours_quiz WHERE cours_id=?', [course_id]);
        
        get_quiz[0] = get_quiz[0].sort((a,b) => a.step - b.step);

        resp.json({data: get_quiz[0]});

        // const quiz = get_quiz[0][0].questions ? get_quiz[0][0].questions : [];
        
        // const title = get_quiz[0][0].title;
        
        // const description = get_quiz[0][0].description;
        
        // resp.json({ quiz, title, description });
    } catch (err) {
        resp.json({err: err.message});
    }
})

rout.post('/quiz/set', async (req, resp) => {
    if (req.session.status === 3 && !req.session.logged) return;

    try {
        const { course_id, title, description, questions, step } = req.body;
        
        const check_qty = await SQL.query(`
            SELECT COUNT(*) as count FROM cours_quiz WHERE cours_id=? AND step=?
        `, [course_id, step]);

        const qty = check_qty[0][0]["count"];

        if (qty) {
            await SQL.query(`UPDATE cours_quiz SET title=?, description=?, questions=? WHERE cours_id=? AND step=?`, [title, description, JSON.stringify(questions), course_id, step]);
        } else {
            await SQL.query(`INSERT INTO cours_quiz (title, description, questions, cours_id, step) VALUES (?,?,?,?,?)`, 
            [title, description, JSON.stringify(questions), course_id, step]);
        }
        
        await SQL.query(`UPDATE courses SET quiz_id=1 WHERE id=?`, [course_id]);
        
        resp.json({success: true});
    } catch (err) {
        console.error(err)
        resp.json({err: err.message});
    }
})

rout.post('/comment-confirm', async (req, resp) => {
    if (req.session.status === 3 && !req.session.logged) return;
    
    try {
        const { comment_id, confirm } = req.body;
        
        await SQL.query('UPDATE cours_comment SET confirm=? WHERE id=?', [confirm, comment_id]);  
        
        resp.json({success: true});
    } catch(err) {     
        resp.json({err: err.message});
    }
})

module.exports = rout;