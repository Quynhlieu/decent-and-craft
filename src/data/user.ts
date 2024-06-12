import IUser from "../interfaces/IUser.ts";
import { address } from "./address.ts";

const [address_1, address_2, address_3] = address;

const users: IUser[] = [
    {
        id: 1,
        fullName: "Nguyễn Văn A",
        email: "minh@gmail.com",
        password: "123",
        phone: "0123 456 789",
        sex: "Nam",
        address: [address_1],
    },
    {
        id: 2,
        fullName: "Nguyễn Thị B",
        email: "a@example.com",
        password: "password456",
        phone: "0987 654 321",
        sex: "Nữ",
        address: [address_2],
    },
    {
        id: 3,
        fullName: "Trần Văn C",
        email: "example3@example.com",
        password: "password789",
        phone: "0123 987 654",
        sex: "Nam",
        address: [address_3],
    }
];

export default users;
