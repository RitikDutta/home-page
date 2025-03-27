   import { defineConfig } from 'vite'

   export default defineConfig({
     server: {
       allowedHosts: [
         '49ef-2401-4900-8819-f8b-29a-8f7a-6b4a-36be.ngrok-free.app' // Replace 'xxxx' with the actual hostname you want to allow
       ]
     }
   })