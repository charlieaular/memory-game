<template>
  <div class="memory-card h-full w-full rounded cursor-pointer shadow-lg duration-300"
    :class="{ 'memory-card__is-flipped': card.isFlipped }" @click="emit('onFlipCard')">
    <CardImage class="memory-card--card-face h-full w-full position-absolute" :image="cardBack" alt="question-mark" />
    <CardImage class="memory-card--card-face memory-card--card-face__is-not-flipped h-full w-full position-absolute"
      :image="card.image" :alt="card.name" />
  </div>
</template>

<script setup lang="ts">
import { Card } from '../types/Card';
import CardImage from './CardImage.vue';

defineProps<{
  card: Card,
}>()

const emit = defineEmits<{
  (e: 'onFlipCard'): void
}>()

const cardBack: string = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png"

</script>

<style scoped lang="scss">
.memory-card {
  transform-style: preserve-3d;

  &__is-flipped {
    transform: rotateY(180deg);
  }

  &--card-face {
    backface-visibility: hidden;

    &__is-not-flipped {
      transform: rotateY(180deg);

    }
  }
}
</style>