import { Chat, isChat } from '../../types/Chat.types'
import { list } from '../list'

export const listChats = async (): Promise<Chat[]> => {
  const data = await list({ collectionName: 'chats', queryConstraints: [] })
  return data.map((datum) => {
    if (!isChat(datum)) throw new Error('Invalid data found.')
    return datum
  })
}
