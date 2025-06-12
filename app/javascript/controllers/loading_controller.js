import { Controller } from "@hotwired/stimulus";
import { BProgress } from "@bprogress/core";

export default class LoadingController extends Controller {
  connect() {
    BProgress.configure({
      minimum: 0.08,
      maximum: 1,
      template: `<div class="bar"><div class="peg"></div></div>
             <div class="spinner"><div class="spinner-icon"></div></div>
             <div class="indeterminate"><div class="inc"></div><div class="dec"></div></div>`,
      easing: "linear",
      positionUsing: "width",
      speed: 300,
      trickle: true,
      trickleSpeed: 200,
      showSpinner: false,
      indeterminate: false,
      indeterminateSelector: ".indeterminate",
      barSelector: ".bar",
      spinnerSelector: ".spinner",
      parent: "body",
      direction: "ltr",
    });

    BProgress.start();
    BProgress.done();
  }
}
