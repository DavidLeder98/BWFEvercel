import axios from 'axios';
import { CategoryListDto } from './CategoryListDto';
import { CategoryWithBooksDto } from './CategoryWithBooksDto';
import { CategoryCreateDto } from './CategoryCreateDto';
import { CategoryEditDto } from './CategoryEditDto';
import { SortBy } from '../book/SortBy';

const API_URL = 'https://bookwyrmapi2.azurewebsites.net/api/category';

// get all categories
export const getAllCategories = async (): Promise<CategoryListDto[]> => {
    try {
        const response = await axios.get<CategoryListDto[]>(API_URL);
        return response.data; // Return the array of categories
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error; // Rethrow the error for further handling
    }
};

// get category by id
export const getCategoryById = async (id: number, sortBy: SortBy = SortBy.Id): Promise<CategoryWithBooksDto> => {
    try {
        const response = await axios.get<CategoryWithBooksDto>(`${API_URL}/${id}`, {
            params: { sortBy },
        });
        return response.data; // Return the category with its associated books
    } catch (error) {
        console.error(`Error fetching category by id (${id}):`, error);
        throw error; // Rethrow the error for further handling
    }
};

// Create a new category
export const createCategory = async (categoryCreateDto: CategoryCreateDto): Promise<CategoryListDto> => {
    try {
        const response = await axios.post<CategoryListDto>(API_URL, categoryCreateDto);
        return response.data; // Return the newly created category
    } catch (error) {
        console.error('Error creating category:', error);
        throw error; // Rethrow the error for further handling
    }
};

// Update an existing category
export const updateCategory = async (id: number, categoryEditDto: CategoryEditDto): Promise<void> => {
    try {
        await axios.put(`${API_URL}/${id}`, categoryEditDto); // Make the PUT request
    } catch (error) {
        console.error(`Error updating category (${id}):`, error);
        throw error; // Rethrow the error for further handling
    }
};

// DELETE an existing category
export const deleteCategory = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/${id}`); // Make the DELETE request
    } catch (error) {
        console.error(`Error deleting category (${id}):`, error);
        throw error; // Rethrow the error for further handling
    }
};