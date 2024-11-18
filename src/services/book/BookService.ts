import axios from 'axios';
import { BookListDto } from './BookListDto';
import { BookDetailsDto } from './BookDetailsDto';
import { BookCardDto } from './BookCardDto';
import { BookCreateDto } from './BookCreateDto';
import { BookUpdateDto } from './BookUpdateDto';
import { SortBy } from './SortBy';

const API_URL = 'https://bookwyrmapi2.azurewebsites.net/api/book';

// quick search
export const getBookList = async (searchTerm?: string): Promise<BookListDto[]> => {
    try {
        const response = await axios.get<BookListDto[]>(`${API_URL}/search`, {
            params: { searchTerm }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching book list", error);
        throw error;
    }
};

// advanced search + all books page
export const getBooks = async (searchTerm?: string, sortBy: SortBy = SortBy.Id): Promise<BookCardDto[]> => {
    try {
        const response = await axios.get<BookCardDto[]>(`${API_URL}/allbooks`, {
            params: {
                searchTerm,
                sortBy
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw error; // Rethrows the error to handle it later in the component
    }
};

// for details page
export const getBookById = async (id: number): Promise<BookDetailsDto> => {
    try {
        const response = await axios.get<BookDetailsDto>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        throw error;
    }
};

export const createBook = async (bookData: BookCreateDto): Promise<BookDetailsDto> => {
    const formData = new FormData();
    
    // Appends book details to form data
    formData.append('Title', bookData.Title);
    formData.append('Description', bookData.Description);
    formData.append('Rating', bookData.Rating.toString());
    formData.append('BestSeller', bookData.BestSeller.toString());
    formData.append('ListPrice', bookData.ListPrice.toString());
    formData.append('Price', bookData.Price.toString());
    formData.append('AuthorId', bookData.AuthorId.toString());

    // Appends category IDs
    bookData.CategoryIds.forEach((categoryId) => {
        formData.append('CategoryIds', categoryId.toString());
    });

    // Appends image files if they exist
    if (bookData.ImageFile) {
        formData.append('ImageFile', bookData.ImageFile);
    }
    if (bookData.LargeImageFile) {
        formData.append('LargeImageFile', bookData.LargeImageFile);
    }

    // Makes the POST request to create a book
    const response = await axios.post<BookDetailsDto>(API_URL, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    return response.data;
};

export const updateBook = async (bookData: BookUpdateDto) => {
    const formData = new FormData();
    
    // Appends all necessary fields to the formData object
    formData.append('Id', bookData.id.toString());
    formData.append('Title', bookData.Title);
    formData.append('Description', bookData.Description);
    formData.append('Rating', bookData.Rating.toString());
    formData.append('BestSeller', bookData.BestSeller.toString());
    formData.append('ListPrice', bookData.ListPrice.toString());
    formData.append('Price', bookData.Price.toString());
    formData.append('AuthorId', bookData.AuthorId.toString());
    
    // Appends image files if they exist
    if (bookData.ImageFile) {
      formData.append('ImageFile', bookData.ImageFile);
    }
    
    if (bookData.LargeImageFile) {
      formData.append('LargeImageFile', bookData.LargeImageFile);
    }
  
    // Appends category IDs without index
    bookData.CategoryIds.forEach((categoryId) => {
      formData.append('CategoryIds', categoryId.toString());
    });
  
    try {
      const response = await axios.put(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for form data
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating book:", error);
      throw error;
    }
  };

export const deleteBook = async (id: number): Promise<BookDetailsDto> => {
    try {
        const response = await axios.delete<BookDetailsDto>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting book:", error);
        throw error;
    }
};