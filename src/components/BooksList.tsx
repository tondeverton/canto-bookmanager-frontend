import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {deleteBook as delBook} from '../features/bookReducer';
import {deleteBook} from "../api/api";

const BooksList = () => {
    const books = useSelector((state: RootState) => state.books.books);
    const dispatch = useDispatch();

    const handleDeleteBook = async (id: number) => {
        let number = await deleteBook(id);
        dispatch(delBook(number));
    }

    return (
        <div>
            <h2>Books</h2>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        {book.title} by {book.author} (Published: {book.publishedDate})
                        <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BooksList;
