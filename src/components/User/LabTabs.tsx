import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MyDataTable from "./MyDataTable.tsx";

export default function LabTabs() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        event.preventDefault();
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Tất cả" value="1" />
                        <Tab label="Chờ thanh toán" value="2" />
                        <Tab label="Vận chuyển" value="3" />
                        <Tab label="Hoàn thành" value="4" />
                        <Tab label="Đã hủy" value="5" />
                        <Tab label="Trả hàng/ hoàn tiền" value="6" />

                    </TabList>
                </Box>
                <TabPanel value="1"><MyDataTable filter="all" /></TabPanel>
                <TabPanel value="2"><MyDataTable filter="pending" /></TabPanel>
                <TabPanel value="3"><MyDataTable filter="shipping" /></TabPanel>
                <TabPanel value="4"><MyDataTable filter="completed" /></TabPanel>
                <TabPanel value="5"><MyDataTable filter="cancelled" /></TabPanel>
                <TabPanel value="6"><MyDataTable filter="returned" /></TabPanel>
            </TabContext>
        </Box>
    );
}