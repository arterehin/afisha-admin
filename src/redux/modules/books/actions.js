import apiService from "@services/apiService";
import { actions } from "./ui";

const {
  getBooksRequest,
  getBooksSuccess,
  getBooksError,
  postBooksRequest,
  postBooksSuccess,
  postBooksError,
  putBooksRequest,
  putBooksSuccess,
  putBooksError,
  deleteBooksRequest,
  deleteBooksSuccess,
  deleteBooksError
} = actions;

export function getBooks() {
  return async (dispatch) => {
    try {
      dispatch(getBooksRequest());
      const response = await apiService.get("api/books?page=1");
      dispatch(getBooksSuccess(response));
    } catch (error) {
      dispatch(getBooksError(error));
      throw error;
    }
  };
}

export function postBooks(book) {
  return async (dispatch) => {
    try {
      dispatch(postBooksRequest());
      const { data } = await apiService.post("api/books", book);
      dispatch(postBooksSuccess({
        data,
        messages: [{
          message: "add.toast.success"
        }]
      }));
    } catch (error) {
      dispatch(postBooksError(error));
      throw error;
    }
  };
}

export function putBooks(book) {
  return async (dispatch) => {
    const { "@id": id } = book;
    try {
      dispatch(putBooksRequest());
      const { data } = await apiService.put(id, book);
      dispatch(putBooksSuccess({
        data,
        messages: [{
          message: "edit.toast.success"
        }]
      }));
    } catch (error) {
      dispatch(putBooksError(error));
      throw error;
    }
  };
}

export function deleteBooks(book) {
  return async (dispatch) => {
    const { "@id": id } = book;
    try {
      dispatch(deleteBooksRequest());
      await apiService.delete(id, book);
      dispatch(deleteBooksSuccess({
        data: book,
        messages: [{
          message: "delete.toast.success"
        }]
      }));
    } catch (error) {
      dispatch(deleteBooksError(error));
      throw error;
    }
  };
}