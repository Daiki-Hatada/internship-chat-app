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
  isT: (value: unknown) => value is T
}

export const create = async <T extends BaseModel>({ inputData, collectionName, isT }: Props<T>): Promise<T> => {
  const now = Date.now()
  const { id, ...data } = {
    ...inputData,
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  }

  const collectionRef = collection(db, collectionName)
  let createdObject: unknown
  if (id) {
    await setDoc(doc(collectionRef, id), data)
    createdObject = {
      id,
      ...data,
    }
  } else {
    const createdDocRef = await addDoc(collectionRef, data)
    createdObject = {
      id: createdDocRef.id,
      ...data,
    }
  }
  if (!isT(createdObject)) throw new Error('Invalid data found.')
  return createdObject
}
