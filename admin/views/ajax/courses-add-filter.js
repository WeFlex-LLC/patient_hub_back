const filter=window.location.href.split('/')[6];
const addFilter=document.getElementById('addFilter');
const err=document.getElementById('err');

addFilter.onsubmit = e => {
    e.preventDefault();
    
    const form = new FormData(addFilter);
    
    if (e.target['category_id']) {
        const cat_text = e.target['category_id'].options[e.target['category_id'].selectedIndex].text;
        form.append('category_name', cat_text);
    }
    
    form.append('filter', filter);

    fetch('/admin/courses/filter/add', {
        method: 'POST',
        body: form
    })
    .then(resp => resp.json())
    .then(data => {
        err.innerHTML = "";

        if (data.err) return err.innerHTML = data.err;
        
        window.location.reload();
    })
}

const delFilter = (e, id) => {
    if (!confirm("Do You Want to remove this filter?")) return;

    fetch('/admin/courses/filter/del', {
        method: 'POST',
        headers: {
            'Content-type':'application/json',
        },
        body: JSON.stringify({
            id: id,
            filter: filter
        })
    })
    .then(resp => resp.json())
    .then(data => {
        err.innerHTML = "";
        
        if (data.err) return err.innerHTML = data.err;
        
        e.parentElement.parentElement.remove();
    })
}