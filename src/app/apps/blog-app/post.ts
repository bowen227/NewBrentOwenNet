import { Data } from '@angular/router'

export class Post {
    id: string
    title: string
    author: string
    authorId: string
    body: string
    image: string
    published: Date
    likes: number
    comments: Array<string>
}
