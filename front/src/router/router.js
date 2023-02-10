import { createRouter, createWebHistory } from 'vue-router'
import Registration from '../view/Registration.vue';
import Avtorization from '../view/Avtorization.vue';
import Main from '../view/Main.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/registration',
			component: Registration
		},
		{
			path: '/',
			component: Avtorization,
		},
		{
			path: '/main',
			component: Main,
		}
	]
})

export default router