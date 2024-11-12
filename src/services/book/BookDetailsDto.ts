import { CategoryListDto } from "../category/CategoryListDto";

export interface BookDetailsDto {
    id: number;
    title: string;
    description: string;
    rating: number;
    bestSeller: boolean;
    listPrice: number;
    price: number;
    largeImageUrl: string;
    authorId: number;
    authorName: string;
    categories: CategoryListDto[];
}