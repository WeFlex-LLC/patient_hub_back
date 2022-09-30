let classingName = window.location.href.split('/')[window.location.href.split('/').length-1];
let mainMenu = window.location.href.split('/')[4];
const searchParamss = new URLSearchParams(window.location.search)
const publics = searchParamss.get('public');

if (publics !== null) {
    classingName = 'couserOne';
} else if (!isNaN(parseInt(classingName))) {
    classingName = 'couserOne';
}

if (mainMenu === 'users') classingName='users';

let classing = document.getElementsByClassName(`mn_${classingName}`)[0];

if (classing !== undefined) classing.classList.add('active');

const logOut = () => {
    if (!confirm('Are you sure you want to sign out?')) return;
    
    fetch(`/admin/logout/`, {
        method: 'POST'
    })
    .then(resp => resp.json())
    .then(data => {
       if (data.success) window.location.href = "/admin";
    })
    .catch(err => console.error(err))
}