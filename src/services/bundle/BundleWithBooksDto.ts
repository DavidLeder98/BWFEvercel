import { BookCardDto } from "../book/BookCardDto";

export interface BundleWithBooksDto {
    id: number;
    name: string;
    books: BookCardDto[];
}