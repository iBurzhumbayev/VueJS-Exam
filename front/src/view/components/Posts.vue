<script>
import { loadPost, deletePost } from '../../service/posts'
    export default {
        name: 'Главная',
        data() {
            return {
                userAuthorized: '',
                userId: JSON.parse(localStorage.getItem('user'))?._id,
                posts: [],
                isDisabled: true,
                newPost: '',
                userEdit: true
            }
        },
        props:{
            posts: {
                type: Array,
                default: []
            }
        },
        methods: {
            deletePost(postId) {
                deletePost(postId)
                loadPost().then(posts => {
                    this.posts = posts
                    this.$emit('updatePostsDelete', posts)
                })
            },
            async likes(postId) {
                const userId = JSON.parse(localStorage.getItem('user'))?._id
                const payload = {userId};

                await fetch(`http://localhost:8080/posts/likes/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(payload)
                })
                .then(response => response.json())
                .then(() => loadPost().then(posts => {
                    this.posts = posts
                    this.$emit('updatePostsDelete', posts)
                }))
                .catch(() => console.log('Ошибка'))
            },
            checkTimePost(i) {
                if (i < 10) {
                i = "0" + i;
                }
                return i;
            },
            convertTime(dateTime) {
                
                let date = new Date(dateTime);
                let day = date.getDate();
                let month = date.getMonth();
                let months = ["Янв", "Фев", "Март", "Апр", "Май", "Июнь", "Июль", "Авг", "Сент", "Окт", "Нояб", "Дек"];
                let year = date.getFullYear();
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let seconds = date.getSeconds();

                minutes = this.checkTimePost(minutes);

                return `${day} ${months[month]} ${year} в ${hours}:${minutes}`;
            },
            editPost(event) {
                const cardPost = event.composedPath()[3]
                const editButton = cardPost.querySelector('.button__editPost');
                const saveButton = cardPost.querySelector('.button__savePost');
                const postTextarea = cardPost.querySelector('.post__textarea');
                const postText = cardPost.querySelector('.post__text');


                editButton.style.cssText = 'display: none';
                saveButton.style.cssText = 'display: block';
                postText.style.cssText = 'display: none';
                postTextarea.style.cssText = 'display: block';
            },
            async saveEditPost(id, event) {
                const cardPost = event.composedPath()[3]
                const postData = cardPost.querySelector('.post__textarea').value
                console.log(postData)
                await fetch('http://localhost:8080/posts/' + id, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({postData})
                })
                .then(() => 
                cardPost.querySelector('.post__textarea').style.display = 'none',
                cardPost.querySelector('.post__text').style.display = 'block',
                cardPost.querySelector('.button__savePost').style.display = 'none',
                cardPost.querySelector('.button__editPost').style.display = 'block',

                loadPost().then(posts => {
                    this.posts = posts
                    this.$emit('updatePostsDelete', posts)
                }))
                
                .catch(() => alert('error'));
            }
        },
        created() {
            this.userAuthorized = JSON.parse(localStorage.getItem('user')); 
            if (this.userAuthorized === null) {
                this.$router.push('/');
            }
        },
    }
</script>

<template>
    <div class="content__posts">
        <div v-for="post in posts" :key="post._id" class='content__posts-wrapper'>
            <div class='content__posts-box'>
                <img style="width: 40px; border-radius: 100%" src="../../img/avatar.jpg" alt="avatar">
                <div class='content__posts-inner'>
                    <p style='color: #2a5885; font-weight: 500'>{{post.author.fullName}} {{post.author.fullSurname}}</p>
                    <p>{{convertTime(post.date)}}</p>
                </div>
            </div>
            <p class='post__text' style='margin-top: 10px'>{{post.postData}}</p>
            <textarea style='display: none' class='post__textarea'>{{post.postData}}</textarea>
            <div style='display: flex; justify-content: space-between; align-items: center; margin-top: 15px'>
                <div class='content__posts-likes' @click="likes(post._id)">
                    <p class='content__posts-heart' :style="{'color': post.postLikes.map(item => item._id).includes(userId) ? 'red' : ''}">&#9829;</p>
                    <p class='content__posts-amount'>{{post.postLikes.length}}</p>
                </div>
                <div style='display: flex; justify-content: space-between; align-items: center; width: 110px'>
                    <button v-if="post.author._id == userId" class="button__deletePost" @click="deletePost(post._id)">&#128465;</button>
                    <button v-if="post.author._id == userId" class="button__editPost" @click="editPost($event)">&#9998;</button>
                    <button class="button__savePost" @click="saveEditPost(post._id, $event)">&#10003;</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

</style>