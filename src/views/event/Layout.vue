<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import EventService from '@/services/EventService'
import { useRouter } from "vue-router";

const { id } = defineProps({
  id: {
    required: true
  }
})

const router = useRouter()

const event = ref({})

onMounted(async () => {
  try {
    event.value = await EventService.getEvent(id)
  } catch (error) {
    console.log('from the event layout', error)
    if (error.response && error.response.status === 404) {
      router.push({ name: '404Resource', params: { resource: 'event' } })
    } else {
      router.push({ name: 'NetworkError' })
    }
  }
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