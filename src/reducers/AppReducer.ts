import {Book} from "../models/book";
import {State} from "../contexts/AppContext";

export const ADD_BOOK = 'ADD_BOOK';
export const REMOVE_BOOK = 'REMOVE_BOOK';

export type Action =
    | { type: 'ADD_BOOK', data: Book }
    | { type: 'REMOVE_BOOK', data: Book };

export default (state: State, action: Action) => {
    let books: Map<string, Book>;
    switch (action.type) {
        case ADD_BOOK:
            books = new Map(state.books);
            books.set(action.data.id, action.data)
            return {...state, books};

        case REMOVE_BOOK:
            books = new Map(state.books);
            books.delete(action.data.id)
            return {...state, books};
    }
};
