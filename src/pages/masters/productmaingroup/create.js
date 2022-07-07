import { Button, Form, Input, Space } from 'antd';
const { TextArea } = Input;
import { Link } from 'react-router-dom';
import { Grid } from '@mui/material';

const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const ProductMainGroupAdd = () => (
    <Grid container spacing={3}>
        <Grid item xs={12}>
            <Form
                name="frmproductmaingroup"
                labelCol={{
                    span: 8
                }}
                wrapperCol={{
                    span: 8
                }}
                initialValues={{
                    remember: true
                }}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 8
                    }}
                >
                    <Space
                        direction="horizontal"
                        size="middle"
                        align="end"
                        style={{
                            display: 'flex'
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Save
                        </Button>
                        <Link to={'//product-main-group'}>
                            <Button type="danger">Cancel</Button>
                        </Link>
                    </Space>
                </Form.Item>
                <Form.Item
                    label="Product Main Group Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input product main group name.'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Product Main Group Short Name"
                    name="short_name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input product main group short name.'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Please input description.'
                        }
                    ]}
                >
                    <TextArea rows={4} />
                </Form.Item>
            </Form>
        </Grid>
    </Grid>
);
export default ProductMainGroupAdd;
