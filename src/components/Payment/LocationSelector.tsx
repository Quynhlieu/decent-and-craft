import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Box, FormControl, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";

interface Ward {
    Id: string;
    Name: string;
}

interface District {
    Id: string;
    Name: string;
    Wards: Ward[];
}

interface City {
    Id: string;
    Name: string;
    Districts: District[];
}

interface LocationSelectorProps {
    province: (name: string) => void;
    district: (name: string) => void;
    ward: (name: string) => void;
    defaultValues?: {
        province: string;
        district: string;
        ward: string;
    };
}


const LocationSelector: React.FC<LocationSelectorProps> = ({province, district, ward, defaultValues}) => {
    const [cities, setCities] = useState<City[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');
    const [selectedWard, setSelectedWard] = useState<string>('');


    useEffect(() => {
        axios.get<City[]>("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json")
            .then(response => {
                setCities(response.data);
               renderDefaultAddress(response.data);
            })
            .catch(error => {
                console.error("Có lỗi xảy ra khi tải dữ liệu:", error);
            });

    }, []);
    const renderDefaultAddress = (data: City[]) => {
       if(data){
           const optionalCity =data.find(c => c.Name.toLowerCase() === defaultValues?.province.toLowerCase());
           const cityId = optionalCity? optionalCity.Id:"";
           const optionalDistrict = optionalCity?.Districts.find(d=>d.Name.toLowerCase()===defaultValues?.district.toLowerCase());
           const districtId = optionalDistrict? optionalDistrict.Id:"";
           const optionalWard = optionalDistrict?.Wards.find(w=>w.Name.toLowerCase()===defaultValues?.ward.toLowerCase());
           const wardId = optionalWard? optionalWard.Id:"";
           setSelectedCity(cityId);
           setSelectedDistrict(districtId);
           setSelectedWard(wardId);
           setDistricts(optionalCity?.Districts || []);
           setWards(optionalDistrict?.Wards || []);

       }

    };
    const handleCityChange = (e: SelectChangeEvent<string>) => {
        const cityId = e.target.value;
        setSelectedCity(cityId);
        setSelectedDistrict('');
        setWards([]);

        if (cityId) {
            const selectedCityData = cities.find(city => city.Id === cityId);
            setDistricts(selectedCityData?.Districts || []);
            province(selectedCityData?.Name || "");
        }

    };

    const handleDistrictChange = (e: SelectChangeEvent<string>) => {
        const districtId = e.target.value;
        setSelectedDistrict(districtId);
        setWards([]);

        if (districtId) {
            const selectedDistrictData = districts.find(district => district.Id === districtId);
            setWards(selectedDistrictData?.Wards || []);
            district(selectedDistrictData?.Name || "");
        }
    };

    const handleWardChange = (e: SelectChangeEvent<string>) => {
        const wardId = e.target.value;
        setSelectedWard(wardId);
        const selectedWardData = wards.find(ward => ward.Id === wardId);
        ward(selectedWardData?.Name || "")
    };

    return (
        <Box>
            <FormControl fullWidth margin="normal">
                <InputLabel id="city-label">Chọn tỉnh thành</InputLabel>
                <Select
                    labelId="city-label"
                    value={selectedCity}
                    required
                    label="Chọn tỉnh thành"
                    onChange={handleCityChange}

                >
                    <MenuItem value=""><em>Chọn tỉnh thành</em></MenuItem>
                    {cities.map(city => (
                        <MenuItem key={city.Id} value={city.Id}>{city.Name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal" disabled={!selectedCity}>
                <InputLabel id="district-label">Chọn quận huyện</InputLabel>
                <Select
                    labelId="district-label"
                    value={selectedDistrict}
                    required
                    label="Chọn quận huyện"
                    onChange={handleDistrictChange}
                >
                    <MenuItem value=""><em>Chọn quận huyện</em></MenuItem>
                    {districts.map(district => (
                        <MenuItem key={district.Id} value={district.Id}>{district.Name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal" disabled={!selectedDistrict}>
                <InputLabel id="ward-label">Chọn phường xã</InputLabel>
                <Select
                    label="Chọn phường xã"
                    labelId="ward-label"
                    required
                    value={selectedWard}
                    onChange={handleWardChange}
                >
                    <MenuItem value=""><em>Chọn phường xã</em></MenuItem>
                    {wards.map(ward => (
                        <MenuItem key={ward.Id} value={ward.Id}>{ward.Name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default LocationSelector;
