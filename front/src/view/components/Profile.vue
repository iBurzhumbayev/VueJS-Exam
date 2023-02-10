<script>
    import { loadPost } from '../../service/posts';
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
            profileData() {
                this.fullName = this.userAuthorized.fullName;
                this.fullSurname = this.userAuthorized.fullSurname;
            },
            logOut() {
                localStorage.clear();
                this.$router.push('/')
            },
            async deleteUser(id) {
                await fetch('http://localhost:8080/users/' + id, {method: 'delete'})
                .then(() => alert('Профиль удален'), setTimeout(this.logOut, 1000))
                .catch(() => alert('User delete error'));
            },
            async getSubscribers() {
                const responseUsers = await fetch('http://localhost:8080/users');
                const users = await responseUsers.json();
                const userId = this.userId

                const usersFilter = users.filter((user) => user._id == userId)
                console.log(usersFilter[0].subscribers)
                usersFilter[0].subscribers.forEach(e => {
                    if (users.map(item => item._id).includes(e)) {
                        const user = users.find(item => item._id === e);
                        this.subscribers.push(user);
                    }
                });
            },
            editUser() {
                this.userEdit = false;
            },
            async saveEditUser(id) {
                const fullName = this.fullName
                const fullSurname = this.fullSurname

                await fetch('http://localhost:8080/users/' + id, {
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({fullName, fullSurname, id})
                }).then(() => alert('Данные сохраненны'))
                .then(() => {
                    let user = JSON.parse(localStorage.getItem('user'));
                    user.fullName = this.fullName;
                    user.fullSurname = this.fullSurname;
                    localStorage.setItem('user', JSON.stringify(user));
                    this.userEdit = true;
                    loadPost().then(posts => {
                        this.posts = posts
                        this.$emit('updatePostsProfile', posts)
                    })
                })
                .catch(() => alert('error'));
            }
        },
        created() {
            this.userAuthorized = JSON.parse(localStorage.getItem('user')); 
            if (this.userAuthorized != null) {
                this.profileData();
            } else {
                this.$router.push('/')
            }
        },
    }
</script>

<template>
    <div class="content__profile">
        <p class="user__profilTitle" style="margin-bottom: 10px">Профиль</p>
        <img style="width: 135px; border-radius: 12px" src="../../img/avatar.jpg" alt="avatar">
        <p v-if="userEdit" class="user__profil" style="margin-top: 10px" v-text="fullName"></p>
        <p v-if="userEdit" class="user__profil" style="margin-bottom: 5px" v-text="fullSurname"></p>

        <input v-if="!userEdit" class="user__input user__input-name" v-model="fullName">
        <input v-if="!userEdit" class="user__input user__input-surname" v-model="fullSurname">
        <button v-if="!userEdit" class="button__logout button__save" @click="saveEditUser(userAuthorized._id)">Сохранить</button>

        <button v-if="userEdit" class="button__logout button__edit" @click="editUser()">Редактировать</button>
        <button class="button__logout" @click="logOut()">Выйти</button>
        <button class="button__logout button__delete" @click="deleteUser(userAuthorized._id)">Удалить</button>
    </div>
</template>

<style>

</style>