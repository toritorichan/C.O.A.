import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { title: 'Cosmic Observation Association — C.O.A.' },
    },
    {
      path: '/diary',
      name: 'diary',
      component: () => import('../views/DiaryView.vue'),
      meta: { title: 'Alien Diary | C.O.A.' },
    },
    {
      path: '/aliens',
      name: 'aliens',
      component: () => import('../views/AliensView.vue'),
      meta: { title: 'Alien Catalog | C.O.A.' },
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/HistoryView.vue'),
      meta: { title: 'C.O.A. History | C.O.A.' },
    },
    {
      path: '/members',
      name: 'members',
      component: () => import('../views/MembersView.vue'),
      meta: { title: 'Member Registry | C.O.A.' },
    },
    {
      path: '/members/:id',
      name: 'member-detail',
      component: () => import('../views/MemberDetailView.vue'),
      meta: { title: 'Member File | C.O.A.' },
    },
    {
      path: '/guestbook',
      name: 'guestbook',
      component: () => import('../views/GuestbookView.vue'),
      meta: { title: 'Guestbook | C.O.A.' },
    },
    {
      path: '/links',
      name: 'links',
      component: () => import('../views/LinksView.vue'),
      meta: { title: 'Signal Links | C.O.A.' },
    },
    {
      path: '/join',
      name: 'join',
      component: () => import('../views/JoinView.vue'),
      meta: { title: '加入我們 | C.O.A.', fullPage: true },
    },
    // Hidden routes — not in NavBar, accessible by direct URL
    {
      path: '/classified',
      name: 'classified',
      component: () => import('../views/ClassifiedView.vue'),
      meta: { title: '███████ | C.O.A.', hidden: true },
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      meta: { title: 'Administration | C.O.A.', hidden: true, fullPage: true },
    },
    {
      path: '/member/00',
      name: 'member-zero',
      component: () => import('../views/MemberZeroView.vue'),
      meta: { title: 'Member #00 | C.O.A.', hidden: true },
    },
    {
      path: '/archive/doc-001',
      name: 'forbidden',
      component: () => import('../views/ForbiddenView.vue'),
      meta: { title: '403 Forbidden', hidden: true, fullPage: true },
    },
    // Signal — frequency 038, member 08's last transmission
    {
      path: '/signal/038',
      name: 'signal',
      component: () => import('../views/SignalView.vue'),
      meta: { title: '038 | C.O.A.', hidden: true, fullPage: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/NotFoundView.vue'),
      meta: { title: 'Signal Lost | C.O.A.', fullPage: true },
    },
  ],
})

router.beforeEach((to) => {
  document.title = (to.meta.title as string) || 'Cosmic Observation Association'

  const now = new Date()
  const h = now.getHours()
  const m = now.getMinutes()
  const isNight = h === 3 && m <= 33
  document.body.classList.toggle('night-mode', isNight)

  const isSpecialDay = now.getMonth() === 6 && now.getDate() === 13
  document.body.classList.toggle('special-day', isSpecialDay)

  const isWednesday = now.getDay() === 3
  document.body.classList.toggle('wednesday', isWednesday)
})

export default router
