import { Subject } from "./Subject";

export class Student {
  constructor(lastname, firstname, surename, age, group, course, subjects) {
    this.lastname = lastname;
    this.firstname = firstname;
    this.surename = surename;
    this.age = age;
    this.group = group;
    this.course = course;
    this.activeLive = course;
    this.subjects = subjects || Student.defaultSubjects();
  }

  static defaultSubjects() {
    return [
      new Subject("Высшая Математитика"),
      new Subject("Англиский язык"),
      new Subject("Информационные технологии"),
      new Subject("Функциональное программирование"),
      new Subject("НизкоУровнивое программирование"),
      new Subject("Математическое Программирование"),
      new Subject("Объектно-Орентировнное программирование"),
      new Subject("Логическое программирование"),
    ];
  }
}
