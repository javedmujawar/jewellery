import { Button, Checkbox, Form, Input, Space } from 'antd';
import React from 'react';
const { TextArea } = Input;
import { Link } from 'react-router-dom';
// material-ui
import { Grid } from '@mui/material';
import { MDBInput } from 'mdbreact';
const onFinish = (values) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const UnitMasterAdd = () => (
    <Grid container spacing={3}>
        <Grid item xs={12}>
            <Form
                name="frmunitmaster"
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
                        <Link to={'//unitmaster'}>
                            <Button type="danger">Cancel</Button>
                        </Link>
                    </Space>
                </Form.Item>

                {/* <Form.Item>
                    <MDBInput label="Unit Name" name="name" size="lg" required />
                </Form.Item>

                <Form.Item>
                    <MDBInput
                        label="Unit Short Name"
                        name="short_name"
                        size="lg"
                        rules={[
                            {
                                required: true,
                                message: 'Please input unit short  name.'
                            }
                        ]}
                    />
                </Form.Item> */}

                <Form.Item
                    label="Unit Name"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input unit name.'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Unit Short Name"
                    name="short_name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input unit short name.'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Grid>
    </Grid>
);
export default UnitMasterAdd;
