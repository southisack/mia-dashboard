// 5 pastel gradient backdrops for transparent reward illustrations — rotated by index for variety
export const ILLUSTRATION_GRADIENTS = [
  'linear-gradient(135deg, #FFBF8C 0%, #FF6BB5 100%)', // peach → pink
  'linear-gradient(135deg, #F5E0FF 0%, #FF6BB5 100%)', // lavender → pink
  'linear-gradient(135deg, #FFBF8C 0%, #F5E0FF 100%)', // peach → lavender
  'linear-gradient(135deg, #FF6BB5 0%, #9B7DB5 100%)', // pink → purple-gray
  'linear-gradient(135deg, #F5E0FF 0%, #FFBF8C 100%)', // lavender → peach
]

export function illustrationGradient(index: number) {
  return ILLUSTRATION_GRADIENTS[index % ILLUSTRATION_GRADIENTS.length]
}

// Deterministic gradient pick from a reward id — used where list index isn't available
export function illustrationGradientForId(id: string) {
  let hash = 0
  for (let i = 0; i < id.length; i++) hash = (hash * 31 + id.charCodeAt(i)) | 0
  return ILLUSTRATION_GRADIENTS[Math.abs(hash) % ILLUSTRATION_GRADIENTS.length]
}
