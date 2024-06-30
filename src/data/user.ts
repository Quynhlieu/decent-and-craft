import IUser from "../interfaces/IUser.ts";
import { address } from "./address.ts";

const [address_1, address_2, address_3,address_4, address_5, address_6 ] = address;

const users: IUser[] = [
    {
        id: 1,
        fullName: "Dư Thành Minh",
        email: "minh@gmail.com",
        password: "123",
        phone: "0123 456 789",
        sex: "Nam",
        address: [address_1],
    },
    {
        id: 2,
        fullName: "Nguyễn Thị Chúc Ngân",
        email: "ngan@gmail.com",
        password: "123",
        phone: "0987 654 321",
        sex: "Nữ",
        address: [address_2],
    },
    {
        id: 3,
        fullName: "Liêu Thị Diễm",
        email: "quynh@gmail.com",
        password: "password789",
        phone: "0123 987 654",
        sex: "Nam",
        address: [address_3],
    },
    {
        id: 4,
        fullName: "Trần Văn An",
        email: "an@gmail.com",
        password: "anpassword123",
        phone: "0901 234 567",
        sex: "Nam",
        address: [address_4],
    },
    {
        id: 5,
        fullName: "Phạm Thị Hoa",
        email: "hoa@gmail.com",
        password: "hoapassword456",
        phone: "0902 345 678",
        sex: "Nữ",
        address: [address_5],
    },
    {
        id: 6,
        fullName: "Lê Minh Quang",
        email: "quang@gmail.com",
        password: "quangpassword789",
        phone: "0903 456 789",
        sex: "Nam",
        address: [address_6],
    }
];

export default users;
