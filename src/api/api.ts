import {Book} from '../features/bookReducer';

const GRAPHQL_URL = 'http://localhost:8080/graphql';

export const fetchBooks = async (): Promise<Book[]> => {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            query: `{
        findAllBooks {
          id
          title
          author
          publishedDate
        }
      }`,
        }),
    });

    const {data} = await response.json();
    return data.findAllBooks;
};

export const fetchBookById = async (id: number): Promise<Book> => {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            query: `{
        findBookById {
          id
          title
          author
          publishedDate
        }
      }`,
            variables: {id: id},
        }),
    });

    const {data} = await response.json();
    return data.findBookById;
};

export const fetchBookByPublishedDateRange = async (from: Date, to: Date): Promise<Book[]> => {
    const fromAsISODate = from.toISOString().split('T')[0];
    const toAsISODate = to?.toISOString().split('T')[0];

    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            query: `query($from: String!, $to: String) {
        findBooksByPublishedDateRange(from: $from, to: $to) {
          id
          title
          author
          publishedDate
        }
      }`,
            variables: {from: fromAsISODate, to: toAsISODate},
        }),
    });

    const {data} = await response.json();
    return data.findBooksByPublishedDateRange;
};

export const createBook = async (book: Omit<Book, 'id'>): Promise<Book> => {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            query: `mutation($title: String!, $author: String!, $publishedDate: String!) {
        createBook(title: $title, author: $author, publishedDate: $publishedDate) {
          id
          title
          author
          publishedDate
        }
      }`,
            variables: book,
        }),
    });

    const {data} = await response.json();
    return data.createBook;
};

export const deleteBook = async (id: number): Promise<number> => {
    const response = await fetch(GRAPHQL_URL, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            query: `mutation($id: Int!) {
        deleteBook(id: $id)
      }`,
            variables: {id: id},
        }),
    });

    const {data} = await response.json();
    return data.deleteBook;
};
