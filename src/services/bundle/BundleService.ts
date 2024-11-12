import axios from 'axios';
import { BundleWithBooksDto } from './BundleWithBooksDto';
import { BundleListDto } from './BundleListDto';
import { BundleWithBookListDto } from './BundleWithBookListDto';
import { BundleUpdateDto } from './BundleUpdateDto';

const API_URL = 'https://bookwyrmapi2.azurewebsites.net/api/bundle';

// Get a single bundle by ID
export const getBundle = async (id: number): Promise<BundleWithBooksDto> => {
    try {
        const response = await axios.get<BundleWithBooksDto>(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching bundle by ID:", error);
        throw error;
    }
};

// Get all bundles
export const getAllBundles = async (): Promise<BundleListDto[]> => {
    try {
        const response = await axios.get<BundleListDto[]>(API_URL); // Hits the /api/bundle endpoint
        return response.data;
    } catch (error) {
        console.error("Error fetching bundles list:", error);
        throw error;
    }
};

// Get a bundle with book list by ID for the admin panel
export const getBundleWithBookList = async (id: number): Promise<BundleWithBookListDto> => {
    try {
        const response = await axios.get<BundleWithBookListDto>(`${API_URL}/adminpanel/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching bundle with book list:", error);
        throw error;
    }
};

// Update a bundle
export const updateBundle = async (bundleUpdateDto: BundleUpdateDto): Promise<void> => {
    try {
        await axios.put(API_URL, bundleUpdateDto); // Hits the /api/bundle endpoint
    } catch (error) {
        console.error("Error updating bundle:", error);
        throw error;
    }
};