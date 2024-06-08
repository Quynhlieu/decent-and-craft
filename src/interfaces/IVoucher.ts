export default interface Voucher{
    id: number;
    code: string;
    discount: number;
    expirationDate: Date;
    isActive: boolean;
}