<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import EventService from '@/services/EventService'

const { id } = defineProps({
  id: {
    required: true
  }
})

const event = ref({})

onMounted(async () => {
  event.value = await EventService.getEvent(id)
})
</script>

<template>
  <div id="nav">
    <router-link :to="{ name: 'event-details' }">Details</router-link>
    |
    <router-link :to="{ name: 'event-register' }">Register</router-link>
    |
    <router-link :to="{ name: 'event-edit' }">Edit</router-link>
  </div>

  <router-view :event="event" />
</template>
<script></script>
<style>
a {
  text-decoration: underline;
  color: #2c3e50;
}
</style>
