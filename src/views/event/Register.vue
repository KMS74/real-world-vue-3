<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { useRouter } from 'vue-router'

defineProps(['event'])
const router = useRouter()
const register = () => {
  console.log('Registering...')
  // if register is successful, redirect to the event details page
  alert('Registered!')
  // programmatic navigation
  router.push({ name: 'event-details'})
}
</script>

<template>
  <p>Register form here</p>
  <button @click="register">Register Me!</button>
</template>