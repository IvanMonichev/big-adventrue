import { LoremIpsum } from 'lorem-ipsum';


export const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    min: 1,
    max: 3,
  },
  wordsPerSentence: {
    min: 5,
    max: 14,
  }
})
