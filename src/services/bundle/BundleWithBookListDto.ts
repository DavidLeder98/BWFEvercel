import { BookListDto } from "../book/BookListDto";

export interface BundleWithBookListDto {
    id: number;
    name: string;
    books: BookListDto[];
}