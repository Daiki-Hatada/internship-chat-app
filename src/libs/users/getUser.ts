import { isUser, User } from "../../types/User.types"
import { get } from "../get"

export const getUser = async ({ id }: { id: string }): Promise<User> => {
    const data = await get({ path: 'users', id })
    if (!isUser(data)) throw new Error('Invalid data found.')
    return data
}
