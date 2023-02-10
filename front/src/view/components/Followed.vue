<script>
    export default {
        name: 'Главная',
        data() {
            return {
                userAuthorized: '',
                userId: JSON.parse(localStorage.getItem('user'))?._id,
                subscribers: [],
            }
        },
        methods: {
            async getSubscribers() {
                const responseUsers = await fetch('http://localhost:8080/users');
                const users = await responseUsers.json();
                const userId = this.userId

                const usersFilter = users.filter((user) => user._id == userId)
                usersFilter[0].subscribers.forEach(e => {
                    if (users.map(item => item._id).includes(e)) {
                        const user = users.find(item => item._id === e);
                        this.subscribers.push(user);
                    }
                });
            }
        },
        created() {
            this.userAuthorized = JSON.parse(localStorage.getItem('user')); 
            if (this.userAuthorized != null) {
                this.getSubscribers();
            } else {
                this.$router.push('/')
            }
        },
    }
</script>

<template>
    <div class="content__profile content__profile-subscribers">
        <p class="user__profilTitle" style="margin-bottom: 10px">Подписчики</p>
        <p v-for="subscriber in subscribers" :key="subscriber">
            {{subscriber.fullName}} {{subscriber.fullSurname}}
        </p>
    </div>
</template>

<style>

</style>