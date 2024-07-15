/* eslint-disable react-hooks/exhaustive-deps */
import {
    Box, Button,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel, MenuItem, Pagination, Rating, Select,
    SelectChangeEvent,
    Stack, ToggleButton, ToggleButtonGroup,
    Typography
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import React, { FormEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllCategoryQuery } from "../api/categoryApi.ts";
import { useGetProductFiltersQuery } from "../api/productApi.ts";
import { RootState } from "../app/store.ts";
import BreadcrumbHeader from "../components/ProductDetail/BreadcrumbHeader.tsx";
import ProductList from "../components/ProductList.tsx";
import { priceFilters, relateFilters, priceRangeFilter } from "../data/filterData.ts";
import { defaultInitial, FilterItem, PriceRange, resetFilter, updateCategories, updatePage } from "../features/filter/filterSlice.ts";
import BlogCategory from "../interfaces/IBlogCategory.ts";
import { LineIcon } from "./ProductDetail.tsx";
import { PageIml } from "../interfaces/PageIml.ts";

const Title = (prop: { title: string }) => {
    const title = prop.title;
    const baseSx = {
        fontWeight: "bold",
        fontSize: "14px",
    }

    return (
        <Box my={3}>
            <Typography style={baseSx}>
                {title}
            </Typography>
            <LineIcon />
        </Box>
    )
}
const CheckBoxGroup = (prop: { onChangeFilter: FormEventHandler<HTMLDivElement>, allCategory: BlogCategory[], filterCategory: BlogCategory[] }) => {
    const { allCategory, filterCategory, onChangeFilter } = prop;
    const dispatch = useDispatch();

    const handleCheckboxChange = (id: number, name: string) => {
        const isExist = filterCategory.some(c => c.id === id);
        let newCheckedCategories;
        if (!isExist) {
            newCheckedCategories = [...filterCategory, { id, name }];
        } else {
            newCheckedCategories = filterCategory.filter(c => c.id !== id);
        }
        dispatch(updateCategories(newCheckedCategories));
    };

    return (
        <FormGroup onChange={onChangeFilter}>
            {allCategory.map((item) => {
                const isChecked = filterCategory.some(category => category.id === item.id);
                return (
                    <FormControlLabel
                        key={item.id}
                        control={
                            <Checkbox
                                checked={isChecked}
                                onChange={() => handleCheckboxChange(item.id, item.name)}
                            />
                        }
                        label={item.name}
                    />
                );
            })}
        </FormGroup>
    );
};

const SelectGroup = (props: { id: string, filters: FilterItem[] }) => {
    const { id, filters } = props;
    const [selected, setSelected] = React.useState<string | null>(null);

    const handleSelectedChange = (event: SelectChangeEvent<{ value: unknown }>) => {
        setSelected(event.target.value as string);
    }
    const mainLabel = filters[0].name;
    return (
        <FormControl fullWidth size="small">
            <InputLabel id={`${id}-select-label`}>{mainLabel}</InputLabel>
            <Select
                labelId={`${id}-select-label`}
                label={mainLabel}
                id={`${id}-select`}
                value={selected}
                onChange={handleSelectedChange}
            >
                {filters.map(filter => (
                    <MenuItem key={filter.name} value={filter.name}>
                        {filter.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
const RatingItem = (prop: { value: number }) => {
    const { value } = prop;
    return (
        <ToggleButton size="small" value={value}><Rating name="read-only" value={value} readOnly /></ToggleButton>
    );
}
const RatingFilter = () => {

    return (
        <ToggleButtonGroup>
            <Stack direction="column" spacing={1}>
                {Array.from({ length: 5 }, (_, i) => 5 - i).map(value => (
                    <RatingItem key={value} value={value} />
                ))}
            </Stack>
        </ToggleButtonGroup>

    )
}

const SearchPage = () => {
    const resultText = {
        display: "flex",
        alignItems: "center",
        justifyContent: "end"
    }
    let result: PageIml | undefined = undefined;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filterState = useSelector((state: RootState) => state.filter);

    // Xử lý sự kiện cho range price
    const [priceRange, setRangePrice] = useState< PriceRange >({
        from: null, to: null
    });
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const numericValue = value.replace(/[^0-9]/g, '');
        console.log(name, " check: ", numericValue);
        if (numericValue === '') {
            console.log("OK")
        }

        setRangePrice((prevState) => ({
            ...prevState,
            [name]: numericValue,
        }));
    };

    // Xử lý sự kiện cho categories
    const { data: categoryData } = useGetAllCategoryQuery();

    // Cập nhật categories vào slice
    useEffect(() => {
        if (filterState.categories) {
            dispatch(updatePage(0));
        }
    }, [filterState.categories, dispatch]);

    // Lấy dữ liệu sản phẩm theo category list
    const { data, isLoading: filterCategory } = useGetProductFiltersQuery(filterState);
    result = data
    const onChangeFilter = async () => {
        if (filterState.categories) {
            await filterCategory;
        } else if (filterState.page) {
            await filterCategory
        } else if(filterState.priceRange){
            await filterCategory
        }
    }
    const handlePageChange = (event, value) => {
        dispatch(updatePage(value - 1)); // Trang trong Pagination bắt đầu từ 1, nhưng API thường bắt đầu từ 0
    };

    // Cập nhật URL với categoryParams
    useEffect(() => {
        const categoryParams = filterState.categories && filterState.categories.map(c => `categoryId=${c.id}`).join('&');
        navigate(`/search/filter?${categoryParams}&minPrice=${filterState.priceRange?.from}&maxPrice=${filterState.priceRange?.to}&page=${filterState.page + 1}`);
    }, [filterState.categories, filterState.page, filterState.priceRange, navigate]);

    const productList = result?.content;
    const page = result?.page;

    

    return (
        <Grid container spacing={5}>
            <Grid item xs={9}>
                <Stack direction="row" spacing="auto" alignItems="center">
                    <BreadcrumbHeader />
                    <Typography sx={resultText}>{`Hiển thị ${page && page?.number * page.size + 1}-${page && (page?.size * (page?.number + 1)) <= page.totalElements ? (page?.size * (page?.number + 1)) : page?.totalElements} của ${page?.totalElements} kết quả`}</Typography>
                </Stack>
                <ProductList products={productList} />
                <Box display="flex" justifyContent="center" mt={2}>
                    <Pagination
                        count={page?.totalPages}
                        variant="outlined"
                        shape="rounded"
                        page={filterState.page + 1}
                        onChange={handlePageChange}
                        sx={{ mt: 2 }}
                    />
                </Box>
            </Grid>
            <Grid item container xs={3} spacing={2} direction="column" paddingLeft={5}>
                <Grid item>
                    <Typography>BỘ LỌC TÌM KIẾM</Typography>
                </Grid>
                {/* Sap xep theo thoi gian va gia*/}
                <Grid item>
                    <Stack spacing={2} direction="column">
                        <Title title={"SẮP XẾP THEO"} />
                        <SelectGroup id="relate" filters={relateFilters} />
                        <SelectGroup id="priceSort" filters={priceFilters} />
                    </Stack>
                </Grid>
                {/*Danh muc*/}
                <Grid item>
                    <Title title={"THEO DANH MỤC"} />
                    {categoryData && filterState.categories && <CheckBoxGroup onChangeFilter={onChangeFilter} allCategory={categoryData} filterCategory={filterState.categories} />}
                </Grid>
                {/* Khoang gia*/}
                <Grid item>
                    <Title title={"THEO GIÁ"} />
                    {/* <Stack direction="row" alignItems="center" mb={2}>
                        <TextField name="from" sx={{ paddingX: 1 }} size="small" onChange={handleInputChange}
                            value={priceRange.from}
                            inputProps={{ pattern: '/[0-9]/', type: 'text', inputMode: 'numeric' }}
                            placeholder="TỪ" />
                        <Typography sx={{ color: "grey[500]" }}>-</Typography>
                        <TextField name="to" sx={{ paddingX: 1 }} size="small" onChange={handleInputChange} value={priceRange.to}
                            placeholder="ĐẾN"
                            inputProps={{ pattern: '/[0-9]/', type: 'text', inputMode: 'numeric' }} />
                    </Stack>
                        <Button variant="contained" fullWidth onClick={() => dispatch(updatePriceRange(priceRange))}>Áp dụng</Button> */}
                        <SelectGroup id="priceRange" filters={priceRangeFilter}/>
                </Grid>
                <Grid item>
                    <Title title={"ĐÁNH GIÁ"} />
                    <Stack direction="row" alignItems="center">
                        <RatingFilter />
                    </Stack>
                </Grid>
                <Grid item >
                    <Button variant="contained" fullWidth onClick={() => dispatch(resetFilter(defaultInitial))}>Xóa tất cả</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default SearchPage;