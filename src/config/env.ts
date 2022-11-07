export const VITE_FIREBASE_API_KEY = (() => {
  const v = import.meta.env.VITE_FIREBASE_API_KEY as string
  if (typeof v !== 'string') throw new Error('Invalid value found.')
  return v
})()
export const VITE_FIREBASE_AUTH_DOMAIN = (() => {
  const v = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string
  if (typeof v !== 'string') throw new Error('Invalid value found.')
  return v
})()
export const VITE_FIREBASE_PROJECT_ID = (() => {
  const v = import.meta.env.VITE_FIREBASE_PROJECT_ID as string
  if (typeof v !== 'string') throw new Error('Invalid value found.')
  return v
})()
export const VITE_FIREBASE_STORAGE_BUCKET = (() => {
  const v = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string
  if (typeof v !== 'string') throw new Error('Invalid value found.')
  return v
})()
export const VITE_FIREBASE_MESSAGING_SENDER_ID = (() => {
  const v = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID as string
  if (typeof v !== 'string') throw new Error('Invalid value found.')
  return v
})()
export const VITE_FIREBASE_APP_ID = (() => {
  const v = import.meta.env.VITE_FIREBASE_APP_ID as string
  if (typeof v !== 'string') throw new Error('Invalid value found.')
  return v
})()
export const VITE_FIREBASE_MEASUREMENT_ID = (() => {
  const v = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string
  if (typeof v !== 'string') throw new Error('Invalid value found.')
  return v
})()
