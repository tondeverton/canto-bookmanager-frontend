import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {deleteBook as delBook, setBooks} from '../features/bookReducer';
import {deleteBook, fetchBookByPublishedDateRange} from "../api/api";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const BooksList = () => {
    const books = useSelector((state: RootState) => state.books.books);
    const dispatch = useDispatch();
    const [selectedDateFilterFrom, setSelectedDateFilterFrom] = useState<Date | null>(null);
    const [selectedDateFilterTo, setSelectedDateFilterTo] = useState<Date | null>(null);

    const handleDeleteBook = async (id: number) => {
        let number = await deleteBook(id);
        dispatch(delBook(number));
    }

    const handleFilter = async () => {
        const filteredBooks = await fetchBookByPublishedDateRange(selectedDateFilterFrom!, selectedDateFilterTo!);
        dispatch(setBooks(filteredBooks))
    }

    return (
        <div>
            <h2>Books</h2>

            <DatePicker
                placeholderText="From"
                selected={selectedDateFilterFrom}
                showYearDropdown={true}
                dropdownMode="select"
                onChange={(date) => setSelectedDateFilterFrom(date)}
                minDate={new Date(1970, 0, 1)}
                maxDate={new Date()}
                dateFormat="yyyy-MM-dd"
            />
            <DatePicker
                placeholderText="From"
                selected={selectedDateFilterTo}
                showYearDropdown={true}
                dropdownMode="select"
                onChange={(date) => setSelectedDateFilterTo(date)}
                minDate={new Date(1970, 0, 1)}
                maxDate={new Date()}
                dateFormat="yyyy-MM-dd"
            />
            <button onClick={handleFilter}>Filter</button>

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
