import { collection, addDoc, setDoc, doc } from 'firebase/firestore'
import { BaseModel } from '../types/BaseModel.types'
import { db } from './firebase'

type Props<T extends BaseModel> = {
  inputData: Omit<T, keyof BaseModel> & {
    id?: string
    createdAt?: number
    updatedAt?: number
    deletedAt?: number | null
  }
  collectionName: string
}

export const create = async <T extends BaseModel>({ inputData, collectionName }: Props<T>): Promise<T> => {
  const now = Date.now()
  const { id, ...data } = {
    ...inputData,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  }

  const collectionRef = collection(db, collectionName)
  // TODO: Remove `as T`
  if (id) {
    await setDoc(doc(collectionRef, id), data)
    return {
      id,
      ...data,
    } as T
  } else {
    const createdDocRef = await addDoc(collectionRef, data)
    return {
      id: createdDocRef.id,
      ...data,
    } as T
  }
}
