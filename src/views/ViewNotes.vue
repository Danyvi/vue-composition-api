<template>
  <div class="notes">

    <div class="card has-background-success-dark p-4 mb-5">
      <div class="field">
        <div class="control">
          <textarea
            v-model="newNote"
            class="textarea"
            placeholder="Add a new note"
            ref="newNoteRef"
          />
        </div>
      </div>

      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button
            class="button is-link has-background-success"
            @click="addNote"
            :disabled="!newNote"
          >
            Add New Note
          </button>
        </div>
      </div>
    </div>

    <Note
      v-for="note in notes"
      :key="note.id"
      :note="note"
      @deleteClicked="deleteNote"
    />
  </div>
</template>

<script setup>
/**
 * Imports
 */
import { useStoreNotes } from '@/stores/storeNotes'
import { ref } from 'vue';
import Note from '@/components/Notes/Note.vue'

/**
 * Store
 */
const storeNotes = useStoreNotes()

/**
 * Notes
 */

const newNote = ref("")
const newNoteRef = ref(null)

let notes = storeNotes.notes


const addNote = () => {
  storeNotes.addNote(newNote.value)
  newNote.value = ''
  newNoteRef.value.focus()
}

/**
 * Delete Notes
 */
const deleteNote = (idToDelete) => {
  console.log(idToDelete)
  notes.value = notes.value.filter(note => note.id !== idToDelete)
}
</script>
