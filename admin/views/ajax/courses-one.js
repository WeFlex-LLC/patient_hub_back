const title = document.getElementById('title');
const url = document.getElementById('url');
const err = document.getElementById('err');
const success = document.getElementById("success");
const editCourses = document.getElementById('editCourses');
const course_id = document.getElementById('course_id');

title.oninput = () => {
    const textArr = title.value.split(" ");

    for (let i = 0; i < textArr.length; i++) {
        if (textArr[i] == "") textArr.splice(i, 1);
    }

    const url_content = textArr.join("-");
    
    url.value = url_content.replaceAll("/", "-").toLowerCase().trim();
}

function publicFunc (param, id) {
    let formData = new FormData();
        formData.append("public", param === "0" ? 1 : 0);
        formData.append("uid", id);

    fetch('/admin/courses/edit/public', {
        method: 'POST',
        body: formData
    })
    .then(resp => resp.json())
    .then(data => {
        if (data.err || !data.success) {
            err.innerHTML = "Updating Failed.";
            success.innerHTML = "";
            return;
        }

        success.innerHTML = "Successfully Updated.";
        err.innerHTML = "";
    })
}

editCourses.onsubmit = e => {
    e.preventDefault();

    fetch('/admin/courses/edit', {
        method: 'POST',
        body: new FormData(editCourses),
    })
    .then(resp => resp.json())
    .then(data => {
        if (data.err || !data.success) {
            err.innerHTML = "Updating Failed.";
            success.innerHTML = "";
            return
        }

        success.innerHTML = "Successfully Updated.";
        err.innerHTML = "";
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    })
}

///////////////////////
//////////////ADD VIDEO FOR COURSE
///////////////////////

const titleV = document.getElementById('titleV');
const urlV = document.getElementById('urlV');
const errV = document.getElementById('errV');
const addVideo = document.getElementById('addVideo');

titleV.oninput = () => {
    const textArr = titleV.value.split(" ");
    
    for (let i = 0; i < textArr.length; i++) {
        if (textArr[i] == "") textArr.splice(i,1);
    }

    const urlV_content = textArr.join("-");
    
    urlV.value = urlV_content.toLowerCase().trim();
}

addVideo.onsubmit = e => {
    e.preventDefault();

    fetch('/admin/courses/add-video', {
        method: 'POST',
        body: new FormData(addVideo),
    })
    .then(res => res.json())
    .then(data => {
        errV.innerHTML = "";

        if (data.err) return errV.innerHTML=data.err;
        
        window.location.reload();
    })
}

// addVideoButton.onclick=()=>{
//     let e = new Event('submit');
//     addVideo.dispatchEvent(e);
// }

const showCourseVideo = e => {
    const img = e.parentElement.parentElement.getElementsByTagName('img')[2];

    if (img.style.zIndex === "" || img.style.zIndex == 10) {
        img.style.zIndex = 3;
    } else {
        img.style.zIndex = 10;
    }
}

const deleteCourseVideo = (e, id) => {
    if (!confirm("Do You Want To Remove Chapter?")) return;
    
    c_id = course_id.value;

    fetch('/admin/courses/del-video', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({id, c_id}),
    })
    .then(res => res.json())
    .then(data => {
        errV.innerHTML = "";

        if (data.err) return errV.innerHTML = data.err;
        
        e.parentElement.parentElement.parentElement.parentElement.remove();
    })
}

const chapter_video = document.getElementById('vv');

if (chapter_video) {
    chapter_video.required = true;
}

addVideo['vimeo'].oninput = () => {
    if (addVideo['vimeo'].value !== "") {
        chapter_video.required = false;
    } else {
        chapter_video.required = true;
    }
}

const cat_options = document.getElementById("f_category_id").options;

const cat_id = new Object();

let cat_selected = null;

for (let i = 0; i < cat_options.length; i++) {
    if (cat_options[i].value == "") continue;

    if (cat_options[i].selected) cat_selected = i;
    
    cat_id[cat_options[i].value]={theme:[],prof:[]};
}

const theme_options = document.getElementById("f_theme_id").options;

let them_selected = null;

for(let i=0;i<theme_options.length;i++){
    let cat_id_crt=theme_options[i].label;
    if(cat_id[cat_id_crt]===undefined)continue;
    if(theme_options[i].disabled)them_selected=theme_options[i].value;
    cat_id[cat_id_crt].theme.push({
        id:theme_options[i].value,
        value:theme_options[i].text
    })
}

const prof_options = editCourses['f_profesor'].options;
let prof_selected = null;

for (let i = 0; i < prof_options.length; i++) {
    let cat_id_crt = prof_options[i].label;
    
    if (cat_id[cat_id_crt] === undefined) continue;
    
    if (prof_options[i].disabled) prof_selected = prof_options[i].value;
    
    cat_id[cat_id_crt].prof.push({
        id: prof_options[i].value,
        value: prof_options[i].text
    })
}

// const catBox = editCourses['f_category'];
const catBox = document.getElementById("f_category_id")
const themeBox = document.getElementById("f_theme_id");
const profBox = editCourses['f_profesor'];

catBox.onchange = () => {
   let sel_id = catBox.value;
   let sel_arr = cat_id[sel_id];
   let them_filter = sel_arr.theme;
   let prof_filter = sel_arr.prof;

   fillThemes(them_filter);
   fillProfs(prof_filter);
}

const catBoxOnchange = () => {
   catBox.options[cat_selected].disabled = false;
   catBox.options[cat_selected].selected = true;

   let sel_id = catBox.options[cat_selected].value;
   let sel_arr = cat_id[sel_id];
   let them_filter = sel_arr.theme;
   let prof_filter = sel_arr.prof;

   fillThemes(them_filter);
   fillProfs(prof_filter);
}

const fillThemes = filted => {
    themeBox.innerHTML = "";
    themeBox.disabled = false;

    for (const prop in filted) {
        themeBox.innerHTML += `<option value="${filted[prop].id}" ${filted[prop].id==them_selected?'selected':''}>${filted[prop].value}</option>`
    }
}

const fillProfs=(filted)=>{
    profBox.innerHTML="";
    profBox.disabled=false;
    for (const prop in filted){
        profBox.innerHTML+=`<option value="${filted[prop].id}" ${filted[prop].id==prof_selected?'selected':''}>${filted[prop].value}</option>`
    }
}

catBoxOnchange();


/////////////
////////QUIZ
////////////

let qS = 0;

const quiz_body = [
    {
        course_id: course_id.value,
        title: "",
        description: '',
        questions: [],
        step: 1
    },
    {
        course_id: course_id.value,
        title: "",
        description: '',
        questions: [],
        step: 2
    },
    {
        course_id: course_id.value,
        title: "",
        description: '',
        questions: [],
        step: 3
    }
];

getQuiz = id => {
    fetch('/admin/courses/quiz/get', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({course_id: id}),
    })
    .then(resp => resp.json())
    .then(data => {
        if (data.err) return;

        data.data.forEach((element, index) => {
            document.getElementsByClassName("quiz_title")[element.step - 1].value = element.title;
            document.getElementsByClassName("quiz_desc")[element.step - 1].innerHTML = element.description;
        
            quiz_body[index].title = element.title;

            quiz_body[index].course_id = element.cours_id;
            
            quiz_body[index].description = element.description;

            quiz_body[index].questions = JSON.parse(element.questions);
        });
    })
}

getQuiz(course_id.value);

const quizPopUp = step => {
    if (!document.getElementsByClassName("crt_quiz_popup")[step - 1].classList.contains('open')) {
        document.getElementsByClassName("crt_quiz_popup")[step - 1].classList.add('open');

        qS = 0;
    } else {
        document.getElementsByClassName("crt_quiz_popup")[step - 1].classList.remove('open');
    }

    quizPopUpPart(step);
}

//Ok logic
const quizPopUpPart = step => {
    if (qS === 0) {
        document.getElementsByClassName("main_data")[step - 1].style.display = "block";
        document.getElementsByClassName("question_data")[step - 1].style.display = "none";
    } else {
        document.getElementsByClassName("main_data")[step - 1].style.display = "none";
        document.getElementsByClassName("question_data")[step - 1].style.display = "block";
    }
}

const fillQuiz = step => {
    if (qS === 11) {
        quizSave(step);
        // alert('FINISH');
        return;
    }

    let parentElem = document.getElementsByClassName("crt_quiz_popup")[step - 1];
    
    document.getElementsByClassName("qsBox")[step - 1].innerHTML = qS;

    if (quiz_body[step - 1].questions[qS - 1] !== undefined) {
        document.getElementsByClassName("quiz_question")[step - 1].value = quiz_body[step - 1].questions[qS - 1].qw;
        document.getElementsByClassName("quiz_answer1")[step - 1].value = quiz_body[step - 1].questions[qS - 1].aw1;
        document.getElementsByClassName("quiz_answer2")[step - 1].value = quiz_body[step - 1].questions[qS - 1].aw2;
        document.getElementsByClassName("quiz_answer3")[step - 1].value = quiz_body[step - 1].questions[qS - 1].aw3;
        document.getElementsByClassName("quiz_answer4")[step - 1].value = quiz_body[step - 1].questions[qS - 1].aw4;
        document.getElementsByClassName("quiz_answer5")[step - 1].value = quiz_body[step - 1].questions[qS - 1].aw5;
        
        if ((quiz_body[step - 1].questions[qS - 1].awR !== 0 && quiz_body[step - 1].questions[qS - 1].awR !== undefined)) {
            resetRightAnswer(step);

            parentElem.querySelectorAll(".questionCheck")[quiz_body[step - 1].questions[qS - 1].awR - 1].checked = true
        }
    } else {
        document.getElementsByClassName("quiz_question")[step - 1].value = '';
        document.getElementsByClassName("quiz_answer1")[step - 1].value = '';
        document.getElementsByClassName("quiz_answer2")[step - 1].value = '';
        document.getElementsByClassName("quiz_answer3")[step - 1].value = '';
        document.getElementsByClassName("quiz_answer4")[step - 1].value = '';
        document.getElementsByClassName("quiz_answer5")[step - 1].value = '';

        resetRightAnswer(step);
        
        quiz_body[step - 1].questions[qS - 1] = {
            qw: '',
            aw1: '',
            aw2: '',
            aw3: '',
            aw4: '',
            aw5: '',
            awR: 0
        };
    }
}

const getRightAnswer = step => {
    const parentElem = document.getElementsByClassName("crt_quiz_popup")[step - 1];

    for (let i = 0; i < parentElem.querySelectorAll(".questionCheck").length; i++) {
        if (parentElem.querySelectorAll(".questionCheck")[i].checked) {
            return parentElem.querySelectorAll(".questionCheck")[i].value;
        }
    }
}

const resetRightAnswer = step => {
    const parentElem = document.getElementsByClassName("crt_quiz_popup")[step - 1];

    for (let i = 0; i < parentElem.querySelectorAll(".questionCheck").length; i++) {
        parentElem.querySelectorAll(".questionCheck")[i].checked = false;
    }
}

const quizNext = step => {
    document.getElementsByClassName("quiz_err")[step - 1].innerHTML = "";

    if (!document.getElementsByClassName("quiz_title")[step - 1].value.trim() || !document.getElementsByClassName("quiz_desc")[step - 1].value.trim()) {
        return document.getElementsByClassName("quiz_err")[step - 1].innerHTML = "Title and description are required";
    }

    if (qS > 0) {
        let answer1 = document.getElementsByClassName("quiz_answer1")[step - 1].value.trim();
        let answer2 = document.getElementsByClassName("quiz_answer2")[step - 1].value.trim();
        let answer3 = document.getElementsByClassName("quiz_answer3")[step - 1].value.trim();
        let answer4 = document.getElementsByClassName("quiz_answer4")[step - 1].value.trim();
        let answer5 = document.getElementsByClassName("quiz_answer5")[step - 1].value.trim();
        let question = document.getElementsByClassName("quiz_question")[step - 1].value.trim();

        var uniqueArr = [answer1, answer2, answer3, answer4, answer5];

        if (!answer1 || !answer2 || !answer3 || !answer4 || !answer5 || !question) {
            return document.getElementsByClassName("quiz_err")[step - 1].innerHTML = "Please fill in all the required fields.";
        }

        if (uniqueArr.some((e, i, arr) => arr.indexOf(e) !== i)) {
            return document.getElementsByClassName("quiz_err")[step - 1].innerHTML = "All fields must be unique.";
        }
    }

    if (qS === 0) {
        quiz_body[step - 1].title = document.getElementsByClassName("quiz_title")[step - 1].value;
        
        quiz_body[step - 1].description = document.getElementsByClassName("quiz_desc")[step - 1].value;
        
        qS = 1;

        fillQuiz(step);

        quizPopUpPart(step);
    } else {
        if (qS === 10) return;
        
        if (getRightAnswer(step) === undefined) return document.getElementsByClassName("quiz_err")[step - 1].innerHTML = "Please choose the correct answer";
        
        document.getElementsByClassName("qsBox")[step - 1].innerHTML = qS + 1;

        quiz_body[step - 1].questions[qS - 1].qw = document.getElementsByClassName("quiz_question")[step - 1].value;
        quiz_body[step - 1].questions[qS - 1].aw1 = document.getElementsByClassName("quiz_answer1")[step - 1].value;
        quiz_body[step - 1].questions[qS - 1].aw2 = document.getElementsByClassName("quiz_answer2")[step - 1].value;
        quiz_body[step - 1].questions[qS - 1].aw3 = document.getElementsByClassName("quiz_answer3")[step - 1].value;
        quiz_body[step - 1].questions[qS - 1].aw4 = document.getElementsByClassName("quiz_answer4")[step - 1].value;
        quiz_body[step - 1].questions[qS - 1].aw5 = document.getElementsByClassName("quiz_answer5")[step - 1].value;
        quiz_body[step - 1].questions[qS - 1].awR = getRightAnswer(step) !== undefined ? getRightAnswer(step) : 0;

        qS++;
        
        fillQuiz(step);
    }
}

const quizPrev = step => {
    document.getElementsByClassName("quiz_err")[step - 1].innerHTML = "";

    if (qS === 1) {
        qS = 0;
        quizPopUpPart(step);
        return;
    } else {
        document.getElementsByClassName("qsBox")[step - 1].innerHTML = qS - 1;
        
        if (qS !== 0) {
            qS = qS - 1;

            if (qS === 10) {
                document.getElementsByClassName("question_data")[step - 1].style.display = 'block';
            }
        } else {
            return;
        }

        fillQuiz(step);
    }
}

const quizSave = step => {
    document.getElementsByClassName("quiz_err")[step - 1].innerHTML = "";

    if (!document.getElementsByClassName("quiz_title")[step - 1].value.trim() || !document.getElementsByClassName("quiz_desc")[step - 1].value.trim()) {
        document.getElementsByClassName("quiz_err")[step - 1].innerHTML = "Title and description are required";
        return;
    }
    
    if (quiz_body[step - 1].questions[0] === null) quiz_body[step - 1].questions.splice(0, 1);

    quiz_body[step - 1].title = document.getElementsByClassName("quiz_title")[step - 1].value;
    quiz_body[step - 1].description = document.getElementsByClassName("quiz_desc")[step - 1].value;

    if (qS > 0) {
        let answer1 = document.getElementsByClassName("quiz_answer1")[step - 1].value.trim();
        let answer2 = document.getElementsByClassName("quiz_answer2")[step - 1].value.trim();
        let answer3 = document.getElementsByClassName("quiz_answer3")[step - 1].value.trim();
        let answer4 = document.getElementsByClassName("quiz_answer4")[step - 1].value.trim();
        let answer5 = document.getElementsByClassName("quiz_answer5")[step - 1].value.trim();
        let question = document.getElementsByClassName("quiz_question")[step - 1].value.trim();

        var uniqueArr = [answer1, answer2, answer3, answer4, answer5];

        if (!answer1 || !answer2 || !answer3 || !answer4 || !answer5 || !question) {
            return document.getElementsByClassName("quiz_err")[step - 1].innerHTML = "Please fill in all the required fields.";
        }

        if (uniqueArr.some((e, i, arr) => arr.indexOf(e) !== i)) {
            return document.getElementsByClassName("quiz_err")[step - 1].innerHTML = "All fields must be unique.";
        }

        if (quiz_body[step - 1].questions.length !== 10) {
            return document.getElementsByClassName("quiz_err")[step - 1].innerHTML = "Please fill all the 10 fields";
        }
    } else {
        if (quiz_body[step - 1].questions.length !== 10) {
            return document.getElementsByClassName("quiz_err")[step - 1].innerHTML = "Please fill all the 10 fields";
        }
    }

    if (qS === 11) return;
        
    if (getRightAnswer(step) === undefined) return;
        
    document.getElementsByClassName("qsBox")[step - 1].innerHTML = qS + 1;

    quiz_body[step - 1].questions[qS - 1].qw = document.getElementsByClassName("quiz_question")[step - 1].value;
    quiz_body[step - 1].questions[qS - 1].aw1 = document.getElementsByClassName("quiz_answer1")[step - 1].value;
    quiz_body[step - 1].questions[qS - 1].aw2 = document.getElementsByClassName("quiz_answer2")[step - 1].value;
    quiz_body[step - 1].questions[qS - 1].aw3 = document.getElementsByClassName("quiz_answer3")[step - 1].value;
    quiz_body[step - 1].questions[qS - 1].aw4 = document.getElementsByClassName("quiz_answer4")[step - 1].value;
    quiz_body[step - 1].questions[qS - 1].aw5 = document.getElementsByClassName("quiz_answer5")[step - 1].value;
    quiz_body[step - 1].questions[qS - 1].awR = getRightAnswer(step) !== undefined ? getRightAnswer(step) : 0;

    if (qS <= 10) qS = qS + 1;

    fillQuiz(step);
    
    fetch('/admin/courses/quiz/set', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(quiz_body[step - 1]),
    })
    .then(res => res.json())
    .then(data => {
        if (!data.err) return document.getElementsByClassName("quiz_err")[step - 1].innerHTML = window.location.reload();
        
        document.getElementsByClassName("quiz_err")[step - 1].innerHTML = "Something went wrong!";
    })
}


function DeletePdf (id){
    let form =new FormData();
    form.append("id",id)
    fetch('/admin/courses/deletePdf', {
        method: 'POST',
        body: form
    })
    .then(resp => resp.json())
    .then(data=>{
        if(data.success){
            window.location.reload()
        }
    })
}

function DeleteFtheme (courseid,filter){
    
    let form =new FormData();
    form.append("course_id",courseid);
    form.append("filter",filter)
    fetch('/admin/courses/deletef_team', {
        method: 'POST',
        body: form
    })
    .then(resp => resp.json())
    .then(data=>{
        if(data.success){
            window.location.reload();
            
        }
    })
}
