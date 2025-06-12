import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    document.querySelectorAll("pre > code").forEach((codeBlock) => {
      const pre = codeBlock.parentNode;

      if (pre.parentNode.classList.contains("code-wrapper")) return;

      const wrapper = document.createElement("div");
      wrapper.className = "relative rounded mb-4 code-wrapper";

      const button = document.createElement("button");
      button.innerText = "📋 Copy";
      button.className =
        "absolute top-2 right-2 text-xs text-white bg-gray-600 dark:bg-gray-800 px-2 py-1 rounded hover:bg-gray-400 cursor-pointer";

      button.addEventListener("click", () => {
        navigator.clipboard.writeText(codeBlock.innerText).then(() => {
          button.innerText = "✅ Copied!";
          setTimeout(() => {
            button.innerText = "📋 Copy";
          }, 1500);
        });
      });

      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(button);
      wrapper.appendChild(pre);
    });
  }
}
