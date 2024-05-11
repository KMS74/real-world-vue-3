<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
defineProps(['event'])
</script>

<template>
  <h1>{{ event.title }}</h1>
  <p>{{ event.description }}</p>
</template>
