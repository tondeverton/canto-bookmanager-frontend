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
        <div>
            <h2>Add Book</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <DatePicker
                placeholderText="Published Date"
                selected={publishedDate}
                showYearDropdown={true}
                dropdownMode="select"
                onChange={(date) => setPublishedDate(date)}
                minDate={new Date(1970, 0, 1)}
                maxDate={new Date()}
                dateFormat="yyyy-MM-dd"
            />
            <button onClick={handleAddBook}>Add</button>
        </div>
    );
};

export default AddBook;
