import { BaseModel } from '../../types/BaseModel.types'
import { Chat, isChat } from '../../types/Chat.types'
import { create } from '../create'

type Props = { chat: Omit<Chat, keyof BaseModel> }

export const createChat = async ({ chat }: Props): Promise<Chat> => {
  const data = await create<Chat>({ inputData: chat, collectionName: 'chats', isT: isChat })
  return data
}
