export interface BookUpdateDto {
    id: number;
    Title: string;
    Description: string;
    Rating: number;
    BestSeller: boolean;
    ListPrice: number;
    Price: number;
    ImageFile: File | null;
    LargeImageFile: File | null;
    AuthorId: number;
    CategoryIds: number[];
  }