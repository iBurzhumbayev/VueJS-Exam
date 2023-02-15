<script>
    export default {
        name: 'Регистрация',
        data() {
            return {
                fullName: '',
                fullSurname: '',
                login: '',
                password: ''
            }
        },
        methods: {
            async registrationUser() {
                const payload = {fullName: this.fullName, fullSurname: this.fullSurname, login: this.login, password: this.password};

                await fetch('http://localhost:8080/users', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.message == 'Пользователь с таким логином уже существует') {
                        alert(data.message)
                    } 
                    if (data.message == 'Ошибка при регистрации') {
                        alert('Пароль должен быть больше 4 и меньше 10 символов')
                    }
                    if (data.message == 'Пользователь успешно зарегистрирован') {
                        alert(data.message)
                        this.$router.push('/')
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
            <div class="registration">
                <div class="title">Форма регистрации</div>
                <form @submit.prevent="registrationUser">
                    <input required v-model='fullName' id="fullName" type="text" placeholder="Имя">
                    <input required v-model='fullSurname' id="fullSurname" class="registration__input" type="text" placeholder="Фамилия">
                    <input required v-model='login' id="login" class="registration__input" type="text" placeholder="Логин">
                    <input required v-model='password' id="password" class="registration__input" type="text" placeholder="Пароль">
                    <button class="registration__button">Зарегистрироваться</button>
                </form>
            </div>
        </section>
    </div>
</template>

<style scoped>

</style>
