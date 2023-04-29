<template>
  <div class="row mx-0">
    <div class="col-12 mx-auto">
      <div class="p-1 text-center">
        <h6>Choose difficulty</h6>
        <DifficultyButton :is-selected="isCurrentDifficultSelected(currentDifficulty, DifficultyValue.Easy)"
          :difficulty-text="DifficultyText.Easy" @on-set-difficulty="onSetDifficulty(DifficultyValue.Easy)" />

        <DifficultyButton :is-selected="isCurrentDifficultSelected(currentDifficulty, DifficultyValue.Normal)"
          :difficulty-text="DifficultyText.Normal" @on-set-difficulty="onSetDifficulty(DifficultyValue.Normal)" />

        <DifficultyButton :is-selected="isCurrentDifficultSelected(currentDifficulty, DifficultyValue.Hard)"
          :difficulty-text="DifficultyText.Hard" @on-set-difficulty="onSetDifficulty(DifficultyValue.Hard)" />
      </div>

      <Records :history="toggleHistory" :is-finished="isFinished" :records="records"
        @on-toggle-history="onToggleHistory()" />


      <div
        class="height-90vh container items-stretch justify-content-around justify-items-center max-w-xl mx-auto p-3 grid sm:grid-cols-3 grid-cols-2 gap-4">
        <History v-if="toggleHistory" />
        <CardComponent v-else v-for="card in cards" :key="card.uuid" :card="card" @on-flip-card="onFlipCard(card)" />
      </div>
      <div class="text-center">
        <button class="btn btn-success" @click="onReset()">
          Reset
        </button>
      </div>
    </div>

    <UserModal />
    <CongratsModal ref="congratsModalRef" />

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue"

import shuffle from "lodash.shuffle"
import cloneDeep from "lodash.clonedeep"

import { fetchCards } from "../service/cards-service"
import { saveHistory } from "../service/history-service"
import { Card } from "../types/Card"
import { DifficultyValue, DifficultyText, fromValueToText } from '../types/difficulty'
import { HistoryRecords } from "../types/history"

import DifficultyButton from "./DifficultyButton.vue"
import CardComponent from "./Card.vue"
import UserModal from "./UserModal.vue"
import Records from "./Records.vue"
import CongratsModal from "./CongratsModal.vue"
import History from "./History.vue"

const cards = ref<Card[]>([])
const flippedCards = ref<Card[]>([])
const currentDifficulty = ref<DifficultyValue>(DifficultyValue.Easy)
const congratsModalRef = ref<InstanceType<typeof CongratsModal>>()
const toggleHistory = ref(false)

const records = reactive({
  successes: 0,
  errors: 0
})

const isFinished = computed(() => cards.value.length > 0 && cards.value.every(card => card.isMatched))

watch(isFinished, (isGameFinished) => {
  if (isGameFinished) {
    congratsModalRef.value?.show()
    onSaveHistory()
    
    onReset()
  }
})

onMounted(() => {
  fetchAllCards()
})

const onSaveHistory = () => {
  const currentDifficultyText = fromValueToText(currentDifficulty.value)

  const historyRecord: HistoryRecords = {
    successesCount: records.successes,
    errorsCount: records.errors,
    wins: 1
  }

  saveHistory(currentDifficultyText, historyRecord)
}

const onToggleHistory = () => toggleHistory.value = !toggleHistory.value

const resetRecords = () => {
  records.errors = 0
  records.successes = 0
}

const onSetDifficulty = (difficulty: DifficultyValue): void => {
  if (isCurrentDifficultSelected(currentDifficulty.value, difficulty)) return

  currentDifficulty.value = difficulty

  onReset()
}

const fetchAllCards = async (): Promise<void> => {
  try {
    const cardsFetched = await fetchCards(currentDifficulty.value)
    cards.value = suffleCards(cards.value, cardsFetched)
  } catch (error) {
    // TODO: Handle api errors
    console.log(error);
  }
}

const suffleCards = (cards: Card[], originalCards: Card[]): Card[] => {
  return shuffle(cards.concat(cloneDeep(originalCards), cloneDeep(originalCards)))
}

const onReset = (): void => {
  cards.value = []
  flippedCards.value = []
  resetRecords()
  fetchAllCards()
}

const onFlipCard = (card: Card): void => {
  if (cannotFlipAnotherCard(card)) return

  card.isFlipped = true

  if (flippedCards.value.length < 2) {
    flippedCards.value.push(card)
  }

  if (flippedCards.value.length == 2) {
    match()
  }
}

const match = (): void => {
  if (areFlippedCardSame()) {

    setTimeout(() => {
      flippedCards.value.forEach(card => card.isMatched = true);
      flippedCards.value = [];
      records.successes++
    }, 400);

  } else {

    setTimeout(() => {
      flippedCards.value.forEach(card => card.isMatched = false);

      cards.value
        .filter(card => !card.isMatched)
        .forEach(card => card.isFlipped = false)

      records.errors++

      flippedCards.value = [];
    }, 800);
  }
}

const cannotFlipAnotherCard = (card: Card): boolean => {
  return card.isMatched || card.isFlipped || flippedCards.value.length === 2
}

const areFlippedCardSame = (): boolean => {
  return flippedCards.value[0].uuid === flippedCards.value[1].uuid
}

const isCurrentDifficultSelected = (currentDifficulty: DifficultyValue, newDifficulty: DifficultyValue): boolean => {
  return currentDifficulty === newDifficulty
}
</script>

<style scoped>
.height-90vh {
  height: 90vh;
}
</style>
