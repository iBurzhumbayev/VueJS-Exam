async function loadPost() {
    const responscePosts = await fetch('http://localhost:8080/posts');
    const posts = await responscePosts.json();
    return posts
};

async function deletePost(postId) {
    await fetch(`http://localhost:8080/posts/${postId}` , {method: 'delete'})
};

// async function likes(postId) {
//     const userId = JSON.parse(localStorage.getItem('user'))?._id
//     const payload = {userId};

//     await fetch(`http://localhost:8080/posts/likes/${postId}`, {
//     method: 'POST',
//     headers: {
//         'Content-type': 'application/json'
//     },
//     body: JSON.stringify(payload)
//     })
//     .then(response => response.json())
//     .catch(() => console.log('Ошибка'))
// }

export {loadPost, deletePost}