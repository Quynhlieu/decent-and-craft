import {Customer} from "./Customer.ts";

export interface ProductDescription {
    title: string,
    descriptions: (string | IReview)[],
}

export interface IReview {
    customer: Customer;
    rating: number;
    contents: string;
    created_at: string;
}
export interface Image{
    id: number;
    src: string;
}
