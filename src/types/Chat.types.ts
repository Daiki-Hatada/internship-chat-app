import { z } from 'zod'

import { BaseModelSchema } from './BaseModel.types'

const ChatSchema = z.object({
    name: z.string(),
    body: z.string(),
}).merge(BaseModelSchema)

export type Chat = z.infer<typeof ChatSchema>

export const isChat = (value: unknown): value is Chat => {
    const parsedData = ChatSchema.safeParse(value)
    if (parsedData.success) {
        return true
      } else {
        console.error(parsedData.error)
        return false
      }
}
