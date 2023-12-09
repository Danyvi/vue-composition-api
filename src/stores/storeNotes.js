import { defineStore } from "pinia";

export const useStoreNotes = defineStore('storeNotes', {
  state: () => {
    return {
      notes: [
        {
          id: 'id1',
          content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem ipsa commodi sint ut ullam culpa nulla molestiae sunt quia qui maxime, enim quasi officiis aperiam fugit, corrupti omnis, eaque animi.'
        },
        {
          id: 'id2',
          content: 'This is a shorter note'
        }
      ]
    }
  },
  actions: {
    addNote(newNoteContent) {
      const note = {
        id: new Date().getTime().toString(),
        content: newNoteContent
      }
      this.notes.unshift(note)
    },
    deleteNote() {

    }
  },
  // getters: {

  // }
})