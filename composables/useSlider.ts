export function useSlider (callbacks: {
  onDragStart?: (percent: number) => void
  onDragging?: (percent: number) => void
  onDragEnd?: (percent: number) => void
}) {
  const isDragging = ref(false)
  const percent = ref(0)
  const sliderEl = ref<HTMLElement | null>(null)

  const handleSliderDown = (e: MouseEvent | TouchEvent) => {
    e.preventDefault()
    handleDragStart(e)
    window.addEventListener('mousemove', handleDragging)
    window.addEventListener('touchmove', handleDragging)
    window.addEventListener('mouseup', handleDraggEnd)
    window.addEventListener('touchend', handleDraggEnd)
  }

  const getPositionX = (e: MouseEvent | TouchEvent) => {
    if (!sliderEl.value) return
    const clientX = getClientX(e)
    const sliderSize = sliderEl.value.clientWidth
    const sliderOffsetLeft = sliderEl.value.getBoundingClientRect().left
    percent.value = (clientX - sliderOffsetLeft) / sliderSize
    if (percent.value < 0) percent.value = 0
    else if (percent.value > 1) percent.value = 1
  }

  const handleDragStart = (e: MouseEvent | TouchEvent) => {
    isDragging.value = true
    getPositionX(e)
    callbacks.onDragStart?.(percent.value)
  }

  const handleDragging = (e: MouseEvent | TouchEvent) => {
    if (!isDragging.value) return
    getPositionX(e)
    callbacks.onDragging?.(percent.value)
  }

  const handleDraggEnd = () => {
    if (!isDragging.value) return
    isDragging.value = false
    window.removeEventListener('mousemove', handleDragging)
    window.removeEventListener('touchmove', handleDragging)
    callbacks.onDragEnd?.(percent.value)
  }

  return {
    isDragging,
    percent,
    sliderEl,
    handleSliderDown
  }
}
