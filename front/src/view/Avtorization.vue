<script>
    export default {
        name: 'Авторизация',
        data() {
            return {
                login: '',
                password: ''
            }
        },
        created() {
            this.userAuthorized = JSON.parse(localStorage.getItem('user')); 
            if (this.userAuthorized != null) {
                this.$router.push('/main')
            } else {
                this.$router.push('/')
            }
        },
        methods: {
            async postUser() {
                const payload = {login: this.login, password: this.password};

                await fetch('http://localhost:8080/users/login', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data.message == `Пользователь ${this.login} не найден`) {
                        alert(data.message)
                    } 
                    if (data.message == 'Введен неверный пароль') {
                        alert(data.message)
                    }
                    if (data.user) {
                        localStorage.setItem('user', JSON.stringify(data.user));
                        this.$router.push('/main')
                    } 
                })
                .catch(() => console.log('Ошибка'))
            }
        }
    }
</script>

<template>
    <div>
        <header class="header">
            <div class="header__logo">ВШАГЕ</div>
            <div class="header__time"></div>
        </header>
        <section class="content__AuthReg">
            <div class="content__wrapper">
                <div class="avthorization">
                    <div class="title">Вход ВШаге</div>
                    <form @submit.prevent="postUser">
                        <input v-model='login' id="login" type="text" placeholder="Логин">
                        <input v-model='password' id="password" class="avthorization__input" type="text" placeholder="Пароль">
                        <button class="avthorization__button">Войти</button>
                    </form>
                </div>
                <div class="avthorization avthorization__registration">
                    <a href="registration">Зарегистрироваться</a>
                    <div class="avthorization__registration-description">
                        После регистрации вы получите доступ ко всем возможностям ВШаге
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>

</style>
