<script>
import { loadPost } from '../../service/posts'
    export default {
        name: 'Главная',
        data() {
            return {
                fullName: '',
                fullSurname: '',
                userAuthorized: '',
                userId: JSON.parse(localStorage.getItem('user'))?._id,
                posts: [],
                users: [],
                subscribers: [],
                isDisabled: true,
                newPost: '',
                userEdit: true
            }
        },
        methods: {
            resizeTextarea: function(event) {
                const textarea = event.target;
                event.target.style.height = 'auto';
                event.target.style.height = (event.target.scrollHeight + 2) + 'px';
                if (textarea.value.length > 0) {
                    this.isDisabled = false;
                } else {
                    this.isDisabled = true;
                }
            },
            async createPost() {
                const postData = this.newPost
                const userId = this.userId
                

                const payload = {postData, userId};

                await fetch('http://localhost:8080/posts', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.message == 'Пост успешно создан') {
                        alert(data.message);
                        loadPost().then(posts => {
                            this.posts = posts
                            this.$emit('updatePosts', posts)
                        })
                        this.newPost = ''
                        this.isDisabled = true;
                        
                    } 
                })
                .catch(() => console.log('Ошибка'))
            }
        }
    }
</script>

<template>
    <div class="content__main-wrapper-create">
        <textarea v-model="newPost" class="textarea_create-post" name="" id="" cols="30" rows="1" placeholder="Что у Вас нового?" @keyup="resizeTextarea($event)"></textarea>
        <hr v-if="!isDisabled" class="hr__create">
        <button v-if="!isDisabled" class="button__create-post" @click="createPost()">Создать пост</button>
    </div>
</template>

<style>

</style>