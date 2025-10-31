// import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'
// // import react from '@vitejs/plugin-react'

// // // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })

// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//   ],
// })
// vite.config.js (ESM)
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // add any other Vite config here
})
