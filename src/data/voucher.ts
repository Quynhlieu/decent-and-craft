import Voucher from "../interfaces/IVoucher.ts";

const voucher: Voucher[] = [
    {
        id: 1,
        code: 'DISCOUNT20',
        discount: 20,
        expirationDate: new Date('2024-12-31'),
        isActive: true,
    },
    {
        id: 2,
        code: 'SUMMER50',
        discount: 50,
        expirationDate: new Date('2024-08-31'),
        isActive: true,
    },
    {
        id: 3,
        code: 'NEWYEAR10',
        discount: 10,
        expirationDate: new Date('2025-01-01'),
        isActive: false,
    },
]

export default voucher;