<template>
  <div
    class="card mb-4"
  >
    <div class="card-content">
      <div class="content">
        {{ note.content }}
        <div class="has-text-right has-text-grey-light mt-2">
          <small>{{ charactersLength }}</small>
        </div>
      </div>
    </div>
    <footer class="card-footer">
      <a
        href="#"
        class="card-footer-item"
        @click.prevent="handleEditClicked"
      >Edit</a>
      <a
        href="#"
        class="card-footer-item"
        @click.prevent="handleDeleteClicked"
      >Delete</a>
    </footer>
  </div>
</template>

<script setup>
/**
 * Imports
 */
import { computed } from 'vue'


/**
 * Props
 */
const props = defineProps({
  note: {
    type: Object,
    required: true
  }
})

/**
 * Emits
 */
const emit = defineEmits([
  'deleteClicked'
])

/**
 * Characters Length
 */
const charactersLength = computed(() => {
  const length = props.note.content.length
  const description = length > 1 ? 'characters' : 'character'
  return `${length} ${description}`
})

/**
 * Edit Note
 */
const handleEditClicked = () => console.log('Edit Note');

/**
 * Delete Note
 */
 const handleDeleteClicked = () => {
  emit('deleteClicked', props.note.id)
 }
</script>
