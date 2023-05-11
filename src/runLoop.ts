import { clearScreen } from "./graphics";

interface App {
  update: () => void;
  draw: () => void;
}

export function runLoop(app: App) {
  function loop() {
    clearScreen();

    app.update();
    app.draw();
    requestAnimationFrame(loop);
  }

  requestAnimationFrame(loop);
}
