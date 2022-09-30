const password = document.getElementById('password');
const repassword = document.getElementById('repassword');
const name = document.getElementById('name');
const addaccounterr = document.getElementById('addaccounterr');
const addaccountForm = document.getElementById('addaccountForm');

addaccountForm.onsubmit = e => {
    e.preventDefault();

    if (password.value === repassword.value) return addaccounterr.innerHTML = "New Password must be different from old";
    
    let data = [
        {"value": user}, 
        {"value": password.value},
        {"value": repassword.value},
        {"value": name.value},
    ];

    fetch('/admin/account/edit', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(resp => resp.json())
    .then(data => {
        if (data.success === true) {
            addaccountForm.reset();
            addaccounterr.innerHTML = "Successful Changed";
        } else {
            addaccounterr.innerHTML = data.success;
        }
    })
}