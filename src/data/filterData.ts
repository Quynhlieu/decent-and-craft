export const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};
export const priceRangeFilter = [
    {
        id: 0,
        name: "Khoảng giá",
        priceRange: {
            from: 0,
            to: null
        }
    },
    {
        id: 1,
        name: `Từ ${formatCurrency(0)} đến ${formatCurrency(50000)}`,
        priceRange: {
            from: 0,
            to: 50000
        }
    },
    {
        id: 2,
        name: `Từ ${formatCurrency(50000)} đến ${formatCurrency(100000)}`,
        priceRange: {
            from: 50000,
            to: 100000
        }
    },
    {
        id: 3,
        name: `Từ ${formatCurrency(100000)} đến ${formatCurrency(200000)}`,
        priceRange: {
            from: 100000,
            to: 200000
        }
    },
    {
        id: 4,
        name: `Trên ${formatCurrency(200000)}`,
        priceRange: {
            from: 200000,
            to: null
        }
    },
    {
        id: 5,
        name: "Khác",
        priceRange: {
            from: null,
            to: null
        }
    },
]
export const relateFilters = [
    {
        id: 0,
        name: "Liên quan"
    },
    {
        id: 1,
        name: "Mới nhất"
    },
    {
        id: 2,
        name: "Bán chạy nhất"
    },
]
export const priceFilters = [
    {
        id: 0,
        name: "Giá: Thấp đến cao"
    },
    {
        id: 1,
        name: "Giá: Cao đến thấp"
    },
]
