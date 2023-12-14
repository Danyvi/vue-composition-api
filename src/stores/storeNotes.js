import { defineStore } from 'pinia'

import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit
} from "firebase/firestore";

import { db } from '@/js/firebase.js'

const noteCollectionRef = collection(db, "notes")
const noteCollectionQuery = query(noteCollectionRef, orderBy("id", "desc"));

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [

      ]
    }
  },
  actions: {
    getNotes() {
      onSnapshot(noteCollectionQuery, (querySnapshot) => {
        let notes = []
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content
          }
          notes.push(note)
        });
        this.notes = notes
      });
    },
    async addNote(newNoteContent) {
      let currentDate = new Date().getTime(),
          id = currentDate.toString()

      await setDoc(doc(noteCollectionRef , id), {
        content: newNoteContent,
        id: id
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
