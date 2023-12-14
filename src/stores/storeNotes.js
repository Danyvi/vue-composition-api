import { defineStore } from 'pinia'
import {
  collection, onSnapshot,
  doc, deleteDoc, updateDoc, addDoc,
  query, orderBy
} from 'firebase/firestore'
import { db } from '@/js/firebase'

const noteCollectionRef = collection(db, "notes")
const noteCollectionQuery = query(noteCollectionRef, orderBy("date", "desc"));

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [],
      notesLoaded: false
    }
  },
  actions: {
    getNotes() {
      this.notesLoaded = false
      onSnapshot(noteCollectionQuery, (querySnapshot) => {
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
