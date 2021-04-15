export interface Book {
    id: string,
    volumeInfo: {
        title: string,
        subtitle:string,
        publisher: string,
        description: string,
        authors?: Array<string>,
        publishedDate: string,
        previewLink?: string,
        imageLinks?: {
            thumbnail: string
        }
    },
}
