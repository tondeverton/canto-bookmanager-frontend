import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store';
import {deleteBook as delBook, setBooks} from '../features/bookReducer';
import {deleteBook, fetchBookByPublishedDateRange, fetchBooks} from "../api/api";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';

const BooksList = () => {
    const books = useSelector((state: RootState) => state.books.books);
    const dispatch = useDispatch();
    const [selectedDateFilterFrom, setSelectedDateFilterFrom] = useState<Date | null>(null);
    const [selectedDateFilterTo, setSelectedDateFilterTo] = useState<Date | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const alertTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleDeleteBook = async (id: number) => {
        let number = await deleteBook(id);
        dispatch(delBook(number));
    }

    const handleFilter = async () => {
        let dateFrom = selectedDateFilterFrom!;
        let dateTo = selectedDateFilterTo!;

        if (!dateFrom && dateTo) {
            setSelectedDateFilterFrom(dateTo);
            setSelectedDateFilterTo(null);
            dateFrom = dateTo;
        }

        if (!dateFrom) {
            handleShowAlert();
            return;
        }

        if (dateTo && dateFrom > dateTo) {
            handleShowAlert();
            return;
        }

        const filteredBooks = await fetchBookByPublishedDateRange(dateFrom, dateTo);
        dispatch(setBooks(filteredBooks))
    }

    const handleReset = async () => {
        const books = await fetchBooks();
        setSelectedDateFilterFrom(null)
        setSelectedDateFilterTo(null)
        dispatch(setBooks(books))
    }

    const handleShowAlert = () => {
        setShowAlert(true);
        alertTimeoutRef.current = setTimeout(() => setShowAlert(false), 3000);
    };

    const removeAlert = () => {
        clearTimeout(alertTimeoutRef.current!)
        setShowAlert(false);
    }

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Books</h2>

            {showAlert && (
                <div className="alert alert-danger alert-dismissible fade show mt-3" role="alert">
                    <strong>Fail!</strong> Please fill at least the date From.
                    <button type="button" className="btn-close" onClick={() => removeAlert()}></button>
                </div>
            )}

            <div className="row">
                <div className="col-md-4 mb-3">
                    <DatePicker
                        placeholderText="From *"
                        selected={selectedDateFilterFrom}
                        showYearDropdown={true}
                        dropdownMode="select"
                        onChange={(date) => setSelectedDateFilterFrom(date)}
                        minDate={new Date(1970, 0, 1)}
                        maxDate={new Date()}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                        wrapperClassName="w-100"
                    />
                </div>
                <div className="col-md-4 mb-3">
                    <DatePicker
                        placeholderText="To"
                        selected={selectedDateFilterTo}
                        showYearDropdown={true}
                        dropdownMode="select"
                        onChange={(date) => setSelectedDateFilterTo(date)}
                        minDate={selectedDateFilterFrom ?? new Date(1970, 0, 1)}
                        maxDate={new Date()}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                        wrapperClassName="w-100"
                    />
                </div>
                <button onClick={handleFilter} className="col-md-2 mb-3 btn btn-primary">Filter</button>
                <button onClick={handleReset} className="col-md-2 mb-3 btn btn-dark">Reset</button>
            </div>

            <div className="row">
                <table className="table table-striped">
                    <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Author</th>
                        <th scope="col">Published date</th>
                    </tr>
                    </thead>
                    <tbody>
                    {books.map(book => (
                        <tr>
                            <th scope="row">{book.id}</th>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.publishedDate}</td>
                            <td>
                                <button onClick={() => handleDeleteBook(book.id)}
                                        className="btn btn-danger w-100">Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BooksList;
