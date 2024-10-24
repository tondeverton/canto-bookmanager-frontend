import React, {useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {addBook} from '../features/bookReducer';
import {createBook} from '../api/api';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import {getISODateFromDate} from "../utilities/date";

const AddBook = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedDate, setPublishedDate] = useState<Date | null>(null);
    const [showAlert, setShowAlert] = useState(false);
    const alertTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleAddBook = async () => {
        if (!title || title.trim() === ''
            || !author || author.trim() === ''
            || !publishedDate) {
            handleShowAlert();
            return;
        }

        const publishedDateAsISODateString = getISODateFromDate(publishedDate!);
        const newBook = await createBook({title, author, publishedDate: publishedDateAsISODateString});
        dispatch(addBook(newBook));

        setTitle('');
        setAuthor('');
        setPublishedDate(null);
    };

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
            <h2 className="mb-4">Add Book</h2>
            {showAlert && (
                <div className="alert alert-danger alert-dismissible fade show mt-3" role="alert">
                    <strong>Fail!</strong> Please fill all the fields.
                    <button type="button" className="btn-close" onClick={() => removeAlert()}></button>
                </div>
            )}
            <div className="row">
                <div className="col-md-5 mb-3">
                    <input
                        type="text"
                        placeholder="Title *"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col-md-4 mb-3">
                    <input
                        type="text"
                        placeholder="Author *"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="col-md-3 mb-3">
                    <DatePicker
                        placeholderText="Published Date *"
                        selected={publishedDate}
                        showYearDropdown={true}
                        dropdownMode="select"
                        onChange={(date) => setPublishedDate(date)}
                        minDate={new Date(1970, 0, 1)}
                        maxDate={new Date()}
                        dateFormat="yyyy-MM-dd"
                        className="form-control"
                        wrapperClassName="w-100"
                    />
                </div>
            </div>
            <button onClick={handleAddBook} className="btn btn-primary col-md-3 mb-3">Add</button>
        </div>
    );
};

export default AddBook;
