<template>
  <div class="stats">
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>Stat</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Number of Notes</td>
          <td>{{ storeNotes.totalNotesCount }}</td>
        </tr>
        <tr>
          <td>Number of Characters (of all notes)</td>
          <td>{{ storeNotes.totalCharactersCount }}</td>
        </tr>
      </tbody>
    </table>

    <input
      class="input"
      type="text"
      placeholder="Do you like noteballs?"
      v-autofocus
      v-model="loveNoteballs"
    >
  </div>
</template>

<script setup>
/*
  imports
*/
  import { ref } from 'vue'
  import { useStoreNotes } from '@/stores/storeNotes'
  import { vAutofocus } from '@/directives/vAutofocus'
  import { useWatchCharacters } from '@/use/useWatchCharacters'

/*
  store
*/

  const storeNotes = useStoreNotes()

/*
  Watch Characters loveNoteballs
*/

const loveNoteballs = ref('')
useWatchCharacters(loveNoteballs, 50)
</script>
