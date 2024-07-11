
export enum UserStatus {
    HOAT_DONG = 'HOAT_DONG',
    BI_KHOA = 'BI_KHOA',
}

export default interface IUser {
    id: number;
    fullName: string;
    email: string;
    password: string;
    phone?: string;
    status: UserStatus;
}