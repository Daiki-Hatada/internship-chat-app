import { z } from 'zod'

export const BaseModelSchema = z.object({
  id: z.string(),
  createdAt: z.number(),
  updatedAt: z.number(),
  deletedAt: z.number().nullable(),
})

export type BaseModel = z.infer<typeof BaseModelSchema>

export const isBaseModel = (value: unknown): value is BaseModel => {
  const parsedData = BaseModelSchema.safeParse(value)
  if (parsedData.success) {
    return true
  } else {
    console.error(parsedData.error)
    return false
  }
}
