import GooglePayButton from "@google-pay/button-react";
import {Box, Typography} from "@mui/material";
import CheckoutForm from "./CheckoutForm.tsx";
import React from "react";
const PayGgBtn = () =>{
    return(
        <GooglePayButton
            environment="TEST"
            paymentRequest={{
                apiVersion: 2,
                apiVersionMinor: 0,
                allowedPaymentMethods: [
                    {
                        type: 'CARD',
                        parameters: {
                            allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                            allowedCardNetworks: ['MASTERCARD', 'VISA'],
                        },
                        tokenizationSpecification: {
                            type: 'PAYMENT_GATEWAY',
                            parameters: {
                                gateway: 'example',
                                gatewayMerchantId: 'exampleGatewayMerchantId',
                            },
                        },
                    },
                ],
                merchantInfo: {
                    merchantId: '12345678901234567890',
                    merchantName: 'Demo Merchant',
                },
                transactionInfo: {
                    totalPriceStatus: 'FINAL',
                    totalPriceLabel: 'Total',
                    totalPrice: '100.00',
                    currencyCode: 'USD',
                    countryCode: 'US',
                },
            }}
            onLoadPaymentData={paymentRequest => {
                console.log('load payment data', paymentRequest);
            }}
        />
    );
}
const Pay = () =>{
    return(
       <Box>
           <Typography variant='h3' sx={{
               textAlign: 'center',
               position: 'relative',
               marginBottom: '20px',
           }}>
               Thông tin khách hàng
           </Typography>
           <CheckoutForm />
           <PayGgBtn />
       </Box>
    );
}

export default Pay