<script>
    export default {
        name: 'Главная',
        data() {
            return {
                userAuthorized: '',
                userId: JSON.parse(localStorage.getItem('user'))?._id,
                users: [],
                isDisabled: true,
                userEdit: true
            }
        },
        methods: {
            async loadData() {
                const responsceUsers = await fetch('http://localhost:8080/users');
                const users = await responsceUsers.json();
                const userId = JSON.parse(localStorage.getItem('user'))._id; 

                const usersFilter = users.filter((user) => user._id !== userId)

                this.users = usersFilter
            },
            async follow(followedUserId) {
                const userId = this.userId
                const payload = {userId, followedUserId};

                await fetch(`http://localhost:8080/users/follow/${followedUserId}`, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.loadData()
                })
                .catch(() => console.log('Ошибка'))
            }
        },
        created() {
            this.userAuthorized = JSON.parse(localStorage.getItem('user')); 
            if (this.userAuthorized != null) {
                this.loadData();
            } else {
                this.$router.push('/')
            }
        },
    }
</script>

<template>
    <div class="content__users">
        <p class='user__profilTitle' style="margin-bottom: 10px">Пользователи</p>
        <div v-for="user in users" :key="user._id" style='display: flex; align-items: center; justify-content: space-between; width: 100%' class='wrapper'>
            <p>{{user.fullName}} {{user.fullSurname}}</p>
            <button class='button__follow' :style="{background: user.subscribers.includes(userId) ? 'red' : ''}" @click="follow(user._id)">{{ user.subscribers.includes(userId) ? '&times;' : '&#128504;' }}</button>
        </div>
    </div>
</template>

<style>

</style>