import React, {useContext, useEffect, useState} from "react";
import { getBooksByType } from "./book-search.service";
import useDebounce from "../hooks/useDebounce";
import {Book} from "../models/book";
import {ADD_BOOK} from "../reducers/AppReducer";
import {AppContext} from "../contexts/AppContext";

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

    const handleAddBook = (book: Book) => {
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
                                            {" "}
                                            "Javascript"
                                        </a>
                                    </p>
                                </div>
                            )}

                            {allAvailableBooks?.length > 0 && <div className="books-list">
                                {allAvailableBooks.map(item => <div key={item?.id} className="book">
                                        <div className="book--image">
                                            <img
                                                src={item?.volumeInfo?.imageLinks?.thumbnail}
                                                alt={item?.volumeInfo?.title}
                                            />
                                        </div>
                                        <div className="book--description">
                                            <div>
                                                <h3><a href={item?.volumeInfo.previewLink} target="_blank">{item?.volumeInfo?.title}</a></h3>
                                                <h4>{item?.volumeInfo?.authors?.join(', ')}</h4>
                                                {item?.volumeInfo?.publisher && <span>{item?.volumeInfo?.publisher}, </span>}
                                                <span>{item?.volumeInfo?.publishedDate}</span>
                                            </div>
                                            <div>
                                                <button onClick={() => handleAddBook(item)}>+ Add to favorites.</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>}

                        </div>
                    </div>
                </div>
            </>
    );
};

export default BookSearch;
