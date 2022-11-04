import { collection, DocumentData, QuerySnapshot, onSnapshot, query, QueryConstraint, Unsubscribe, FirestoreError, where, orderBy } from 'firebase/firestore'
import { Chat, isChat } from '../../types/Chat.types'
import { db } from "../firebase"
import { listen } from '../listen'

type Props = {
    callback?: (chats: Chat[]) => void
    onError?: (error?: FirestoreError) => void
}

export const listenChats = ({ callback, onError }: Props = {}): Unsubscribe => {
    const unsubscribe = listen({
        collectionName: 'chats',
        queryConstraints: [where('deletedAt', '==', null), orderBy('createdAt')],
        callback: (snapshot) => {
            const data: (Chat | undefined)[] = snapshot.docs.map(doc => {
                const datum = {
                    id: doc.id,
                    ...doc.data()
                }
                if (!isChat(datum)) return undefined
                return datum
            })
            if (data.includes(undefined)) {
                if (onError) return onError()
                throw new Error('Invalid data found.')
            } else {
                callback && callback(data.filter((datum): datum is Chat => datum !== undefined))
            }
        },
        onError,
    })
    return unsubscribe
}
