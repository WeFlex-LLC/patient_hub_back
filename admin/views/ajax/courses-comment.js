const confirmComment = (comment_id, e) => {
    const confirm = e.checked;

    fetch('/admin/courses/comment-confirm', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({comment_id, confirm}),
    })
    .then(res => res.json())
    .then(data => data.err ? e.checked = false : null)
    .catch(err => console.error(err))
}