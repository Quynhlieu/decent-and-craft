import {
    Box, Button,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel, MenuItem, Rating, Select,
    SelectChangeEvent,
    Stack, TextField, ToggleButton, ToggleButtonGroup,
    Typography
} from "@mui/material";
import {hotProducts} from "../data/products";
import BreadcrumbHeader from "../components/ProductDetail/BreadcrumbHeader.tsx";
import {LineIcon} from "./ProductDetail.tsx";
import {categories, priceFilters, relateFilters} from "../data/filterData.ts"
import {FilterItem} from "../features/filter/filterSlice.ts";
import BlogCategory from "../interfaces/IBlogCategory.ts";
import FormControl from "@mui/material/FormControl";
import React, {useState} from "react";
import Checkbox from "@mui/material/Checkbox";
import ProductList from "../components/ProductList.tsx";

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
            <LineIcon/>
        </Box>
    )
}
const CheckBoxGroup = (prop: { itemList: (FilterItem | BlogCategory)[] }) => {
    const {itemList} = prop;
    return (
        <FormGroup>
            {itemList.map((item) => (
                <FormControlLabel key={item.id} control={<Checkbox/>} label={item.name}/>
            ))}
        </FormGroup>
    );
};
const SelectGroup = (props: { id: string, filters: FilterItem[] }) => {
    const {id, filters} = props;
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
    const {value} = prop;
    return (
        <ToggleButton size="small" value={value}><Rating name="read-only" value={value} readOnly/></ToggleButton>
    );
}
const RatingFilter = () => {

    return (
        <ToggleButtonGroup>
            <Stack direction="column" spacing={1}>
                {Array.from({length: 5}, (_, i) => 5 - i).map(value => (
                    <RatingItem key={value} value={value}/>
                ))}
            </Stack>
        </ToggleButtonGroup>

    )
}

export default function SearchPage() {
    const data = hotProducts;
    const resultText = {
        display: "flex",
        alignItems: "center",
        justifyContent: "end"
    }
    const productListStyle = {
        '.css-6kn84p-MuiGrid-root>.MuiGrid-item': {
            paddingTop: "0",
        }
    }
    const [rangePrice, setRangePrice] = useState<{ from: number | null, to: number | null }>({
        from: null, to: null
    });
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target;
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

    return (
        <Grid container spacing={5}>
            <Grid item xs={9}>
                <Stack direction="row" spacing="auto" alignItems="center">
                    <BreadcrumbHeader/>
                    <Typography sx={resultText}>Hiển thị 0-8 của {hotProducts.length} kết quả</Typography>
                </Stack>
                <ProductList sx={productListStyle} products={data}/>
            </Grid>
            <Grid item container xs={3} spacing={2} direction="column" paddingLeft={5}>
                <Grid item>
                    <Typography>BỘ LỌC TÌM KIẾM</Typography>
                </Grid>
                {/* Sap xep theo thoi gian va gia*/}
                <Grid item>
                    <Stack spacing={2} direction="column">
                        <Title title={"SẮP XẾP THEO"}/>
                        <SelectGroup id="relate" filters={relateFilters}/>
                        <SelectGroup id="price" filters={priceFilters}/>
                    </Stack>
                </Grid>
                {/*Danh muc*/}
                <Grid item>
                    <Title title={"THEO DANH MỤC"}/>
                    <CheckBoxGroup itemList={categories}/>
                </Grid>
                {/* Khoang gia*/}
                <Grid item>
                    <Title title={"THEO GIÁ"}/>
                    <Stack direction="row" alignItems="center">
                        <TextField name="from" sx={{paddingX: 1}} size="small" onChange={handleInputChange}
                                   value={rangePrice.from}
                                   inputProps={{pattern: '/[0-9]/', type: 'text', inputMode: 'numeric'}}
                                   placeholder="TỪ"/>
                        <Typography sx={{color: "grey[500]"}}>-</Typography>
                        <TextField name="to" sx={{paddingX: 1}} size="small" onChange={handleInputChange} value={rangePrice.to}
                                   placeholder="ĐẾN"
                                   inputProps={{pattern: '/[0-9]/', type: 'text', inputMode: 'numeric'}}/>
                    </Stack>
                </Grid>
                <Grid item>
                    <Title title={"ĐÁNH GIÁ"}/>
                    <Stack direction="row" alignItems="center">
                        <RatingFilter/>
                    </Stack>
                </Grid>
                <Grid item >
                    <Button variant="contained" fullWidth>Xóa tất cả</Button>
                </Grid>
            </Grid>
        </Grid>
    )
}