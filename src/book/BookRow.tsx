import React from "react";

import { Book } from "../models/book";
import {addClickInterface} from "../book-search/BookSearch";

interface BookRowProps {
    book: Book,
    onAddClick: addClickInterface
}

const BookRow = (props: BookRowProps) => {
    const {book, onAddClick} = props;
    return <div key={book?.id} className="book">
        <div className="book--image">
            <img
                src={book?.volumeInfo?.imageLinks?.thumbnail}
                alt={book?.volumeInfo?.title}
            />
        </div>
        <div className="book--description">
            <div>
                <h3><a href={book?.volumeInfo.previewLink} target="_blank">{book?.volumeInfo?.title}</a></h3>
                <h4>{book?.volumeInfo?.authors?.join(', ')}</h4>
                {book?.volumeInfo?.publisher && <span>{book?.volumeInfo?.publisher}, </span>}
                <span>{book?.volumeInfo?.publishedDate}</span>
            </div>
            <div>
                <button onClick={() => onAddClick(book)}>+ Add to favorites.</button>
            </div>
        </div>
    </div>
}

export default BookRow;
