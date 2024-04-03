'use client'

export const wittySubtitleText = () => {
  const now = new Date()
  const hour = now.getHours()

  if (hour < 7 || hour >= 22) {
    return '💭 Dreaming of 20ms requests'
  } else if (hour < 11) {
    return '🍳 Cooking data for breakfast'
  } else if (hour < 17) {
    return '👨‍🔬 Solving constraints'
  } else {
    return '🌆 Puzzled by the sunset'
  }
}

export const WittySubtitleText = () => {
  return <span>{wittySubtitleText()}</span>
}
