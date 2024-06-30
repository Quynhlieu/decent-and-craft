export default interface Address{
    id: number;
    province: string;
    district: string;
    ward: string;
    description?:string;
    isDefault: boolean
}