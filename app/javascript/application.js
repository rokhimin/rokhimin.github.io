import { Application } from "@hotwired/stimulus";

window.Stimulus = Application.start();

import ThemeController from "./controllers/theme_controller.js";
Stimulus.register("theme", ThemeController);
import NavbarController from "./controllers/navbar_burger_controller.js";
Stimulus.register("navbar", NavbarController);
import MessageController from "./controllers/message_controller.js";
Stimulus.register("message", MessageController);
import ThumbnailController from "./controllers/thumbnail_controller.js";
Stimulus.register("thumbnail", ThumbnailController);
import LoadingController from "./controllers/loading_controller.js";
Stimulus.register("loading", LoadingController);
import CopyController from "./controllers/copy_controller.js";
Stimulus.register("copy", CopyController);
import TypewriterController from "./controllers/typewriter_controller.js";
Stimulus.register("typewriter", TypewriterController);
