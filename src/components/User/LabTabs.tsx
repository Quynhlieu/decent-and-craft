import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MyDataTable from "./MyDataTable";
import  {OrderStatus} from "../../interfaces/IOrder";
import Address from "../../interfaces/IAddress.ts";
import Voucher from "../../interfaces/IVoucher.ts";
import IUser from "../../interfaces/IUser.ts";
import OrderDetail from "../../interfaces/IOrderDetail.ts";

interface TabInfo {
    label: string;
    value: string;
    filter: string;
}
interface DataType {
    createdDate: string;
    id: number;
    address: Address;
    status: OrderStatus;
    voucher?: Voucher;
    user: IUser;
    orderDetails: OrderDetail[];
    shipment: string;
    notice: string;
    shippingFee: number;
    totalPrice: number;
}
interface LabTabsProps {
    data: DataType[];
}

const LabTabs: React.FC<LabTabsProps> = ({ data }) => {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        event.preventDefault();
        setValue(newValue);
    };

    // Define your tabs here with respective labels, values, and filters
    const tabs: TabInfo[] = [
        { label: 'Tất cả', value: '1', filter: 'all' },
        { label: 'Chờ vận chuyển', value: '2', filter: 'pending' },
        { label: 'Đang vận chuyển', value: '3', filter: 'shipping' },
        { label: 'Hoàn thành', value: '4', filter: 'completed' },
        { label: 'Đã hủy', value: '5', filter: 'cancelled' },
        { label: 'Trả hàng/ hoàn tiền', value: '6', filter: 'returned' },
    ];

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        {tabs.map(tab => (
                            <Tab key={tab.value} label={tab.label} value={tab.value} />
                        ))}
                    </TabList>
                </Box>
                {tabs.map(tab => (
                    <TabPanel key={tab.value} value={tab.value}>

                        <MyDataTable data={data} filter={tab.filter} />
                    </TabPanel>
                ))}
            </TabContext>
        </Box>
    );
}

export default LabTabs;
