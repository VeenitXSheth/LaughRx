// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'auth/login.html'),
        signup: resolve(__dirname, 'auth/signup.html'),
        app: resolve(__dirname, 'app.html'),
        profile: resolve(__dirname, 'profile.html'),
        share: resolve(__dirname, 'share.html'),
      },
    },
  },
})