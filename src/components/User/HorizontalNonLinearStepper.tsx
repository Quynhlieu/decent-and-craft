import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel, { StepLabelProps } from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Order from "../../interfaces/IOrder.ts";
interface Order {
    status: string;
}
interface HorizontalLineerStepperProps{
    activeStep: number;
    order: Order | null;
    handleNext: () => void;
    handleBack: () => void;
    handleSkip: () => void;
}
const steps: string[] = [
    'Đơn hàng đã đặt',
    'Đơn hàng đã thanh toán (50.000 đ)',
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

const HorizontalLinearStepper: React.FC<HorizontalLineerStepperProps> = ({activeStep, order, handleBack, handleNext, handleSkip}) =>{

    // const [activeStep, setActiveStep] = React.useState<number>(0);
    // const [skipped, setSkipped] = React.useState<Set<number>>(new Set<number>());

    // const isStepOptional = (step: number): boolean => {
    //     return step === 1;
    // };
    //
    // const isStepSkipped = (step: number): boolean => {
    //     return skipped.has(step);
    // };
    const isStepOptional = (step: number): boolean =>{
        return step ===1;
    };

    const isStepSkipped = (step:  number): boolean =>{
        return false;
    }
    const determineActiveStep = (order: Order | null): number => {
        if (!order) {
            return 0; // Default to the first step if no order is provided
        }
        switch (order.status) {
            case 'Đã thanh toán':
                return 1;
            case 'Đã giao cho đơn vị vận chuyển':
                return 2;
            case 'Đã nhận được hàng':
                return 3;
            case 'Đánh giá':
                return 4;
            default:
                return 0; // Default to the first step if status doesn't match any case
        }
    };

    const determinedActiveStep = determineActiveStep(order);
    // const handleNext = (): void => {
    //     let newSkipped = skipped;
    //     if (isStepSkipped(activeStep)) {
    //         newSkipped = new Set(newSkipped.values());
    //         newSkipped.delete(activeStep);
    //     }
    //     setSkipped(newSkipped);
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // };

    // const handleBack = (): void => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };
    //
    // const handleSkip = (): void => {
    //     if (!isStepOptional(activeStep)) {
    //         throw new Error("You can't skip a step that isn't optional.");
    //     }
    //
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    //     setSkipped((prevSkipped) => {
    //         const newSkipped = new Set(prevSkipped.values());
    //         newSkipped.add(activeStep);
    //         return newSkipped;
    //     });
    // };

    // const handleReset = (): void => {
    //     setActiveStep(0);
    // };
    //
    return (
        <Box sx={{ width: '100%', backgroundColor: "#f3f0f0" , marginY: 1,  borderRadius: '8px', paddingTop:4}}>
            <Stepper activeStep={determinedActiveStep} alternativeLabel>
                {steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = {};
                    const labelProps: StepLabelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption"></Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <CustomStepLabel {...labelProps}>{label}</CustomStepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        Tất cả các bước đã hoàn thành - bạn đã xong!
                    </Typography>
                    {/*<Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>*/}
                    {/*    <Box sx={{ flex: '1 1 auto' }} />*/}
                    {/*    <Button onClick={handleReset}>Reset</Button>*/}
                    {/*</Box>*/}
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {isStepOptional(activeStep) && (
                            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                Skip
                            </Button>
                        )}
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
        </Box>
    );
}
export  default HorizontalLinearStepper