import { Timestamp } from 'firebase-admin/firestore'
import { formatDistanceToNow } from 'date-fns'
import { zhTW } from 'date-fns/locale'

export const formattedCreatedAt = (createdAt: Timestamp) => {
  return formatDistanceToNow(createdAt.toDate(), {
    addSuffix: true,
    locale: zhTW
  })
}
