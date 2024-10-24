import React from 'react';
import {render, screen} from '@testing-library/react';
import App from '../App';
import bookReducer from "../features/bookReducer";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";

test('renders learn react link', () => {
    const store = configureStore({
        reducer: {
            books: bookReducer
        },
    });

    render(
        <Provider store={store}>
            <App/>
        </Provider>
    );
    const linkElement = screen.getByText(/Book Management/i);
    expect(linkElement).toBeInTheDocument();
});
