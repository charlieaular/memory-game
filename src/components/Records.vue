<template>
  <div class="d-flex flex-row justify-content-center">
    <div class="p-1">
      <span class="btn btn-info cursor-default">Successes :
        <span class="badge" :class="isFinished ? 'badge-success' : 'badge-light'">{{ records.successes }}</span> </span>
    </div>
    <div class="p-1">
      <span class="btn btn-danger cursor-default">Errors :
        <span class="badge" :class="isFinished ? 'badge-success' : 'badge-light'">{{ records.errors }}</span> </span>
    </div>
    <button class="btn btn-light" @click="emit('onToggleHistory')">
        {{ history ? "Hide" : "Show" }} history
      </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  records: {
    successes: number,
    errors: number,
  },
  isFinished: boolean,
  history: boolean,
}>()

const emit = defineEmits<{
  (e: 'onToggleHistory'): void
}>()
</script>

<style scoped>

</style>