const env = {
  'API_ADDR': import.meta.env.VITE_API_ADDR,
  'API_PORT': import.meta.env.VITE_API_PORT,
  'API_SECURE': import.meta.env.VITE_API_SECURE
}

const config = {
  'API_URI': `${env.API_SECURE === 'true' ? 'https' : 'http'}://${env.API_ADDR}:${env.API_PORT}`
}

export default config
