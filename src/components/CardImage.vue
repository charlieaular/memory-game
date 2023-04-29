<template>
  <div v-bind="$attrs">
    <img class="h-full w-full rounded object-cover" :src="image" :alt="alt" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image: string,
  alt: string
}>()
</script>

<style scoped></style>