const course_meue=document.getElementsByClassName('course_meue')[0];
const course_meue_a=course_meue.getElementsByTagName('a');
const filterForm=document.getElementById('filterForm');
const searchParams=new URLSearchParams(window.location.search)
const public=searchParams.get('public');
const catBox = document.getElementById('f_category');
const themeBox=document.getElementById('f_theme');
const profBox=document.getElementById('f_profesor');
const sort=document.getElementById('sort');
const clear_all=document.getElementById('clear_all');

const setFilter = document.getElementById('setFilter');

public == 1 ? course_meue_a[0].classList.add('active') : course_meue_a[1].classList.add('active');

if (!searchParams.get('cat')) {
  
    const cat_options=document.getElementById('f_category').options;
    const cat_id=new Object();

    for(let i=0;i<cat_options.length;i++){
        if(cat_options[i].value=="")continue;
        cat_id[cat_options[i].value]={theme:[],prof:[]};
    }

    const theme_options=document.getElementById('f_theme').options;
    for(let i=0;i<theme_options.length;i++){
        let cat_id_crt=theme_options[i].label;
        if(cat_id[cat_id_crt]===undefined)continue;
        cat_id[cat_id_crt].theme.push({
            id:theme_options[i].value,
            value:theme_options[i].text
        })
    }

    const prof_options=document.getElementById('f_profesor').options;
    
    for (let i = 0; i < prof_options.length; i++) {
        let cat_id_crt = prof_options[i].label;
        
        if (cat_id[cat_id_crt] === undefined) continue;
        
        cat_id[cat_id_crt].prof.push({
            id: prof_options[i].value,
            value: prof_options[i].text
        })
    }

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
        
        themeBox.innerHTML += `<option value="">Choose Topic</option>`;

        for (const prop in filted) {
            themeBox.innerHTML += `<option value="${filted[prop].id}">${filted[prop].value}</option>`
        }
    }

    const fillProfs = filted => {
        profBox.innerHTML = "";
        profBox.disabled = false;

        profBox.innerHTML += `<option value="">Choose Author</option>`;

        for (const prop in filted) {
            profBox.innerHTML += `<option value="${filted[prop].id}">${filted[prop].value}</option>`
        }
    }
    
} else {
    let cat_selected = searchParams.get('cat');
 
     if (cat_selected==0){

        const cat_options=document.getElementById('f_category').options;
        const cat_id=new Object();
    
        for(let i=0;i<cat_options.length;i++){
            if(cat_options[i].value=="")continue;
            cat_id[cat_options[i].value]={theme:[],prof:[]};
        }
    
        const theme_options=document.getElementById('f_theme').options;
        for(let i=0;i<theme_options.length;i++){
            let cat_id_crt=theme_options[i].label;
            if(cat_id[cat_id_crt]===undefined)continue;
            cat_id[cat_id_crt].theme.push({
                id:theme_options[i].value,
                value:theme_options[i].text
            })
        }
    
        const prof_options=document.getElementById('f_profesor').options;
        
        for (let i = 0; i < prof_options.length; i++) {
            let cat_id_crt = prof_options[i].label;
            
            if (cat_id[cat_id_crt] === undefined) continue;
            
            cat_id[cat_id_crt].prof.push({
                id: prof_options[i].value,
                value: prof_options[i].text
            })
        }
    
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
            
            themeBox.innerHTML += `<option value="">Choose Topic</option>`;
    
            for (const prop in filted) {
                themeBox.innerHTML += `<option value="${filted[prop].id}">${filted[prop].value}</option>`
            }
        }
    
        const fillProfs = filted => {
            profBox.innerHTML = "";
            profBox.disabled = false;
    
            profBox.innerHTML += `<option value="">Choose Author</option>`;
    
            for (const prop in filted) {
                profBox.innerHTML += `<option value="${filted[prop].id}">${filted[prop].value}</option>`
            }
        }
        


     }else{
        const cat_options = document.getElementById('f_category').options;
        const cat_id = new Object();
        
    
        for (let i = 0; i < cat_options.length; i++) {
            if (cat_options[i].value == "") continue;
            
            if (cat_options[i].value == cat_selected) cat_selected = i;
    
            cat_id[cat_options[i].value] = {theme:[],prof:[]};
        }
    
        const theme_options = document.getElementById('f_theme').options;
        let them_selected = searchParams.get('them');
    
        for (let i = 0; i < theme_options.length; i++) {
            let cat_id_crt = theme_options[i].label;
    
            if (cat_id[cat_id_crt] === undefined) continue;
    
            cat_id[cat_id_crt].theme.push({
                id:theme_options[i].value,
                value:theme_options[i].text
            })
        }
    
        const prof_options = document.getElementById('f_profesor').options;
        
        let prof_selected = searchParams.get('prof');
    
        for (let i = 0; i <prof_options.length; i++) {
            let cat_id_crt = prof_options[i].label;
    
            if (cat_id[cat_id_crt] === undefined) continue;
            
            cat_id[cat_id_crt].prof.push({
                id: prof_options[i].value,
                value: prof_options[i].text
            })
        }
    
        catBox.onchange = () => {
            let sel_id = catBox.value;
            let sel_arr = cat_id[sel_id];
            
            let them_filter = sel_arr ? sel_arr.theme : "";
            let prof_filter = sel_arr ? sel_arr.prof : "";
    
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
            
            themeBox.innerHTML += `<option value="">Choose Topic</option>`;
    
            for (const prop in filted) {
                themeBox.innerHTML += `<option value="${filted[prop].id}" ${filted[prop].id==them_selected?'selected':''}>${filted[prop].value}</option>`
            }
        }
    
        const fillProfs = filted => {
            profBox.innerHTML = "";
            profBox.disabled = false;
    
            profBox.innerHTML += `<option value="">Choose Author</option>`;
    
            for (const prop in filted) {
                profBox.innerHTML += `<option value="${filted[prop].id}" ${filted[prop].id==prof_selected?'selected':''}>${filted[prop].value}</option>`
            }
        }
    
        catBoxOnchange();
     }
    
   
}

if (searchParams.get('sort')) {
    for (let i = 0; i < sort.options.length; i++) {
        if (sort.options[i].value == searchParams.get('sort')) {
            sort.options[i].selected = true;
        }
    } 
}

setFilter.onclick = () => {
    // if(catBox.value==="")return;
    if (sort.value !== "" && catBox.value !== "") {
        window.location.assign(window.location.origin+window.location.pathname+`?public=${public}&cat=${catBox.value}&them=${themeBox.value}&prof=${profBox.value}&sort=${sort.value}`);
    } else if (sort.value === "" && catBox.value !== "") {
        window.location.assign(window.location.origin+window.location.pathname+`?public=${public}&cat=${catBox.value}&them=${themeBox.value}&prof=${profBox.value}`);
    } else if (sort.value !== "" && catBox.value === "") {
        window.location.assign(window.location.origin+window.location.pathname+`?public=${public}&sort=${sort.value}`);
    } else {
        window.location.assign(window.location.origin+window.location.pathname+`?public=${1}&cat=${0}&them=${1}&prof=${1}`);
    }
}

clear_all.onclick = () => {
    window.location.assign(window.location.origin+window.location.pathname+`?public=${public}`);
}

const cartSwitch = e => {
    const openBox = e.parentElement.getElementsByClassName('open')[0];
    
    if (!openBox.classList.contains('on')) {
        openBox.classList.add('on');
    } else {
        openBox.classList.remove('on');
    }
}

const changePublic = (id, e) => {
    fetch('/admin/courses/publish', {
        method: 'POST',
        headers: {
            'Content-type':'application/json',
        },
        body: JSON.stringify({
            id: id,
            val: e.value
        })
    })
    .then(resp => resp.json())
    .then(data => {
        if (data.err) alert('Something went wrong!');

        e.value = e.value == 1 ? 0 : 1;
        e.innerHTML = e.value == 1 ? 'Publish' : 'Unpublish';
    })
}

const delCourse = (id, e) => {
    if(!confirm('You cant recover this course after delete. \r\n Are you sure to want to delete'))return;
    
    fetch('/admin/courses/del', {
        method: 'POST',
        headers: {
            'Content-type':'application/json',
        },
        body: JSON.stringify({id: id})
    })
    .then(resp => resp.json())
    .then(data => {
        if (data.err) alert('Something went wrong!');

        e.parentElement.parentElement.parentElement.remove();
    })
}

