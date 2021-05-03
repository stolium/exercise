import React, {useContext, useEffect, useState} from "react";
import {AppContext} from "../contexts/AppContext";
import {Book} from "../models/book";
import {REMOVE_BOOK} from "../reducers/AppReducer";

const FavoritesList = () => {
    const {appState, appDispatch} = useContext(AppContext);

    const handleRemove = (book: Book) => {
        appDispatch({
            type: REMOVE_BOOK,
            data: book,
        });
    }

    return (<div className="reading-list-container">
        <h2>My reading wishlist ({appState.books.size})</h2>
        <div className="reading-list">
            {[...appState.books].map(([id, book]) => <div key={id} className="reading-list-content">
                <div>{book.volumeInfo.title}</div>
                <div className="pointer" onClick={() => handleRemove(book)}>[-]</div>
            </div>)}
        </div>
    </div>);
}

export default FavoritesList;
