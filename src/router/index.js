import { createRouter, createWebHashHistory } from 'vue-router'
import ViewNotes from '@/views/ViewNotes.vue'
import ViewEditNote from '@/views/ViewEditNote.vue'
import ViewStats from '@/views/ViewStats.vue'
import ViewAuth from '@/views/ViewAuth.vue'
import { useStoreAuth } from '@/stores/storeAuth'


const routes = [
  {
    path: '/',
    name: 'notes',
    component: ViewNotes
  },
  {
    path: '/editNote/:id',
    name: 'edit-note',
    component: ViewEditNote
  },
  {
    path: '/stats',
    name: 'stats',
    component: ViewStats
  },
  {
    path: '/auth',
    name: 'auth',
    component: ViewAuth
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// Navigation Guards
router.beforeEach(async (to, from) => {

  const storeAuth = useStoreAuth()

  // if you are not logged in and want to access any route that is not 'auth' you will be forbidden
  if (
    !storeAuth.user.id &&
    to.name !== 'auth'
  ) {
    return {
      name: 'auth'
    }
  }

  if(
    storeAuth.user.id &&
    to.name === 'auth'
  ) {
    // prevent the user to leave the current route
    return false
  }

  // if (
  //   // make sure the user is authenticated
  //   !isAuthenticated &&
  //   // ❗️ Avoid an infinite redirect
  //   to.name !== 'Login'
  // ) {
  //   // redirect the user to the login page
  //   return { name: 'Login' }
  // }
  console.log(`from: ${from.path} --> to: ${to.path}`);
})

export default router
