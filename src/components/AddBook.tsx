import React, {useState} from 'react';
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

    const handleAddBook = async () => {
        const publishedDateAsISODateString = getISODateFromDate(publishedDate!);
        const newBook = await createBook({title, author, publishedDate: publishedDateAsISODateString});
        dispatch(addBook(newBook));
        setTitle('');
        setAuthor('');
        setPublishedDate(null);
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Add Book</h2>
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
