import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["text"];
  static values = { words: Array };

  connect() {
    this.index = 0;
    this.isDeleting = false;
    this.txt = "";
    this.wordsList = this.wordsValue || ["My Blog", "whdzera"];
    this.type();
  }

  type() {
    const current = this.index % this.wordsList.length;
    const fullTxt = this.wordsList[current];

    this.txt = this.isDeleting
      ? fullTxt.substring(0, this.txt.length - 1)
      : fullTxt.substring(0, this.txt.length + 1);

    this.textTarget.textContent = this.txt;

    let speed = this.isDeleting ? 50 : 120;

    if (!this.isDeleting && this.txt === fullTxt) {
      speed = 1000;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.index++;
      speed = 500;
    }

    setTimeout(() => this.type(), speed);
  }
}
