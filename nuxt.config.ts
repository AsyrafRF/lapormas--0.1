export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-03-01',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'LaporMas! — Layanan Aduan Warga',
      meta: [
        { name: 'description', content: 'Portal layanan laporan masyarakat di lingkungan komplek perumahan.' },
        { name: 'theme-color', content: '#f4f7f5' }
      ]
    }
  },
  typescript: {
    strict: true,
    typeCheck: true
  }
})
