import { BookCardDto } from "../book/BookCardDto";

export interface AuthorWithBooksDto {
    id: number;
    name: string;
    description: string;
    books: BookCardDto[];
}