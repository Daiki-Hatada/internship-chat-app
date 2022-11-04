import { getDoc, doc } from 'firebase/firestore'
import { db } from "./firebase"
import { BaseModel, isBaseModel } from "../types/BaseModel.types"

type Props = {
    path: string
    id: string
}

export const get = async ({ path, id }: Props): Promise<BaseModel> => {
    const snapshot = await getDoc(doc(db, path, id))
    const datum = {
        id,
        ...snapshot.data(),
    }
    if (!isBaseModel(datum)) throw new Error('Invalid data found.')
    return datum
}
