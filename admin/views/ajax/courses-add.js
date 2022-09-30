const title=document.getElementById('title');
const url=document.getElementById('url');
const err=document.getElementById('err');
const addCourses=document.getElementById('addCourses');

title.oninput=()=>{
    const textArr=title.value.split(" ");
    for(let i=0; i<textArr.length; i++){
        if(textArr[i]=="")textArr.splice(i,1);
    }
    const url_content=textArr.join("-");
    url.value=url_content.toLowerCase().trim();
}

addCourses.onsubmit=(e)=>{
    e.preventDefault();
    fetch('/admin/courses/add',{
        method:'POST',
        body:new FormData(addCourses),
    })
    .then(resp=>{return resp.json()})
    .then(data=>{
        err.innerHTML="";
        if(data.err)return err.innerHTML=data.err;
        window.location.assign(`./one/${data.id}`);
    })
}

const createQuiz = () => {
    return  
}

const cat_options = addCourses['f_category'].options;
const cat_id = new Object();

for (let i = 0; i < cat_options.length; i++) {
    if(cat_options[i].value=="")continue;
    cat_id[cat_options[i].value]={theme:[],prof:[]};
}

const theme_options = document.getElementById("f_theme").options;

for (let i = 0; i < theme_options.length; i++) {
    let cat_id_crt = theme_options[i].label;

    if (cat_id[cat_id_crt] === undefined) continue;
    
    cat_id[cat_id_crt].theme.push({
        id:theme_options[i].value,
        value:theme_options[i].text
    })
}

const prof_options = addCourses['f_profesor'].options;

for (let i = 0; i < prof_options.length; i++) {
    let cat_id_crt = prof_options[i].label;

    if(cat_id[cat_id_crt]===undefined)continue;
    
    cat_id[cat_id_crt].prof.push({
        id:prof_options[i].value,
        value:prof_options[i].text
    })
}

const catBox = addCourses['f_category'];
const themeBox = document.getElementById("f_theme");
const profBox = addCourses['f_profesor'];

catBox.onchange = () => {
   let sel_id = catBox.value;
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
        themeBox.innerHTML += `<option value="${filted[prop].id}">${filted[prop].value}</option>`
    }
}

const fillProfs = filted => {
    profBox.innerHTML = "";

    profBox.disabled = false;

    for (const prop in filted) {
        profBox.innerHTML += `<option value="${filted[prop].id}">${filted[prop].value}</option>`
    }
}