import React, {useState} from 'react'
import UserProfile from "../components/UserProfile.tsx";
import { Box } from "@mui/material";
import UserSpeedDial from "../components/UserSpeedDial.tsx";
import ProductSection from "../components/ProductSection.tsx";
import MyOrder from "../components/MyOrder.tsx";
import MyAddress from "../components/MyAddress.tsx";
import ChangePassword from "../components/ChangePassrord.tsx";

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
                        {/*{selectedComponent === 'MyAddress' && <MyAddress  />}*/}
                        {/*{selectedComponent === 'MyOrder' && <MyOrder />}*/}
                        {/*{selectedComponent === 'ChangePassword' && <ChangePassword />}*/}
                    </Box>
                </Box>

            </Box>
            <ProductSection />
        </Box>

    )
}

export default User