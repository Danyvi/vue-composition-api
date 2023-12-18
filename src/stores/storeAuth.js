import { defineStore } from 'pinia'
import { auth } from '@/js/firebase'
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { useStoreNotes } from '@/stores/storeNotes'


export const useStoreAuth = defineStore('storeAuth', {
  state: () => {
    return {
      user: {}
    }
  },
  actions: {
    init() {
      // Store
      const storeNotes = useStoreNotes()

      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.user.id = user.uid;
          this.user.email = user.email;
          storeNotes.init()
          this.router.push('/')
        } else {
          this.user = {}
          storeNotes.clearNotes()
          this.router.replace('/auth')
        }
      });
    },
    registerUser(credentials) {
      createUserWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
    logoutUser() {
      signOut(auth).then(() => {
        console.log('Sign-out successful');
      }).catch((error) => {
        console.log('An error happened');
      });
    },
    loginUser(credentials) {
      signInWithEmailAndPassword(auth, credentials.email, credentials.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          console.log(error.message);
        });

    }
  },
  getters: {

  }
})
