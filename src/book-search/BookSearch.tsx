import React, {useContext, useEffect, useState} from "react";

import { getBooksByType } from "./book-search.service";
import useDebounce from "../hooks/useDebounce";
import { Book } from "../models/book";
import { ADD_BOOK } from "../reducers/AppReducer";
import { AppContext } from "../contexts/AppContext";
import BookRow from "../book/BookRow";


export interface addClickInterface {
    (book: Book): void;
}

const BookSearch = () => {
    const [bookType, updateBookType] = useState("");
    const [allAvailableBooks, setAllAvailableBooks] = useState<Book[]>([]);
    const debouncedBookType = useDebounce(bookType, 500);
    const {appDispatch} = useContext(AppContext);

    async function requestBooks(search: string) {
        if (search) {
            const allBooks: Array<Book> = await getBooksByType(search);
            setAllAvailableBooks(allBooks);
        }
    }

    useEffect(()=>{
        async function getBooks(search: string) {
            await requestBooks(search);
        }

        if(debouncedBookType && debouncedBookType.length > 3){
            getBooks(debouncedBookType);
        }
    }, [debouncedBookType])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateBookType(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await requestBooks(e.currentTarget.value)
    }

    const handleAddBook: addClickInterface = (book: Book) => {
        appDispatch({
            type: ADD_BOOK,
            data: book,
        });
    }

    return (
            <>
                <div className="book--container">
                    <div className="search-params">
                        <div>
                            <form
                                onSubmit={handleSubmit}
                            >
                                <input
                                    className="full-width"
                                    autoFocus
                                    name="gsearch"
                                    type="search"
                                    value={bookType}
                                    placeholder="Search for books to add to your reading list and press Enter"
                                    onChange={handleSearchChange}
                                />
                            </form>
                            {allAvailableBooks?.length === 0 && (
                                <div className="empty">
                                    <p>
                                        Try searching for a topic, for example
                                        <a onClick={() => {
                                                updateBookType("Javascript");
                                            }}
                                        >
                                            &nbsp;
                                            "Javascript"
                                        </a>
                                    </p>
                                </div>
                            )}

                            {allAvailableBooks?.length > 0 && <div className="books-list">
                                {allAvailableBooks.map(item => <BookRow
                                    book={item}
                                    onAddClick={handleAddBook}
                                    key={item.id}
                                />)}
                            </div>}
                        </div>
                    </div>
                </div>
            </>
    );
};

export default BookSearch;
