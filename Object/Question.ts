import Answer from './Answer';

export default class Question {
  title: string;
  image: string | undefined;
  answers: Array<Answer>;

  constructor(
    title: string,
    image: string | undefined,
    answers: Array<Answer>,
  ) {
    this.title = title;
    this.image = image;
    this.answers = answers;
  }
}
