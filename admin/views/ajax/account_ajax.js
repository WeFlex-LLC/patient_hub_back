const mail = document.getElementById('email');
const password = document.getElementById('password');
const repassword = document.getElementById('repassword');
const name = document.getElementById('name');
const addaccounterr = document.getElementById('addaccounterr');
const addaccountForm = document.getElementById('addaccountForm');
const customCheck2 = document.getElementById('customCheck2');

addaccountForm.onsubmit = e => {
    e.preventDefault(); 

    let status;
    
    if (customCheck2.checked) {
        status = 2;
    } else {
        status = 3;
    }

    if (password.value !== repassword.value) {
        return addaccounterr.innerHTML = "Wrong Re-Entered Password";
    }
    
    let data = [
        {"value":mail.value},
        {"value":password.value},
        {"value":status},
        {"value":name.value},
    ]

    fetch('/admin/account/add', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
        if (data.success === true) {
            addaccountForm.reset();
            window.location.reload();
        } else {
            addaccounterr.innerHTML = data.success;
        }
    })
}

const adminPopupBox = document.getElementById('adminPopup');

const adminPopup = () => adminPopupBox.style.display = "block";

const adminPopupClose = () => adminPopupBox.style.display="none";

const deactivateList = document.getElementsByClassName('deactiv_check');

const adminDel = () => {
    let delList = new Array();
    
    for (let i = 0; i < deactivateList.length; i++) {
        if(deactivateList[i].checked)delList.push(deactivateList[i].value);
    }

    fetch('/admin/account/del', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({listID:delList})
    })
    .then(res => res.json())
    .then(data => {
        if (data.success === true) {
            addaccountForm.reset();
            window.location.reload();
        } else {
            addaccounterr.innerHTML = data.success;
        }
    })
}
