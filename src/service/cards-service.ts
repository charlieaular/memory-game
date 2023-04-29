import axios from "axios";

import { Card } from "../types/Card";
import { CardApiResponse } from "../types/card-api-response";
import { DifficultyValue } from "../types/difficulty";

const api: string = "https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries"

export const fetchCards = async (difficulty: DifficultyValue = DifficultyValue.Easy): Promise<Card[]> => {
    const { data } = await axios.get<CardApiResponse>(`${api}?per_page=${difficulty}`)
    
    const cards = data.entries.map<Card>(entrie => ({
      uuid: entrie.fields.image.uuid,
      name: entrie.fields.image.title,
      image: entrie.fields.image.url,
      isFlipped: false,
      isMatched: false,
    }));

    return cards
}