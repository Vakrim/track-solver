import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/track-solver/",

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        randomTrack: resolve(__dirname, 'random-track.html'),
        championship: resolve(__dirname, 'championship.html'),
      },
    },
  },
});
