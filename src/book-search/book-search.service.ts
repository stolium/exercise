import  fetchUrl from './../shared/fetchUrl/fetchUrl';
import {Book} from "../models/book";

export async function getBooksByType(type: string): Promise<Array<Book>> {
    try {
        let items: Book[] = (await fetchUrl(`https://www.googleapis.com/books/v1/volumes?q=${type}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
            }
        })).items;
        return items;
    } catch(exception) {
        return [];
    }
}

