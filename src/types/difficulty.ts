export enum DifficultyValue {
  Easy = 4,
  Normal = 5,
  Hard = 7
}

export enum DifficultyText {
  Easy = "Easy",
  Normal = "Normal",
  Hard = "Hard"
}


export const fromValueToText = (difficultyValue: DifficultyValue): DifficultyText => {
  let difficultyText = DifficultyText.Easy
  switch (difficultyValue) {
    case DifficultyValue.Easy:
      difficultyText = DifficultyText.Easy
      break;
    case DifficultyValue.Normal:
      difficultyText = DifficultyText.Normal
      break;
    case DifficultyValue.Hard:
      difficultyText = DifficultyText.Hard
      break;
    default:
      difficultyText = DifficultyText.Easy
      break;
  }

  return difficultyText
}