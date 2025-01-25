export class StudentManager {
  constructor(storageKey = "studients") {
    this.storageKey = storageKey;
    this.studients = this.loadStudients();
  }

  loadStudients() {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  saveStudients() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.studients));
  }

  addStudient(studient) {
    this.studients.push(studient);
    this.saveStudients();
  }

  updateStudient(index, updatedStudient) {
    this.studients[index] = updatedStudient;
    this.saveStudients();
  }

  deleteStudient(index) {
    this.studients.splice(index, 1);
    this.saveStudients();
  }
}
