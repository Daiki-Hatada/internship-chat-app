import { z } from 'zod'

import { BaseModelSchema } from './BaseModel.types'

const UserSchema = z.object({
    name: z.string(),
}).merge(BaseModelSchema)

export type User = z.infer<typeof UserSchema>

export const isUser = (value: unknown): value is User => {
    const parsedData = UserSchema.safeParse(value)
    if (parsedData.success) {
        return true
      } else {
        console.error(parsedData.error)
        return false
      }
}
