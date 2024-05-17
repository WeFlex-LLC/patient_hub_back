require('dotenv').config();

const express = require('express');
const { readFileSync } = require('fs');

const rout = express.Router();

const jwt = require('jsonwebtoken');
const { join } = require('path');

const osNet = require('os').networkInterfaces();

// My modules
const SQL = require('../../config.js').pool;

const authorization = require('../../authorization.js').authorization;

const authentication = require('../../authentication.js').authentication;



function checkSubscription(type, date1, date2 = new Date()) {
    const utcDate1 = new Date(Date.UTC(date1.getFullYear(), date1.getMonth(), 1));
    const utcDate2 = new Date(Date.UTC(date2.getFullYear(), date2.getMonth(), 1));

    const differenceMs = Math.abs(utcDate2 - utcDate1);

    const oneMonthMs = 30 * 24 * 60 * 60 * 1000;
    const oneYearMs = 365 * 24 * 60 * 60 * 1000;

    if (type == 'month')
        return differenceMs <= oneMonthMs;
    else
        return differenceMs <= oneYearMs;
}

rout.post('/get-all', authorization, async (req, resp) => {
    try {
        let get_all_courses = "";

        let courses = "";

        get_all_courses = await SQL.query('SELECT id,title,url,front_text,front_image,for_woman,for_parents,for_future_parents,view,duration FROM courses WHERE public=1');

        courses = get_all_courses[0];

        resp.json(courses);
    } catch (err) {
        resp.status(403).json({ msg: 'Something Was Wrong, Try Again' });
    }
})

// let filterList = "";

//         for (const property in req.body.filter) {
//             filterList = filterList+` AND ${property}=${req.body.filter[property]}`;
//         }

//         let get_all_courses = "";

//         if (req.body.offset === undefined) {
//             get_all_courses = await SQL.query(`SELECT id,title,url,front_text,front_image,for_woman,for_parents,for_future_parents,view,duration FROM courses WHERE public=1 ${filterList}`);
//         } else {
//             get_all_courses = await SQL.query(`SELECT id,title,url,front_text,front_image,for_woman,for_parents,for_future_parents,view,duration FROM courses WHERE 
//             public=1 ${filterList} LIMIT 10 OFFSET ${req.body.offset}`);
//         }

//         const courses = get_all_courses[0];

//         resp.json(courses);

const getRate = async (course_id, externalIp) => {
    try {
        const internalIp = osNet["eth1"] !== undefined ? osNet["eth1"][0].address : osNet['Wi-Fi'][1].address;
        const ip = externalIp + '/' + internalIp;
        const get_rate = await SQL.query(`SELECT rate FROM star_rate WHERE course_id=?`, [course_id]);
        const checkIp = await SQL.query(`SELECT * FROM star_rate WHERE course_id=? AND ip=?`, [course_id, ip]);
        let ipExist = false;

        if (checkIp[0].length > 0) ipExist = true;

        let rate = null;

        if (get_rate[0].length > 0) {
            s = 0;

            for (i = 0; i < get_rate[0].length; i++) {
                s += get_rate[0][i].rate;
            }

            rate = s / get_rate[0].length;
        }

        return { rate, ipExist };
    } catch (err) {
        return err.message;
    }
}

rout.post('/get-one', authorization, async (req, resp) => {
    try {
        const { url } = req.body;

        const get_all_courses = await SQL.query('SELECT * FROM courses WHERE url=?', [url]);

        const course = get_all_courses[0][0];

        const get_all_courses_videos = await SQL.query('SELECT title,url,cart_img,video_part FROM courses_videos WHERE course_id=?', [course.id]);
        course.courses_videos = get_all_courses_videos[0];

        const externalIp = req.headers['x-real-ip'];
        const get_rate = await getRate(course.id, externalIp);

        course.rate = get_rate.rate;
        course.ipExist = get_rate.ipExist;
        resp.json(course);
    } catch (err) {
        resp.status(403).json({ msg: 'Something Was Wrong, Try Again' });
    }
})

rout.post('/get-all/by-filter', authorization, async (req, resp) => {
    try {
        let filterList = "";
        let next = "";


        if (typeof (req.body.filter.f_category) != "number" && req.body.filter.f_category != undefined) {
            req.body.filter.f_category = parseInt(req.body.filter.f_category)
        }

        if (typeof (req.body.filter.f_theme) == 'string') {
            req.body.filter.f_theme = JSON.parse(req.body.filter.f_theme)
        }
        if (typeof (req.body.filter.f_profesor) == 'string') {
            req.body.filter.f_profesor = JSON.parse(req.body.filter.f_profesor)
        }

        if (typeof (req.body.filter.f_theme) == 'string') {
            req.body.filter.f_theme = []
        }
        if (typeof (req.body.filter.f_profesor) == 'string') {
            req.body.filter.f_profesor = []
        }

        for (const property in req.body.filter) {
            if (property === "f_theme") {

                if (req.body.filter.f_theme.length == 1) {
                    filterList = filterList + ` AND ${property} LIKE '%${req.body.filter.f_theme[0]}%' `;
                } else if (req.body.filter.f_theme.length == 2) {
                    filterList = filterList + ` AND (${property} LIKE '%${req.body.filter.f_theme[0]}%' OR ${property} LIKE '%${req.body.filter.f_theme[1]}%')`;
                } else if (req.body.filter.f_theme.length == 3) {
                    filterList = filterList + ` AND (${property} LIKE '%${req.body.filter.f_theme[0]}%' OR ${property} LIKE '%${req.body.filter.f_theme[1]}%' OR ${property} LIKE '%${req.body.filter.f_theme[2]}%')`;

                } else if (req.body.filter.f_theme.length == 4) {
                    filterList = filterList + ` AND (${property} LIKE '%${req.body.filter.f_theme[0]}%' OR ${property} LIKE '%${req.body.filter.f_theme[1]}%' OR ${property} LIKE '%${req.body.filter.f_theme[2]}%' OR ${property} LIKE '%${req.body.filter.f_theme[3]}%')`;

                }
            } else if (property == "f_profesor") {
                console.log(req.body.filter, "req.body.filter");

                if (req.body.filter.f_profesor.length == 1) {
                    filterList = filterList + ` AND ${property}=${req.body.filter.f_profesor[0]}`;
                } else if (req.body.filter.f_profesor.length == 2) {
                    filterList = filterList + ` AND ${property}=${req.body.filter.f_profesor[0]} OR ${property}=${req.body.filter.f_profesor[1]}`;
                } else if (req.body.filter.f_profesor.length == 3) {
                    filterList = filterList + ` AND ${property}=${req.body.filter.f_profesor[0]} OR ${property}=${req.body.filter.f_profesor[1]} OR ${property}=${req.body.filter.f_profesor[2]}`;
                }

            } else {
                filterList = filterList + ` AND ${property}=${req.body.filter[property]}`;
            }
        }

        let get_all_courses = "";

        if (req.body.offset === undefined) {
            get_all_courses = await SQL.query(`SELECT id,title,url,front_text,front_image,for_woman,for_parents,for_future_parents,view,duration FROM courses WHERE public=1 ${filterList}`);

            resp.json(get_all_courses[0]);
        } else {
            get_all_courses = await SQL.query(`SELECT id,title,url,front_text,front_image,for_woman,for_parents,for_future_parents,view,duration FROM courses WHERE 
            public=1 ${filterList} LIMIT 10 OFFSET ${req.body.offset}`);

            next = await SQL.query(`SELECT id FROM courses WHERE public=1 ${filterList} LIMIT 10 OFFSET ${req.body.offset + 10}`);
            next = next[0].length;

            resp.json({ courses: get_all_courses[0], next: next });
        }
    } catch (err) {
        console.log(err)
        resp.status(403).json({ msg: 'Something Was Wrong, Try Again' });
    }
})


rout.post('/set-course-view', authorization, async (req, resp) => {
    try {
        const { url } = req.body;

        const get_courses = await SQL.query('SELECT view FROM courses WHERE url=?', [url]);

        const course = get_courses[0][0];

        const new_view = parseInt(course.view ? course.view : 0) + 1;

        const set_view = await SQL.query('UPDATE courses SET view=? WHERE url=?', [new_view, url]);

        resp.json({ success: true });
    } catch (err) {
        console.log(err)
        resp.status(403).json({ msg: 'Something Was Wrong, Try Again' });
    }
})

rout.post('/get-filter/', authorization, async (req, resp) => {
    try {
        const get_filters_cat = await SQL.query(`SELECT * FROM cours_categories`);
        const get_filters_them = await SQL.query(`SELECT * FROM cours_theme`);
        const get_filters_prof = await SQL.query(`SELECT * FROM cours_profs`);

        filters = {
            categories: get_filters_cat[0],
            theme: get_filters_them[0],
            profs: get_filters_prof[0]
        }

        resp.json(filters);
    } catch (err) {
        console.error(err)
        resp.status(403).json({ msg: 'Something Was Wrong, Try Again' });
    }
})

/////////
///////JWT
/////////

rout.post('/get-all/by-filter-signed', authentication, (req, resp) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRT, async err => {
        if (err) return resp.status(401).json({ message: 'Missing Authentication Header' });
        const { filter } = req.body;

        if (typeof (filter.f_category) != "number" && filter.f_category != undefined) {
            filter.f_category = parseInt(filter.f_category)
        }

        if (typeof (filter.f_theme) == 'string') {
            filter.f_theme = JSON.parse(filter.f_theme)
        }
        if (typeof (filter.f_profesor) == 'string') {
            filter.f_profesor = JSON.parse(filter.f_profesor)
        }

        if (typeof (filter.f_theme) == 'string') {
            filter.f_theme = []
        }
        if (typeof (filter.f_profesor) == 'string') {
            filter.f_profesor = []
        }

        try {
            let filterList = "";

            const forType = filter.medical_profesional ? "for_" + filter.medical_profesional : null;

            if (filter.medical_profesional || filter.medical_profesional == null) {
                delete filter.medical_profesional;
            }

            for (const property in filter) {
                if (property === "f_theme" && filter.f_theme.length != null) {

                    if (filter.f_theme.length == 1) {
                        filterList += `${filterList.length ? ' AND ' : ''} ${property} LIKE '%${filter.f_theme[0]}%' `;
                    } else if (filter.f_theme.length == 2) {
                        filterList += `${filterList.length ? ' AND ' : ''} (${property} LIKE '%${filter.f_theme[0]}%' OR ${property} LIKE '%${filter.f_theme[1]}%')`;
                    } else if (filter.f_theme.length == 3) {
                        filterList += `${filterList.length ? ' AND ' : ''} (${property} LIKE '%${filter.f_theme[0]}%' OR ${property} LIKE '%${filter.f_theme[1]}%' OR ${property} LIKE '%${filter.f_theme[2]}%')`;

                    } else if (filter.f_theme.length == 4) {
                        filterList += `${filterList.length ? ' AND ' : ''} (${property} LIKE '%${filter.f_theme[0]}%' OR ${property} LIKE '%${filter.f_theme[1]}%' OR ${property} LIKE '%${filter.f_theme[2]}%' OR ${property} LIKE '%${filter.f_theme[3]}%')`;

                    }
                } else if (property == "f_profesor" && filter.f_profesor.length != null) {
                    if (filter.f_profesor.length == 1) {
                        filterList += `${filterList.length ? ' AND ' : ''} ${property}=${filter.f_profesor[0]}`;
                    } else if (filter.f_profesor.length == 2) {
                        filterList += `${filterList.length ? ' AND ' : ''} (${property}=${filter.f_profesor[0]} OR ${property}=${filter.f_profesor[1]})`;
                    } else if (filter.f_profesor.length == 3) {
                        filterList += `${filterList.length ? ' AND ' : ''} (${property}=${filter.f_profesor[0]} OR ${property}=${filter.f_profesor[1]} OR ${property}=${filter.f_profesor[2]})`;
                    }

                } else {
                    filterList += `${filterList.length ? ' AND ' : ''} ${property}=${filter[property]}`;
                }
            }


            // console.log(filterList,"filterList");
            filterList = filterList.trim();

            let get_all_courses = "";

            if (req.body.offset == undefined) {
                get_all_courses = await SQL.query(`SELECT id,title,url,front_text,front_image,view,duration FROM courses WHERE public=1 ${forType ? 'AND ' + forType + '=1' : ''} ${filterList ? ' AND ' + filterList : ''}`);
                resp.json(get_all_courses[0]);
            } else {

                get_all_courses = await SQL.query(`SELECT id,title,url,front_text,front_image,view,duration FROM courses WHERE public=1 ${forType ? 'AND ' + forType + '=1' : ''} ${filterList ? ' AND ' + filterList : ''}
                LIMIT 10 OFFSET ${req.body.offset}`);


                next = await SQL.query(`SELECT id FROM courses WHERE public=1 ${forType ? 'AND ' + forType + '=1' : ''} ${filterList ? ' AND ' + filterList : ''} LIMIT 10 OFFSET ${req.body.offset + 10}`);
                next = next[0].length;

                resp.json({ courses: get_all_courses[0], next: next });
            }
        } catch (err) {
            console.error(err)
            resp.status(403).json({ msg: 'Something Was Wrong, Try Again' });
        }
    })
})

rout.post("/my-courses", authentication, async (req, resp) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRT, async err => {
        if (err) return resp.status(401).json({ message: 'Missing Authentication Header' });

        try {
            const user_type = req.body.user_type ? "for_" + req.body.user_type : null;

            let courses_ids = await SQL.query('SELECT course_id FROM orders WHERE user_id=? AND status=?', [req.body.user_id, 1]);

            courses_ids = courses_ids[0].map(item => item.course_id);

            var courses = [];

            if (courses_ids.length) {
                courses = await SQL.query(`SELECT * FROM courses WHERE ID in (${courses_ids.join(",")})`);
            } else {
                courses = [];
            }

            courses = courses.length ? courses[0] : [];

            let my_courses = await SQL.query(`SELECT course_id FROM my_courses WHERE user_id=?`,
                [req.body.user_id]);

            my_courses = my_courses.length ? my_courses[0] : [];

            if (my_courses.length) {
                for (let i = 0; i < my_courses.length; i++) {
                    let resp = await SQL.query(`SELECT * FROM courses WHERE id=?`, [my_courses[i]["course_id"]])

                    if (resp[0][0]) courses.push(resp[0][0]);
                }
            }

            let used_ids = courses.length ? courses.map(item => item.id) : [];

            used_ids.length ? used_ids = used_ids.join(",") : used_ids = 0;

            let recommended = await SQL.query(`SELECT * FROM courses WHERE ${user_type ? user_type + '=1 AND ' : ''} public=1 AND id NOT IN (${used_ids})`)

            recommended = recommended[0];
            let moneyCourses = await SQL.query('SELECT money ,course_id,date_crt FROM orders WHERE user_id=? AND status=?', [req.body.user_id, 1])

            let coursesfeatchorders = courses.map((elem) => {
                let filter = moneyCourses[0].filter((item => item.course_id == elem.id));
                if (filter.length) {
                    return {
                        ...elem,
                        money: filter[0].money,
                        date: filter[0].date_crt,
                    }
                } else {
                    return elem
                }

            });

            resp.json({ courses: coursesfeatchorders, recommended });
        } catch (err) {
            console.error(err)
            resp.status(403).json({ msg: 'Something Was Wrong, Try Again' });
        }
    })
})

rout.post("/purchases", authentication, async (req, resp) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRT, async err => {
        if (err) return resp.status(401).json({ message: 'Missing Authentication Header' });

        try {
            const courses_ids = await SQL.query('SELECT course_id FROM orders WHERE user_id=? AND status=?', [req.body.user_id, 1]);

            if (!courses_ids[0].length) return resp.json([]);

            courses_ids[0] = courses_ids[0].map(item => item.course_id);

            const courses = await SQL.query(`SELECT * FROM courses WHERE ID in (${courses_ids[0].join(",")})`);

            for (var i = 0; i < courses[0].length; i++) {
                var prof_name = await SQL.query(`SELECT title FROM cours_profs WHERE id='${courses[0][i]["f_profesor"]}'`);

                courses[0][i]["prof_name"] = prof_name[0][0]["title"];
            }


            let cursesMoneyAndDate = await SQL.query('SELECT course_id,money,date_crt FROM orders WHERE user_id=? AND status=?', [req.body.user_id, 1])

            courses[0] = courses[0].map((elem) => {
                let filtred = cursesMoneyAndDate[0].filter((item) => item.course_id == elem.id);
                if (filtred.length) {
                    return {
                        ...elem,
                        ...filtred[0]
                    }
                } else {
                    return elem
                }
            })
            resp.json(courses[0]);
        } catch (err) {
            console.log(err)
            resp.status(403).json({ msg: 'Something Was Wrong, Try Again' });
        }
    })
})

rout.post('/get-one-signed', authentication, async (req, resp) => {
    // jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRT, async(err)=>{
    //     if(err)return resp.status(401).json({ message: 'Missing Authentication Header'});
    try {
        const { url, medical_profesional, user_id } = req.body;
        const get_all_courses = await SQL.query('SELECT * FROM courses WHERE url=?', [url]);
        const course = get_all_courses[0][0];

        const optionsData = readFileSync(join(__dirname, '../../resources', 'options.json'), {
            encoding: 'utf-8',
        });
        const options = JSON.parse(optionsData);

        course.price_month = options.month;
        course.price_year = options.year;

        delete course.price_woman;
        delete course.price_parents;
        delete course.price_future_parents;

        const [subscription] = await SQL.query('SELECT payment_date, type FROM subscription WHERE user_id=?', [user_id]);

        course.isActive = subscription[0]?.payment_date && checkSubscription(subscription[0].type, subscription[0].payment_date);

        const autorId = course.f_profesor;
        const get_autor = await SQL.query('SELECT title FROM cours_profs WHERE id=?', [autorId]);
        course.autor = get_autor[0][0].title;
        const get_all_courses_videos = await SQL.query('SELECT * FROM courses_videos WHERE course_id=?', [course.id]);
        course.courses_videos = get_all_courses_videos[0];

        const externalIp = req.headers['x-real-ip'];
        const get_rate = await getRate(course.id, externalIp);

        course.rate = get_rate.rate;
        course.ipExist = get_rate.ipExist;

        const get_watch_list = await SQL.query('SELECT video_id FROM user_watch_list WHERE course_id=?', [course.id]);
        const watch_list = get_watch_list[0];

        for (let i = 0; i < course.courses_videos.length; i++) {
            if(!course.isActive)
                delete course.courses_videos[i].vimeo;

            course.courses_videos[i].watched = false;

            for (let j = 0; j < watch_list.length; j++) {
                if (course.courses_videos[i].id === watch_list[j].video_id) {
                    course.courses_videos[i].watched = true;
                    break;
                }
            }
        }

        let watchAll = true;

        for (let i = 0; i < course.courses_videos.length; i++) {
            if (course.courses_videos[i].watched === false) {
                watchAll = false;
                break;
            }
        }

        course.watchAll = watchAll;

        // const checkOrder = await SQL.query('SELECT status FROM orders WHERE course_id=? AND user_id=?', [course.id, req.body.user_id]);

        // if (checkOrder[0].length) {
        //     course.isActive = true;
        // } else {
        //     course.checkOrder = false;
        // }

        let checkIsUserPassedQuiz = await SQL.query(`
                SELECT COUNT(id) as count FROM user_quiz WHERE course_id=? AND user_id=? AND success=1
            `, [course.id, user_id]);

        checkIsUserPassedQuiz = checkIsUserPassedQuiz[0][0].count;

        course.checkIsUserPassedQuiz = checkIsUserPassedQuiz;

        let getStep = await SQL.query(`
                SELECT step FROM user_quiz WHERE course_id=? AND user_id=?
            `, [course.id, user_id]);

        getStep = getStep[0]

        if (!getStep || !getStep.length) {
            getStep = 0;
        } else {
            getStep = getStep[getStep.length - 1]["step"];
        }

        course.step = getStep;

        resp.json(course);
    } catch (err) {
        console.error(err)
        resp.status(403).json({ msg: 'Something Was Wrong, Try Again' });
    }
    // })
})

/////////
//////QUIZ
/////////

rout.post('/get-quiz-questions', authentication, async (req, resp) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRT, async err => {
        if (err) return resp.status(401).json({ message: 'Missing Authentication Header' });

        let { course_id, step } = req.body;

        const get_quiz = await SQL.query('SELECT questions FROM cours_quiz WHERE cours_id=? AND step=?',
            [course_id, step]);

        let quiz = get_quiz[0][0];

        if (quiz) {
            quiz.questions = JSON.parse(quiz.questions);
        } else {
            quiz = { status: "unavailable" };
        }

        resp.json(quiz);
    })
})

// rout.post('/get-step-quiz', authentication, async (req, resp) => {
//     jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRT, async err => {
//         if (err) return resp.status(401).json({ message: 'Missing Authentication Header' });

//         let { course_id, step } = req.body;

//         const getQuizQuery = await SQL.query(`
//             SELECT * FROM cours_quiz WHERE cours_id=? AND step=?
//         `, [course_id, step]);

//         let quiz = getQuizQuery[0][0];

//         if (quiz) {
//             quiz.questions = JSON.parse(quiz.questions);

//             let get_course_url = await SQL.query('SELECT url, credits FROM courses WHERE id=?', [course_id]);

//             quiz.course_url = get_course_url[0][0].url;

//             quiz.course_credits = get_course_url[0][0].credits;
//         } else {
//             quiz = {status: "unavailable"};
//         }

//         resp.json(quiz);
//     })
// })

// rout.post('/get-quiz', authentication, async (req, resp) => {
//     jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRT, async err => {
//         if (err) return resp.status(401).json({ message: 'Missing Authentication Header' });

//         let { course_id, user_id, step } = req.body;

//         try {
//             let get_current_step = "";

//             if (step) {
//                 get_current_step = await SQL.query(`
//                 SELECT step, success FROM user_quiz WHERE course_id=? AND user_id=? AND step=?
//             `, [course_id, user_id, step]);
//             } else {
//                 get_current_step = await SQL.query(`
//                 SELECT step, success FROM user_quiz WHERE course_id=? AND user_id=?
//             `, [course_id, user_id]);
//             }

//             get_current_step = get_current_step[0];

//             if (!step) {
//                 step = 1;
//             }

//             const get_quiz = await SQL.query('SELECT * FROM cours_quiz WHERE cours_id=? AND step=?', 
//             [course_id, step]);

//             let quiz = get_quiz[0][0];

//             if (quiz) {
//                 quiz.questions = JSON.parse(quiz.questions);

//                 let get_course_url = await SQL.query('SELECT url, credits FROM courses WHERE id=?', [course_id]);

//                 quiz.course_url = get_course_url[0][0].url;

//                 quiz.course_credits = get_course_url[0][0].credits;    
//             } else {
//                 quiz = {status: "unavailable"};
//             }

//             resp.json(quiz);
//         } catch (err) {
//             console.log(err)
//             resp.status(403).json({ msg: 'Something Was Wrong, Try Again' });
//         } 
//     })
// })

// rout.post('/set-quiz-result', authentication, async (req, resp) => {
//     jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRT, async err => {
//         if (err) return resp.status(401).json({ message: 'Missing Authentication Header'});

//         let { course_id, quiz_id, quiz_titile, quiz_desc, credit, point, success, date, step, user_id, trueAnswers } = req.body;

//         if (success == false) credit = 0;

//         try {
//             const get_quiz = await SQL.query('SELECT * FROM user_quiz WHERE course_id=? && quiz_id=? && user_id=?', [course_id, quiz_id, user_id]);

//             if (get_quiz[0].length > 0) {
//                 await SQL.query('UPDATE user_quiz SET quiz_titile=?,quiz_desc=?,credit=?,point=?,success=?,trueAnswers=?,date=?,step=? WHERE course_id=? && quiz_id=? && user_id=?',
//                                 [quiz_titile, quiz_desc,  credit,  point,  success,  trueAnswers, date, step, course_id, quiz_id, user_id]);

//                 let insertId = null;

//                 if (success) {
//                     insertId = get_quiz[0][0].id;
//                 }

//                 resp.json({success: true, insertId});
//             } else {
//                 const set_quiz = await SQL.query('INSERT INTO user_quiz (course_id,quiz_id,quiz_titile,quiz_desc,credit,point,success,trueAnswers,date,step,user_id) VALUE (?,?,?,?,?,?,?,?,?,?,?)',
//                                                     [course_id,quiz_id,quiz_titile,quiz_desc,credit,point,success,trueAnswers,date,step,user_id]);
//                 let insertId = null;

//                 var expireDate = new Date();
//                 expireDate.setDate(expireDate.getDate() + 30);

//                 if (step === 3 && !success) {
//                     await SQL.query(`
//                         INSERT INTO quiz_disable (course_id, user_id, date) VALUES (?,?,?)
//                     `, [course_id, user_id, expireDate]);
//                 }

//                 if (success) {
//                     await SQL.query(`
//                        DELETE FROM user_quiz WHERE course_id=? AND user_id=? AND success=?
//                     `, [course_id, user_id, 0]);

//                     insertId = set_quiz[0].insertId;
//                 }

//                 resp.json({success: true, insertId});
//             }
//         } catch(err) {
//             console.log(err)
//             resp.status(403).json({ msg: 'Something Was Wrong, Try Again'});
//         } 
//     })
// })

// rout.post('/update-quiz-result', authentication, async(req,resp)=>{
//     jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRT, async(err)=>{
//         if(err)return resp.status(401).json({ message: 'Missing Authentication Header'});
//         const {course_id,quiz_id,quiz_titile,quiz_desc,credit,point,success,date,user_id}=req.body;
//         try{
//             const update_quiz=await SQL.query('UPDATE user_quiz SET  quiz_titile=?,quiz_desc=?,credit=?,point=?,success=?,date=? WHERE course_id=? && quiz_id && user_id=?',
//                                                                   [quiz_titile,quiz_desc,credit!==""?credit:0,point,success,date,course_id,quiz_id,user_id]);
//             resp.json({success:true});
//         }   
//         catch(err){
//             resp.status(403).json({ msg: 'Something Was Wrong, Try Again'});
//         } 
//     })
// })


// Rate
rout.post('/set-rate', authorization, async (req, resp) => {
    try {
        const { course_title, course_id, rate } = req.body;
        internalIp = osNet["eth1"] !== undefined ? osNet["eth1"][0].address : osNet['Wi-Fi'][1].address;
        externalIp = req.headers['x-real-ip'];
        ip = externalIp + '/' + internalIp;
        set_rate = await SQL.query(`INSERT INTO star_rate (course_title,course_id,ip,rate) VALUE (?,?,?,?)`, [course_title, course_id, ip, rate]);
        resp.json({ success: true });
    } catch (err) {
        console.log(err);
        return resp.status(403).json({ msg: 'Something Was Wrong, Try Again' });
    }
})

rout.post('/set-comment', authorization, async (req, resp) => {
    try {
        const { content, course_id, author_name, author_email, prof } = req.body;

        set_rate = await SQL.query(`INSERT INTO cours_comment (content,course_id,author_name,author_email,prof,date) VALUE (?,?,?,?,?,?)`, [content, course_id, author_name, author_email, new Date().toDateString(), prof]);

        resp.json({ success: true });
    } catch (err) {
        console.log(err)
        return resp.status(403).json({ msg: 'Something Was Wrong, Try Again' });
    }
})

rout.post('/get-comment', authorization, async (req, resp) => {
    try {
        const { course_id } = req.body;

        const get_comments = await SQL.query(`SELECT content,author_name,author_email,date,prof FROM cours_comment WHERE confirm=1 AND course_id=? ORDER by id DESC`, [course_id]);

        const comments = get_comments[0];

        resp.json(comments);
    } catch (err) {
        return resp.status(403).json({ msg: 'Something Was Wrong, Try Again' });
    }
})

// JWT
rout.post('/set-watch-list', authentication, async (req, resp) => {
    jwt.verify(req.token, process.env.ACCESS_TOKEN_SECRT, async err => {
        if (err) return resp.status(401).json({ message: 'Missing Authentication Header' });

        try {
            const { course_id, video_id } = req.body;

            await SQL.query('INSERT INTO user_watch_list (course_id,video_id) VALUES (?,?)', [course_id, video_id]);

            return resp.json({ success: true });
        } catch (err) {
            console.log(err);
            resp.status(403).json({ msg: 'Something Was Wrong, Try Again' });
        }
    })
})

rout.post("/create-mycourses", async (req, resp) => {
    try {
        const my_course_exists = await SQL.query(`
            SELECT EXISTS(SELECT * FROM my_courses WHERE user_id=? AND course_id=?) AS row
        `, [req.body.user_id, req.body.course_id]);

        const orders_exists = await SQL.query(`
            SELECT EXISTS(SELECT * FROM orders WHERE user_id=? AND course_id=?) AS row
        `, [req.body.user_id, req.body.course_id]);

        if (my_course_exists[0][0]["row"] || orders_exists[0][0]["row"]) return;

        await SQL.query('INSERT INTO my_courses (course_id, user_id) VALUES (?, ?)', [req.body.course_id, req.body.user_id]);
    } catch (err) {
        console.log(err)
        resp.status(403).json({ msg: 'Something Was Wrong, Try Again' });
    }
});

module.exports = rout;