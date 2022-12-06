import { collection, getDocs, query, QueryConstraint } from 'firebase/firestore'
import { BaseModel } from '../types/BaseModel.types'
import { db } from './firebase'

type Props<T> = {
  collectionName: string
  queryConstraints?: QueryConstraint[]
  isT: (value: unknown) => value is T
}

export const list = async <T extends BaseModel>({ collectionName, queryConstraints = [], isT }: Props<T>): Promise<T[]> => {
  const collectionRef = collection(db, collectionName)
  const q = query(collectionRef, ...queryConstraints)
  const { docs } = await getDocs(q)
  const data = docs.map((doc) => {
    const datum = {
      id: doc.id,
      ...doc.data(),
    }
    if (!isT(datum)) throw new Error('Invalid data found.')
    return datum
  })
  return data
}
