import {
    Box,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel, MenuItem, Select,
    SelectChangeEvent,
    Stack, TextField,
    Typography
} from "@mui/material";
import {hotProducts} from "../data/products";
import BreadcrumbHeader from "../components/ProductDetail/BreadcrumbHeader.tsx";
import {LineIcon} from "./ProductDetail.tsx";
import {categories} from "../data/filterData.ts"
import {FilterItem} from "../features/filter/filterSlice.ts";
import BlogCategory from "../interfaces/IBlogCategory.ts";
import FormControl from "@mui/material/FormControl";
import React from "react";
import Checkbox from "@mui/material/Checkbox";

const Title = (prop: { title: string }) => {
    const title = prop.title;
    const baseSx = {
        fontWeight: "bold",
        fontSize: "14px",
    }

    return (
        <Box>
            <Typography style={baseSx}>
                {title}
            </Typography>
            <LineIcon/>
        </Box>
    )
}
const selectStyle = {
    width: "120px",
    height: "20px"

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
const SelectGroup = (props: {id:string, filters: FilterItem}) => {
    const {id, filters} = props;
    const [selected, setSelected] = React.useState(null);
    const handleSelectedChange = (event: SelectChangeEvent) => {
        event.target.value &&
        setSelected(event.target.value);
    }
    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">LIÊN QUAN</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleSelectedChange}
            >
                <MenuItem value={10}>Ten</MenuItem>

            </Select>
        </FormControl>
    );
}
export default function SearchPage() {
    const data = hotProducts;
    const resultText = {
        display: "flex",
        alignItems: "center"
    }
    return (
        <Box sx={{mt: 5}}>

            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <Stack direction="row">
                        <BreadcrumbHeader/>
                        <Typography style={resultText}>Hiển thị 0-24 của 50 kết quả</Typography>
                    </Stack>
                    {/*<ProductList products={data}/>*/}
                </Grid>
                <Grid item xs={3}>
                    <Typography>BỘ LỌC TÌM KIẾM</Typography>
                    <Box>
                        <Title title={"SẮP XẾP THEO"}/>

                    </Box>
                    {/*Danh muc*/}
                    <Box>
                        <Title title={"THEO DANH MỤC"}/>
                        <CheckBoxGroup itemList={categories}/>
                    </Box>
                    {/* Khoang gia*/}
                    <Box>
                        <Title title={"THEO DANH MỤC"}/>
                        <Stack direction="row" alignItems="center">
                            <TextField sx={{paddingX:1}} type="text" placeholder="TỪ"/>
                            <Typography sx={{color: "grey[500]"}}>-</Typography>
                            <TextField sx={{paddingX:1}}  type="text" placeholder="ĐẾN"/>
                        </Stack>
                    </Box>

                </Grid>
            </Grid>
        </Box>
    )
}