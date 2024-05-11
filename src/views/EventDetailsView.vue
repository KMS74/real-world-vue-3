<script setup>
import { ref, onMounted } from 'vue'
import EventService from '@/services/EventService'

const props = defineProps({
  id: {
    required: true
  }
})

const event = ref({})

onMounted(async () => {
  event.value = await EventService.getEvent(props.id)
})
</script>

<template>
  <div>
    <h1>{{ event.title }}</h1>
    <p>{{ event.description }}</p>
  </div>
</template>
<script></script>
<style></style>
