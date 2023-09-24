import { Timestamp } from 'firebase/firestore'
import { formatDistanceToNow } from 'date-fns'
import { zhTW } from 'date-fns/locale'

export const formattedCreatedAt = (createdAt: Timestamp) => {
  return formatDistanceToNow(createdAt.toDate(), {
    addSuffix: true,
    locale: zhTW
  })
}

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60) || 0
  const seconds = Math.round(time - minutes * 60 || 0)

  return `${minutes}:${seconds < 10 ? 0 : ''}${seconds}`
}
