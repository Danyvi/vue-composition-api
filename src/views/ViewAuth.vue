<template>
  <div class="auth">
    <div class="tabs is-centered">
      <ul>
        <li
          :class="{ 'is-active': !register }"
        >
          <a @click.prevent="register=false">
            Login
          </a>
        </li>
        <li
          :class="{ 'is-active': register }"
        >
          <a @click.prevent="register=true">
            Register
          </a>
        </li>
      </ul>
    </div>

    <div class="card auth-form">
      <div class="card-content">
        <div class="title has-text-centered">
          {{ formTitle }}
        </div>

        <form
          @submit.prevent="onSubmit"
        >
          <div class="field">
            <label class="label">Email</label>
            <div class="control">
              <input
                v-model="credentials.email"
                class="input"
                type="email"
                placeholder="e.g. alexsmith@gmail.com"
              >
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                v-model="credentials.password"
                class="input"
                type="password"
                placeholder="Enter a Password"
              >
            </div>
          </div>

          <div class="field is-grouped is-grouped-right">
            <p class="control">
              <button class="button is-primary">
                {{ formTitle }}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
/**
 * Imports
 */
import { computed, reactive, ref } from 'vue';
import { useStoreAuth } from '@/stores/storeAuth'

/**
 * Store
 */
 const storeAuth = useStoreAuth()

/**
 * Register/Login
 */
const register = ref(false)

/**
 * Form Title
 */
const formTitle = computed(() => {
  return register.value ? 'Register' : 'Login'
})

/**
 * Credentials
 */
const credentials = reactive({
  email: '',
  password: ''
})

/**
 * Submit
 */
 const onSubmit = () => {
  console.log('Form Submitted');
  if (!credentials.email || !credentials.password) {
    alert("Please enter email/password")
  } else {
    if (register.value) {
      storeAuth.registerUser(credentials)
    } else {
      storeAuth.loginUser(credentials)
    }
  }
 }
</script>

<style>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
