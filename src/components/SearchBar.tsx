import SearchIcon from '@mui/icons-material/Search';
import { Box, InputBase } from '@mui/material';
import { debounce } from 'lodash';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { updateName } from '../features/filter/filterSlice';
const SeachBar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState<string>("");
    const setStateSearchValue = debounce((value: string) => {
        dispatch(updateName(value));
    }, 300);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setStateSearchValue(event.target.value);
        setSearchValue(event.target.value);
    };

    return (
        <Box sx={{
            marginX: 3,
            border: "1px solid rgba(0,0,0,0.3)",
            borderRadius: 2,
            paddingX: 2,
            paddingY: "2px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <SearchIcon sx={{ mr: 2 }} onClick={() => {
                navigate("/search")
            }} />
            <InputBase
                sx={{ width: 300 }}
                onChange={handleInputChange}
                value={searchValue}
                placeholder='Bạn cần tìm gì?'
            />
        </Box>
    );
}

export default SeachBar