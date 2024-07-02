import { Form } from 'semantic-ui-react';

const CheckoutForm =() =>{
    return (
        <Form>
            <Form.Input
                fluid
                name="firstname"
                label='First Name'
                placeholder='John'
            />
            <Form.Input
                fluid
                name='lastname'
                label='Last Name'
                placeholder='Smith'
            />
            <Form.Input
                fluid
                name='email'
                label='Email'
                placeholder='xyz@example.com'
                type='email'
            />
        </Form>
    );
}
export default CheckoutForm