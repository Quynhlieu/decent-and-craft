import { ImageList, ProductBlog } from "../features/productDetail/productDetailSlice";
import { CategoryList } from "./CategoryList";
import { Product } from "./Product";

export interface IProductDetail {
    id: number;
    product: Product;
    imageList: ImageList[];
    categoryList: CategoryList[];
    productBlog: ProductBlog;
    averageRating: number;
}
