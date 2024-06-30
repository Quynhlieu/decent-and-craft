import {useState} from 'react'
import UserProfile from "../components/User/UserProfile.tsx";
import { Box } from "@mui/material";
import UserSpeedDial from "../components/User/UserSpeedDial.tsx";
import ProductSection from "../components/ProductSection.tsx";
import MyOrder from "../components/User/MyOrder.tsx";
import MyAddress from "../components/User/MyAddress.tsx";
import ChangePassword from "../components/User/ChangePassrord.tsx";

const User = () => {
    const [selectedComponent, setSelectedComponent] = useState('UserProfile');

    const handleComponentChange = (componentName: string) => {
        setSelectedComponent(componentName);
    };
    return (
        <Box>
            <Box sx={{ paddingX: 10 }}>
                <Box sx={{ display: 'flex', width: '100%' }}>
                    <Box sx={{ flex: 2, padding: '10px' }}>
                        <UserSpeedDial onComponentChange={handleComponentChange}/>
                    </Box>
                    <Box sx={{ flex: 10, padding: '10px' }}>
                        {selectedComponent === 'UserProfile' && <UserProfile />}
                        {selectedComponent === 'MyAddress' && <MyAddress  />}
                        {selectedComponent === 'MyOrder' && <MyOrder />}
                        {selectedComponent === 'ChangePassword' && <ChangePassword />}
                    </Box>
                </Box>

            </Box>
            <ProductSection />
        </Box>

    )
}

export default User