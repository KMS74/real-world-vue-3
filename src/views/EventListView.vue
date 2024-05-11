<script setup>
import { ref, onMounted } from 'vue'
import EventCard from '@/components/EventCard.vue'

import EventService from '@/services/EventService'

const events = ref([])

onMounted(async () => {
  events.value = await EventService.getEvents()
})
</script>

<template>
  <main>
    <h1>Events For Good</h1>
    <div class="events">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
  </main>
</template>

<style scoped>
main h1 {
  font-size: 32px;
  text-align: center;
}
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
