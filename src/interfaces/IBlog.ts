import BlogCategory from "./IBlogCategory";

export default interface Blog {
    id: number;
    title: string,
    createdDate: string,
    categories?: BlogCategory[]
    thumbnail?: string,
    author?: string,
    content?: string,
    header?: string,
}