<template>
  <ul v-for="(value, key) in history">
    <li> Difficulty: {{ key }} <br> Wins: {{ value.wins }} <br> Successes: {{ value.successesCount }} <br> Errors: {{
      value.errorsCount
    }} </li>
  </ul>
</template>

<script setup lang="ts">

import { onMounted, ref } from 'vue';
import { getHistory } from '../service/history-service';
import { HistorySchema } from '../types/history';

const history = ref<HistorySchema>()

const onGetHistory = () => {
  const historySaved = getHistory()
  history.value = historySaved
}

onMounted(() => {
  onGetHistory()
})

</script>

<style scoped></style>