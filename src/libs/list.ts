import { collection, getDocs, query, QueryConstraint } from 'firebase/firestore'
import { BaseModel, isBaseModel } from '../types/BaseModel.types'
import { db } from './firebase'

type Props = {
  collectionName: string
  queryConstraints?: QueryConstraint[]
}

export const list = async ({ collectionName, queryConstraints = [] }: Props): Promise<BaseModel[]> => {
  const collectionRef = collection(db, collectionName)
  const q = query(collectionRef, ...queryConstraints)
  const { docs } = await getDocs(q)
  const data = docs.map((doc) => {
    const datum = {
      id: doc.id,
      ...doc.data(),
    }
    if (!isBaseModel(datum)) throw new Error('Invalid data found.')
    return datum
  })
  return data
}
