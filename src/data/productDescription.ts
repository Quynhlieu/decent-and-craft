import {ProductDescription} from "../interfaces/IProductDescription.ts";
import avatar from "../assets/react.svg"

export const productDescription: ProductDescription[] = [
    {
        productId: 1,
        title: "Mô tả",
        descriptions: [
            "Sáp Thơm 100% Tinh Dầu Thiên Nhiên được tạo ra với tinh thần tôn trọng và đề cao vẻ đẹp giản dị của thiên nhiên.",
            "Thành phần: Sáp ong chất lượng cao và tinh dầu thiên nhiên cao cấp.",
            "Hương thơm nhẹ nhàng, tự nhiên Elayne chỉ sử dụng 100% tinh dầu tự nhiên nguyên chất vào sản phẩm này.",
            "Cam kết không sử dụng thêm các chất để làm tăng cường độ tỏa hương.",
        ]
    },
    {
        productId: 1,
        title: "Thông tin bổ sung",
        descriptions: [
            "hello1", "hello2", "hello 3"
        ]
    },
    {
        productId: 1,
        title: "Đánh giá sản phẩm",
        descriptions: [
            {
                avatar:"https://i.pravatar.cc/150?u=a042581f4e29026704d",
                fullName: "Dư Ban Teo",
                rating: 5,
                contents: "Sản phẩm này rất tốt!",
                created_at: "06/02/2024",
            },
            {
                avatar:"https://i.pravatar.cc/150?u=a042581f4e29026714d",
                fullName: "Diễm Quỳnh",
                rating: 5,
                contents: "Sáp Thơm 100% Tinh Dầu Thiên Nhiên được tạo ra với tinh thần tôn trọng và đề cao vẻ đẹp giản dị của thiên nhiên.!",
                created_at: "07/02/2024",
            },
            {
                avatar:"https://i.pravatar.cc/150?u=a042581f4e29015704d",
                fullName: "Chúc Ngân",
                rating: 5,
                contents: "Giao hàng nhanh!",
                created_at: "08/02/2024",
            },
        ]
    },
]