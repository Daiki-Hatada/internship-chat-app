import { BaseModel } from '../../types/BaseModel.types'
import { Chat } from '../../types/Chat.types'
import { create } from '../create'

type Props = { chat: Omit<Chat, keyof BaseModel> }

export const createChat = async ({ chat }: Props): Promise<Chat> => {
  const data = await create<Chat>({ inputData: chat, collectionName: 'chats' })
  return data
}
