import { Timestamp } from 'firebase/firestore'
import { formatDistanceToNow } from 'date-fns'
import { zhTW } from 'date-fns/locale'

export const formatCreatedAt = (createdAt: Timestamp) => {
  return formatDistanceToNow(createdAt.toDate(), {
    addSuffix: true,
    locale: zhTW
  })
}

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60) || 0
  const seconds = Math.floor(time - minutes * 60 || 0)
  return `${minutes}:${seconds < 10 ? 0 : ''}${seconds}`
}

export const getClientX = (e: MouseEvent | TouchEvent) => {
  let clientX: number
  if (e.type.startsWith('touch')) clientX = (e as TouchEvent).touches[0].clientX
  else clientX = (e as MouseEvent).clientX
  return clientX
}
