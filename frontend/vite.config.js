import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // this address if of the frontend url on which frontend is running
    port: 3000,
    proxy: {
      "/api":{
        // this address is of the backend url on which backend is running
        target: "http://localhost:5000",
      }
    }
  }
})
