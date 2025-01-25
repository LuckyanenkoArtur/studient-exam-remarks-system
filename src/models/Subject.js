export class Subject {
  constructor(title, mark = 0) {
    if (mark < 0 || mark > 5) {
      throw new Error("Mark must be between 0 and 5");
    }
    this.title = title;
    this.mark = mark;
  }
}
