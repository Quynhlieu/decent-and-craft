import {Customer} from "../interfaces/Customer.ts";
import {IProductDetail} from "../features/productDetail/productDetailSlice.ts";

export const productDetails: IProductDetail[] = [
    {
        id: 1,
        name: "Set Qua Protrail 113",
        price: 950000,
        thumb: "https://fairycorner.vn/wp-content/uploads/2022/02/MG_9303-300x300.jpg",
        discount: 0.2,
        images: [
            {
                id: 1,
                src: "https://fairycorner.vn/wp-content/uploads/2022/02/MG_9303-300x300.jpg",
            }
        ],
        overview: "Giới thiệu sản phẩm",
        reviewList: [
            {
                customer: {
                    id: 1,
                    fullName: "Du Ban Teo"
                },
                rating: 5,
                contents: "Sản phẩm này rất tốt!",
                created_at: "06/02/2024",
            },
            {
                customer: {
                    id: 2,
                    fullName: "Lieu Thi Diem Quynh"
                },
                rating: 5,
                contents: "Sáp Thơm 100% Tinh Dầu Thiên Nhiên được tạo ra với tinh thần tôn trọng và đề cao vẻ đẹp giản dị của thiên nhiên.!",
                created_at: "07/02/2024",
            },
            {
                customer: {
                    id: 3,
                    fullName: "Nguyen Thi Chuc Ngan"
                },
                rating: 5,
                contents: "Giao hàng nhanh!",
                created_at: "08/02/2024",
            },
        ],
        productDescriptions: "Sáp Thơm 100% Tinh Dầu Thiên Nhiên được tạo ra với tinh thần tôn trọng và đề cao vẻ đẹp giản dị của thiên nhiên. "+
            "Thành phần: Sáp ong chất lượng cao và tinh dầu thiên nhiên cao cấp. "+
            "Hương thơm nhẹ nhàng, tự nhiên Elayne chỉ sử dụng 100% tinh dầu tự nhiên nguyên chất vào sản phẩm này. "+
            "Cam kết không sử dụng thêm các chất để làm tăng cường độ tỏa hương. "
    },
    {
        id: 2,
        name: "Set Qua Protrail Sieu cap vip pro",
        price: 555555,
        thumb: "https://fairycorner.vn/wp-content/uploads/2022/02/MG_9303-300x300.jpg",
        discount: 0.2,
        images: [
            {
                id: 1,
                src: "https://fairycorner.vn/wp-content/uploads/2022/02/MG_9303-300x300.jpg",
            }
        ],
        overview: "Giới thiệu sản phẩm",
        reviewList: [
            {
                customer: {
                    id: 1,
                    fullName: "Du Ban Teo"
                },
                rating: 5,
                contents: "Sản phẩm này rất tốt!",
                created_at: "06/02/2024",
            },
            {
                customer: {
                    id: 2,
                    fullName: "Lieu Thi Diem Quynh"
                },
                rating: 5,
                contents: "Sáp Thơm 100% Tinh Dầu Thiên Nhiên được tạo ra với tinh thần tôn trọng và đề cao vẻ đẹp giản dị của thiên nhiên.!",
                created_at: "07/02/2024",
            },
            {
                customer: {
                    id: 3,
                    fullName: "Nguyen Thi Chuc Ngan"
                },
                rating: 5,
                contents: "Giao hàng nhanh!",
                created_at: "08/02/2024",
            },
        ],
        productDescriptions: "Sáp Thơm 100% Tinh Dầu Thiên Nhiên được tạo ra với tinh thần tôn trọng và đề cao vẻ đẹp giản dị của thiên nhiên. "+
        "Thành phần: Sáp ong chất lượng cao và tinh dầu thiên nhiên cao cấp. "+
        "Hương thơm nhẹ nhàng, tự nhiên Elayne chỉ sử dụng 100% tinh dầu tự nhiên nguyên chất vào sản phẩm này. "+
        "Cam kết không sử dụng thêm các chất để làm tăng cường độ tỏa hương. "
    },
]

// Danh sách khách hàng
export const customers: Customer[] = [
    {
        id: 1,
        fullName: "Du Ban Teo"
    },
    {
        id: 2,
        fullName: "Lieu Thi Diem Quynh"
    },
    {
        id: 3,
        fullName: "Nguyen Thi Chuc Ngan"
    },
    {
        id: 4,
        fullName: "Lai Thi Bich Phuong"
    },

]

export const findCustomerById = (id: number) => {
    return customers.find(i => i.id === id);
}