import BlogCategory from "./IBlogCategory";

export default interface Blog {
    id: number;
    title: string,
    date: string,
    categories?: BlogCategory[]
    thumb?: string,
    author?: string,
    content?: string,
    header?: string,
}