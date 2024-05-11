<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue'
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService'
import { useRouter } from "vue-router";


const props = defineProps(['page'])


const router = useRouter()

const events = ref([])
const totalEvents = ref(0)

const page = computed(() => props.page)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / EVENTS_PER_PAGE)
  return page.value < totalPages
})

const EVENTS_PER_PAGE = 2

// Fetch events when the component is mounted and when the page changes
// The page is passed as a query parameter in the URL and is accessed via the `page` prop
onMounted(async () => {
  watchEffect(async () => {
    try {
      const res = await EventService.getEvents(EVENTS_PER_PAGE, page.value)
      events.value = res.data
      totalEvents.value = res.headers['x-total-count']
    } catch (error) {
      router.push({ name: 'NetworkError' })
    }
  })
})
</script>

<template>
  <main>
    <h1>Events For Good</h1>
    <div class="events">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
      <div class="pagination">
        <router-link
          v-if="page != 1"
          id="page-prev"
          :to="{ name: 'event-list', query: { page: page - 1 } }"
          rel="prev"
          >&#60; Previous
        </router-link>

        <router-link
          v-if="hasNextPage"
          id="page-next"
          :to="{ name: 'event-list', query: { page: page + 1 } }"
          rel="next"
          >Next &#62;
        </router-link>
      </div>
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

.pagination {
  display: flex;
  width: 290px;
}

.pagination a {
  flex: 1;
  text-decoration: none;
  color: #2c3e50;
}

#page-prev {
  text-align: left;
}

#page-next {
  text-align: right;
}
</style>