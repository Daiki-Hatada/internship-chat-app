import { BaseModel } from '../../types/BaseModel.types'
import { isUser, User } from '../../types/User.types'
import { create } from '../create'

type Props = { user: Omit<User, keyof BaseModel> }

export const createUser = async ({ user }: Props): Promise<User> => {
  const data = await create<User>({ inputData: user, collectionName: 'users', isT: isUser })
  return data
}
