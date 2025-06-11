import { Application } from "https://unpkg.com/@hotwired/stimulus/dist/stimulus.js";

window.Stimulus = Application.start();

import ThemeController from "./controllers/theme_controller.js";
Stimulus.register("theme", ThemeController);
import NavbarController from "./controllers/navbar_burger_controller.js";
Stimulus.register("navbar", NavbarController);
import MessageController from "./controllers/message_controller.js";
Stimulus.register("message", MessageController);
import ThumbnailController from "./controllers/thumbnail_controller.js";
Stimulus.register("thumbnail", ThumbnailController);
import LoadingController from "./controllers/loading_controller.js"
Stimulus.register("loading", LoadingController);
