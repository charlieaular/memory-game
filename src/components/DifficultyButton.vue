<template>
  <button :name="difficultyText" :class="`${isSelected ? 'btn btn-primary' : 'btn-outline-primary text-dark'}`"
    class="btn m-2" @click="emit('onSetDifficulty')">
    {{ difficultyText }}
  </button>
</template>

<script setup lang="ts">
import { DifficultyText } from '../types/difficulty';

defineProps<{
  isSelected: boolean,
  difficultyText: DifficultyText,
}>()

const emit = defineEmits<{
  (e: 'onSetDifficulty'): void
}>()

</script>
