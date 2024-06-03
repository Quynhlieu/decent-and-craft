export interface ProductDescription {
    productId: number,
    title: string,
    descriptions: (string | IReview)[],
}

export interface IReview {
    avatar: string;
    fullName: string;
    rating: number;
    contents: string;
    created_at: string;
}
