export interface HistorySchema {
  Easy: HistoryRecords,
  Normal: HistoryRecords,
  Hard: HistoryRecords,
}

export interface HistoryRecords {
  wins: number;
  successesCount: number;
  errorsCount: number;
}