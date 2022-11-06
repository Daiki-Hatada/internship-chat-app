import { limit, orderBy, QueryConstraint, where } from 'firebase/firestore'
import { Chat, isChat } from '../../types/Chat.types'
import { list } from '../list'

type Props = {
  queryConstraints?: QueryConstraint[]
}

export const listChats = async ({ queryConstraints = [] }: Props = {}): Promise<Chat[]> => {
  const q = [where('deletedAt', '==', null), limit(100), orderBy('createdAt', 'desc')]
  const data = await list({ collectionName: 'chats', queryConstraints: [...q, ...queryConstraints] })
  return data.map((datum) => {
    if (!isChat(datum)) throw new Error('Invalid data found.')
    return datum
  })
}
