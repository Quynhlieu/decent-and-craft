import {
    Box, Button,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel, MenuItem, Pagination, Rating, Select,
    SelectChangeEvent,
    Stack, TextField, ToggleButton, ToggleButtonGroup,
    Typography
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import React, { ChangeEvent, FormEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllCategoryQuery } from "../api/categoryApi.ts";
import { useGetProductFiltersQuery } from "../api/productApi.ts";
import { RootState } from "../app/store.ts";
import BreadcrumbHeader from "../components/ProductDetail/BreadcrumbHeader.tsx";
import ProductList from "../components/ProductList.tsx";
import { priceFilters, priceRangeFilter, relateFilters } from "../data/filterData.ts";
import { defaultInitial, FilterItem, PriceRange, resetFilter, updateCategories, updatePage, updatePriceRange, updatePriceSort, updateRating, updateRelate } from "../features/filter/filterSlice.ts";
import BlogCategory from "../interfaces/IBlogCategory.ts";
import { PageIml } from "../interfaces/PageIml.ts";
import { LineIcon } from "./ProductDetail.tsx";
// eslint-disable-next-line react-hooks/rules-of-hooks
// const filterState = useSelector((state: RootState) => state.filter);

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

const SelectGroup = (props: { id: string, filters: FilterItem[], showPricebox?: (show: boolean) => void }) => {
    const { id, filters, showPricebox } = props;
    const [selected, setSelected] = React.useState<string | null>(null);
    const dispatch = useDispatch();

    const handleSelectedChange = (event: SelectChangeEvent<string>) => {
        const selectedId = event.target.value;
        setSelected(selectedId);
        (showPricebox && showPricebox(false));
        if (showPricebox && selectedId == "5" && id === "priceRange") {
            showPricebox(true);
            const selectedFilter = filters.find(filter => filter.id === Number(selectedId));
            const filter: PriceRange | undefined = selectedFilter?.priceRange;
            filter && dispatch(updatePriceRange(filter));
        }
        if (id === "relate") {// Sap xep: moi nhat, ban chay nhat
            const relateType = filters.find(r => r.id === Number(event.target.value));
            relateType && dispatch(updateRelate(relateType));
        }
        if (id === "priceSort") {// Sap xep: Thap den cao, cao den thap
            const priceSort = filters.find(r => r.id === Number(event.target.value));
            priceSort && dispatch(updatePriceSort(priceSort));
        }

    };

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
                    <MenuItem key={filter.id} value={filter.id.toString()}>
                        {filter.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
const RatingItem = (prop: { value: number }) => {
    const { value } = prop;
    return (
        <ToggleButton size="small" value={value.toString()}>
            <Rating name="read-only" value={value} readOnly />
        </ToggleButton>
    );
}

const RatingFilter = () => {
    const [selectedValue, setSelectedValue] = useState<string | null>("all");
    const dispatch = useDispatch();

    const handleToggle = (event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
        if (newValue !== null) {
            setSelectedValue(newValue);
            dispatch(updateRating(newValue));
            console.log("Update rating toggle button: " + newValue);
        } else {
            setSelectedValue("all");
            dispatch(updateRating("all"));
            console.log("Update rating toggle button: all");
        }
    };

    return (
        <ToggleButtonGroup
            value={selectedValue}
            exclusive
            onChange={handleToggle}
        >
            <Stack direction="column" spacing={1}>
                {Array.from({ length: 5 }, (_, i) => 5 - i).map(value => (
                    <RatingItem key={value} value={value} />
                ))}
            </Stack>
        </ToggleButtonGroup>
    );
}

const SearchPage = () => {
    const resultText = {
        display: "flex",
        alignItems: "center",
        justifyContent: "end"
    };
    let result: PageIml | undefined = undefined;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filterState = useSelector((state: RootState) => state.filter);

    const [priceRange, setRangePrice] = useState<PriceRange>({
        from: null, to: null
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const numericValue = value.replace(/[^0-9]/g, '');

        setRangePrice((prevState) => ({
            ...prevState,
            [name]: numericValue,
        }));
    };

    const { data: categoryData } = useGetAllCategoryQuery();

    useEffect(() => {
        if (filterState.categories) {
            dispatch(updatePage(0));
        }
    }, [filterState.categories, dispatch]);

    const { data, isLoading: filterSearch } = useGetProductFiltersQuery(filterState);
    result = data;

    const handlePageChange = (event: ChangeEvent<unknown>, value: number) => {
        dispatch(updatePage(value - 1));
    };

    useEffect(() => {
        const categoryParams = filterState.categories && filterState.categories.map(c => `categoryId=${c.id}`).join('&');
        // navigate(`/search/filter?${categoryParams}&minPrice=${filterState.priceRange?.from}&maxPrice=${filterState.priceRange?.to}&page=${filterState.page + 1}`);
    }, [filterState.categories, filterState.page, filterState.priceRange, navigate]);

    const productList = result?.content;
    const page = result?.page;
    const [showInputPriceBox, setShowInputPriceBox] = useState<boolean>(false);

    const sortProductList = () => {
        let productListSort = productList;
        const relate = filterState.relate;
        const priceSort = filterState.priceSort;

        if (relate != null && relate.id === 1) {
            productListSort = productList && [...productList].sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
        } else if (relate != null && relate.id === 2) {
            productListSort = productList && [...productList].sort((a, b) => b.soldQuantity - a.soldQuantity);
        }

        if (priceSort != null && priceSort.id === 1) {
            productListSort = productList && [...productList].sort((a, b) => a.price - b.price);
        } else if (priceSort != null && priceSort.id === 2) {
            productListSort = productList && [...productList].sort((a, b) => b.price - a.price);
        }
        return productListSort;
    };

    const handleClearAll = () => {
        dispatch(resetFilter(defaultInitial));
    };

    useEffect(() => {
        // Trigger the API call whenever the filter state changes
        filterSearch;
    }, [filterState]);

    return (
        <Grid container spacing={5}>
            <Grid item xs={9}>
                <Stack direction="row" spacing="auto" alignItems="center">
                    <BreadcrumbHeader />
                    <Typography sx={resultText}>{page?.totalElements && page?.totalElements > 0 ? `Hiển thị ${page && page?.number * page.size + 1}-${page && (page?.size * (page?.number + 1)) <= page.totalElements ? (page?.size * (page?.number + 1)) : page?.totalElements} của ${page?.totalElements} kết quả`:``}</Typography>
                </Stack>
                {page?.totalElements === 0 ?
                    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" my={10}>
                        <img width={200} src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/search/a60759ad1dabe909c46a.png" />
                        <Typography>Không tìm thấy kết quả nào!</Typography>
                        <Typography variant="subtitle2">Hãy thử sử dụng các từ khóa chung chung hơn</Typography>
                    </Box>
                    :
                    <Box>
                        <ProductList isLoading={filterSearch} products={sortProductList()} />
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
                    </Box>
                }

            </Grid>
            <Grid item container xs={3} spacing={2} direction="column" paddingLeft={5}>
                <Grid item>
                    <Typography>BỘ LỌC TÌM KIẾM</Typography>
                </Grid>
                <Grid item>
                    <Stack spacing={2} direction="column">
                        <Title title={"SẮP XẾP THEO"} />
                        <SelectGroup id="relate" filters={relateFilters} />
                        <SelectGroup id="priceSort" filters={priceFilters} />
                    </Stack>
                </Grid>
                <Grid item>
                    <Title title={"THEO DANH MỤC"} />
                    {categoryData && filterState.categories && <CheckBoxGroup allCategory={categoryData.slice(0, 6)} filterCategory={filterState.categories} />}
                </Grid>
                <Grid item>
                    <Title title={"THEO GIÁ"} />
                    <SelectGroup id="priceRange" filters={priceRangeFilter} showPricebox={(show: boolean) => {
                        setShowInputPriceBox(show);
                    }} />
                    {showInputPriceBox &&
                        <Box mt={2}>
                            <Stack direction="row" alignItems="center" mb={2}>
                                <TextField name="from" sx={{ paddingX: 1 }} size="small" onChange={handleInputChange}
                                    value={priceRange.from}
                                    inputProps={{ pattern: '/[0-9]/', type: 'text', inputMode: 'numeric' }}
                                    placeholder="TỪ" />
                                <Typography sx={{ color: "grey[500]" }}>-</Typography>
                                <TextField name="to" sx={{ paddingX: 1 }} size="small" onChange={handleInputChange} value={priceRange.to}
                                    placeholder="ĐẾN"
                                    inputProps={{ pattern: '/[0-9]/', type: 'text', inputMode: 'numeric' }} />
                            </Stack>
                            <Button variant="contained" fullWidth onClick={() => dispatch(updatePriceRange(priceRange))}>Áp dụng</Button>
                        </Box>
                    }
                </Grid>
                <Grid item>
                    <Title title={"ĐÁNH GIÁ"} />
                    <Stack direction="row" alignItems="center">
                        <RatingFilter />
                    </Stack>
                </Grid>
                <Grid item>
                    <Button variant="contained" fullWidth onClick={handleClearAll}>
                        Xóa tất cả
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default SearchPage;