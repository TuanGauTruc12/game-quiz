export default class Answer {
  title: string;
  isCorrect: boolean;

  constructor(title: string, isCorrect: boolean) {
    this.title = title;
    this.isCorrect = isCorrect;
  }
}
