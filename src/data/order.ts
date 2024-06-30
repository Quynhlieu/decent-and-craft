import Address from "../interfaces/IAddress.ts";
import Order from "../interfaces/IOrder.ts";
import carouse1 from "../assets/carousels/carousel1.jpg";

// Define sample data for Address and Order interfaces
const addresses: Address[] = [
    {
        id: 1,
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
    },
    {
        id: 2,
        street: "456 Elm St",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90001",
    },
];

const orders: Order[] = [
    {
        id: 1,
        status: 'Đang xử lý',
        orderDate: '2024-06-04',
        address: addresses[0], // Assigning address from the addresses array
        image: carouse1, // Assuming this is the image related to the order
    },
    {
        id: 2,
        status: 'Đã giao hàng',
        orderDate: '2024-06-02',
        address: addresses[1], // Assigning address from the addresses array
        image: carouse1, // Assuming this is the image related to the order
    },
];

export { addresses, orders };
