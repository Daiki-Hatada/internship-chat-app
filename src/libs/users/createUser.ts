import { User } from "../../types/User.types"
import { BaseModel } from "../../types/BaseModel.types"
import { create } from "../create"

type Props = { user: Omit<User, keyof BaseModel> }

export const createUser = async ({ user }: Props): Promise<User> => {
    const data = await create<User>({ inputData: user, collectionName: 'users'})
    return data
}
