import { collection, DocumentData, QuerySnapshot, onSnapshot, query, QueryConstraint, Unsubscribe, FirestoreError } from 'firebase/firestore'
import { db } from "./firebase"

type Props = {
    collectionName: string
    queryConstraints: QueryConstraint[]
    callback?: (snapshot: QuerySnapshot<DocumentData>) => void
    onError?: (error: FirestoreError) => void
}

export const listen = ({ collectionName, queryConstraints, callback, onError }: Props): Unsubscribe => {
    const collectionRef = collection(db, collectionName)
    const q = query(collectionRef, ...queryConstraints)
    const unsubscribe = onSnapshot(q, { next: callback, error: onError })
    return unsubscribe
}
