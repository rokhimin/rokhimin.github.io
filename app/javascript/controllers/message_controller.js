import { Controller } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js";

export default class MessageController extends Controller {
  hide() {
    this.element.remove();
  }
}
