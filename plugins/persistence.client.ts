import type { StoreState } from '~/types/lapormas'

const STORAGE_KEY = 'lapormas-prototype-v01'

export default defineNuxtPlugin(() => {
  const { state, replaceStore } = useLaporMas()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as StoreState
      if (parsed && Array.isArray(parsed.users) && Array.isArray(parsed.reports)) replaceStore(parsed)
    }
  } catch (error) {
    console.warn('Data demo LaporMas tidak dapat dibaca. Seed awal digunakan.', error)
  }
  watch(state, (value: StoreState) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(value)) }
    catch (error) { console.warn('Penyimpanan lokal penuh atau tidak tersedia.', error) }
  }, { deep: true })
})
