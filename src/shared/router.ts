import { createRouter, createWebHistory } from 'vue-router'

import Setup from '@/pages/setup/setup-page.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'setup',
            path: '/',
            component: Setup
        },
    ]
})

export default router
