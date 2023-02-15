<script>
    import Profile from './components/Profile.vue';
    import Followed from './components/Followed.vue';
    import Users from './components/Users.vue';
    import CreatePost from './components/CreatePost.vue'
    import Posts from './components/Posts.vue'
import { loadPost } from '../service/posts';
    export default {
        components: {
            Profile,
            Followed,
            Users,
            CreatePost,
            Posts
        },
        name: 'Главная',
        data() {
            return {
                userAuthorized: '',
                userId: JSON.parse(localStorage.getItem('user'))?._id,
                posts: [],
                users: [],
                subscribers: [],
                isDisabled: true,
                newPost: '',
                userEdit: true,
                time: ''
            }
        },
        methods: {
            updatePosts(post){
                this.posts = post
            },
            updatePostsProfile(post) {
                this.posts = post
            },
            updatePostsDelete(post) {
                this.posts = post
            },
            checkTime(i) {
            if (i < 10) {
              i = "0" + i;
            }
            return i;
            },
            timeBegan() {
                let today = new Date();
                let h = today.getHours();
                let m = today.getMinutes();
                let s = today.getSeconds();
        
                h = this.checkTime(h);
                m = this.checkTime(m);
                s = this.checkTime(s);
                this.time = h + ":" + m + ":" + s;
                setTimeout(() => {
                this.timeBegan();
                }, 500);
            }
        },
        created() {
            this.userAuthorized = JSON.parse(localStorage.getItem('user')); 
            if (this.userAuthorized == null) {
                this.$router.push('/')
            }
            loadPost().then(posts => {
                this.posts = posts;
            })
            this.timeBegan();
        },
    }
</script>

<template>
    <div>
        <header class="header">
            <div class="header__logo">ВШаге</div>
            <div class="header__time">{{time}}</div>
        </header>
        <section class="content">
            <div class="content__main">
                <div>
                    <Profile @updatePostsProfile="updatePostsProfile"/>
                    <Followed/>
                </div>

                <div class="content__main-wrapper">
                    <CreatePost @updatePosts="updatePosts"/>
                    <Posts @updatePostsDelete="updatePostsDelete" :posts="posts"/>
                </div>
                <Users/>
            </div>
        </section>
    </div>
</template>

<style scoped>

</style>
