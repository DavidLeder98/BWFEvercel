import axios from 'axios';
import { AuthorWithBooksDto } from './AuthorWithBooksDto';
import { AuthorListDto } from './AuthorListDto';
import { AuthorCreateDto } from './AuthorCreateDto';
import { AuthorEditDto } from './AuthorEditDto';
import { SortBy } from '../book/SortBy';

const API_URL = 'https://bookwyrmapi2.azurewebsites.net/api/author';

// get list of authors
export const getAuthors = async (searchTerm?: string): Promise<AuthorListDto[]> => {
    try {
        const response = await axios.get<AuthorListDto[]>(`${API_URL}`, {
            params: { searchTerm }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching authors:', error);
        throw error;
    }
};

// get author by id
export const getAuthorById  = async (id: number, sortBy: SortBy = SortBy.Id): Promise<AuthorWithBooksDto> => {
    try {
        const response = await axios.get<AuthorWithBooksDto>(`${API_URL}/${id}`, {
            params: { sortBy },
        });
        return response.data; // Return the category with its associated books
    } catch (error) {
        console.error(`Error fetching category by id (${id}):`, error);
        throw error; // Rethrow the error for further handling
    }
};

// create a new author
export const createAuthor = async (authorCreateDto: AuthorCreateDto): Promise<AuthorListDto> => {
    try {
        const response = await axios.post<AuthorListDto>(API_URL, authorCreateDto);
        return response.data; // Return the newly created author
    } catch (error) {
        console.error('Error creating author:', error);
        throw error; // Rethrow the error for further handling
    }
};

// update an existing author
export const updateAuthor = async (id: number, authorEditDto: AuthorEditDto): Promise<void> => {
    try {
        await axios.put(`${API_URL}/${id}`, authorEditDto);
    } catch (error) {
        console.error(`Error updating author with id (${id}):`, error);
        throw error;
    }
};

// delete an author
export const deleteAuthor = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error(`Error deleting author with id (${id}):`, error);
        throw error;
    }
};
