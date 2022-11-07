import { Unsubscribe, FirestoreError, where, orderBy, QueryConstraint, limit } from 'firebase/firestore'
import { Chat, isChat } from '../../types/Chat.types'
import { listen } from '../listen'

type Props = {
  callback?: (chats: Chat[]) => void
  onError?: (error?: FirestoreError) => void
  queryConstraints?: QueryConstraint[]
}

export const listenChats = ({ callback, onError, queryConstraints }: Props = {}): Unsubscribe => {
  const q = [where('deletedAt', '==', null), limit(1000), orderBy('createdAt', 'desc')]
  const unsubscribe = listen({
    collectionName: 'chats',
    queryConstraints: queryConstraints ? [...q, ...queryConstraints] : q,
    callback: (snapshot) => {
      const data: (Chat | undefined)[] = snapshot.docs.map((doc) => {
        const datum = {
          id: doc.id,
          ...doc.data(),
        }
        if (!isChat(datum)) return undefined
        return datum
      })
      if (data.includes(undefined)) {
        if (onError) return onError()
        throw new Error('Invalid data found.')
      } else {
        return callback && callback(data.filter((datum): datum is Chat => datum !== undefined))
      }
    },
    onError,
  })
  return unsubscribe
}
