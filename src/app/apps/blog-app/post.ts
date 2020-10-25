import { firestore } from 'firebase'

export class Post {
    id: string
    title: string
    author: string
    authorId: string
    body: string
    image: string
    published: Date
    likes: Array<string> | firestore.FieldValue
    comments: Array<string> | firestore.FieldValue
}
