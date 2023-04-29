import cloneDeep from "lodash.clonedeep"
import { DifficultyText } from "../types/difficulty"
import { HistorySchema, HistoryRecords } from "../types/history"

const HISTORY_KEY = "history"

const historySchemaInitial: HistorySchema = {
  [DifficultyText.Easy]: { wins: 0, successesCount: 0, errorsCount: 0 },
  [DifficultyText.Normal]: { wins: 0, successesCount: 0, errorsCount: 0 },
  [DifficultyText.Hard]: { wins: 0, successesCount: 0, errorsCount: 0 },
}

export const saveHistory = (difficulty: DifficultyText, historyRecords: HistoryRecords): void => {
  const currentHistory = cloneDeep(getHistory())

  currentHistory[difficulty].wins += historyRecords.wins
  currentHistory[difficulty].successesCount += historyRecords.successesCount
  currentHistory[difficulty].errorsCount += historyRecords.errorsCount

  localStorage.setItem(HISTORY_KEY, JSON.stringify(currentHistory))
  
}

export const getHistory = (): HistorySchema => {
  const history = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? JSON.stringify(historySchemaInitial)) as HistorySchema
  return history
}