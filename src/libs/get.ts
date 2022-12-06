import { getDoc, doc } from 'firebase/firestore'
import { BaseModel } from '../types/BaseModel.types'
import { db } from './firebase'

type Props<T> = {
  path: string
  id: string
  isT: (value: unknown) => value is T
}

export const get = async <T extends BaseModel>({ path, id, isT }: Props<T>): Promise<T> => {
  const snapshot = await getDoc(doc(db, path, id))
  const datum = {
    id,
    ...snapshot.data(),
  }
  if (!isT(datum)) throw new Error('Invalid data found.')
  return datum
}
