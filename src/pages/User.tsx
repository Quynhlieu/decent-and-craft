import {useEffect, useState} from 'react'
import UserProfile from "../components/User/UserProfile.tsx";
import { Box } from "@mui/material";
import UserSpeedDial from "../components/User/UserSpeedDial.tsx";
import ProductSection from "../components/ProductSection.tsx";
import MyAddress from "../components/User/MyAddress.tsx";
import ChangePassword from "../components/User/ChangePassword.tsx";
import MyOrder from "../components/User/MyOrder.tsx";
import { useSelector} from "react-redux";
import {RootState} from "../app/store.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const User = () => {
    const [selectedComponent, setSelectedComponent] = useState('UserProfile');
    const UnauthorizedToast = () => {
        const user = useSelector((state: RootState) => state.user.user);
        const navigate = useNavigate();

        useEffect(() => {
            if (!user || user.id === 0) {
                navigate('/login');

                toast.error('Vui lòng đăng nhập để tiếp tục!', {
                    position: 'top-right',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }, [user, navigate]);

        return null;
    };
    const handleComponentChange = (componentName: string) => {
        setSelectedComponent(componentName);
    };
    return (
        <Box>
            <UnauthorizedToast />
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