import { defineStore } from 'pinia'
import {
  collection, onSnapshot,
  doc, deleteDoc, updateDoc, addDoc,
  query, orderBy
} from 'firebase/firestore'
import { db } from '@/js/firebase'
import { useStoreAuth } from '@/stores/storeAuth'

// we don't load the authStore here because the storeNote is not ready immediately

let noteCollectionRef = null
let noteCollectionQuery = null
let getNotesSnapshot = null

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [],
      notesLoaded: false
    }
  },
  actions: {
    init() {
      // Store
      const storeAuth = useStoreAuth()

      // initialize db refs
      noteCollectionRef = collection(db, "users", storeAuth.user.id, "notes")
      noteCollectionQuery = query(noteCollectionRef, orderBy("date", "desc"));
      this.getNotes()
    },
    getNotes() {
      this.notesLoaded = false

      getNotesSnapshot = onSnapshot(noteCollectionQuery, (querySnapshot) => {
        let notes = []
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date
          }
          notes.push(note)
        });
        this.notes = notes
        this.notesLoaded = true
      });
    },
    clearNotes() {
      this.notes = []
      if(getNotesSnapshot) {
        getNotesSnapshot() // unsubscribe from any active listener
      }
    },
    async addNote(newNoteContent) {
      let currentDate = new Date().getTime(),
          date = currentDate.toString()

      // Add a new document with a generated id.
      await addDoc(noteCollectionRef, {
        content: newNoteContent,
        date
      });
    },
    async deleteNote(idToDelete) {
      await deleteDoc(doc(noteCollectionRef, idToDelete))
    },
    async updateNote(id, content) {
      await updateDoc(doc(noteCollectionRef, id), {
        content: content
      });
    }
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter(note => note.id === id )[0].content
      }
    },
    totalNotesCount: (state) => {
      return state.notes.length
    },
    totalCharactersCount: (state) => {
      let count = 0
      state.notes.forEach(note => {
        count += note.content.length
      })
      return count
    }
  }
})
