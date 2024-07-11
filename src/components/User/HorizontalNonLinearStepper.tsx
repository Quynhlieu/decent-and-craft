import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel, { StepLabelProps } from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Order, {OrderStatus} from "../../interfaces/IOrder.ts";

interface HorizontalLineerStepperProps{
    order: Order | null;
}
const steps: string[] = [
    'Đơn hàng đã đặt',
    'Đơn hàng đang chờ vận chuyển',
    'Đơn hàng đã giao cho đơn vị vận chuyển',
    'Đã nhận được hàng',
    'Đánh giá'
];

// Custom StepLabel component to position the label
const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
    '& .MuiStepLabel-labelContainer': {
        marginTop: theme.spacing(1), // Adjust this value to position the label
    },
}));

const HorizontalLinearStepper: React.FC<HorizontalLineerStepperProps> = ({ order}) =>{

    const isStepOptional = (step: number): boolean =>{
        return step ===1;
    };

    const isStepSkipped = (): boolean =>{
        return false;
    }
    const determineActiveStep = (order: Order | null): number => {
        if (!order) {
            return 0;
        }
        switch (order.status) {
            case OrderStatus.CHO_VAN_CHUYEN:
                return 1;
            case OrderStatus.DA_HUY:
                return 0;
            case OrderStatus.DANG_VAN_CHUYEN:
                return 2;
            case OrderStatus.HOAN_THANH:
                return 3;
            case OrderStatus.HOAN_TIEN:
            case OrderStatus.TRA_HANG:
                return 4;
            default:
                return 0;
        }
    };

    const determinedActiveStep = determineActiveStep(order);
    return (
        <Box sx={{ width: '100%', backgroundColor: "#f3f0f0" , marginY: 1,  borderRadius: '8px', paddingY:4}}>
            <Stepper activeStep={determinedActiveStep} alternativeLabel>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: StepLabelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption"></Typography>
                        );
                    }
                    if (isStepSkipped()) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <CustomStepLabel {...labelProps}>{label}</CustomStepLabel>
                        </Step>
                    );
                })}
            </Stepper>

        </Box>
    );
}
export  default HorizontalLinearStepper