export interface Book {
  id: string; // Using string for ID, typical for UUIDs in real DBs
  title: string;
  author: string;
  publishedYear: number;
}