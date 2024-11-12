import { BookCardDto } from "../book/BookCardDto";

export interface CategoryWithBooksDto {
    id: number;
    name: string;
    books: BookCardDto[];
}