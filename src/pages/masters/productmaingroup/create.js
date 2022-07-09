import { useState, useEffect } from 'react';
import { Button, Form, Input, Space, message } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import BaseApi from 'services/BaseApi';
//import router from 'umi/router';
const { TextArea } = Input;

//const ProductMainGroupAdd = () => (
const ProductMainGroupAdd = () => {
    const { id } = useParams();
    const isAddMode = !id;
    const [form] = Form.useForm();
    const initialFormState = {
        id: null,
        name: '',
        shortName: '',
        description: ''
    };
    //const [currentRecordDetails, setCurrentRecord] = useState(initialFormState);
    const getRecordData = async (id) => {
        const b = new BaseApi();
        const result = await b.getById('productmaingroups', id);
        //console.log(initialFormState.name);

        initialFormState.name = result.name;
        initialFormState.shortName = result.shortName;
        initialFormState.description = result.description;

        form.setFieldsValue({
            name: initialFormState.name,
            shortName: initialFormState.shortName,
            description: initialFormState.description
        });
    };

    useEffect(() => {
        // console.log('test by rashid');
        if (!isAddMode) {
            getRecordData(id);
        }
    }, [id]);

    const onFinish = (values) => {
        //console.log('Success:', values);
        // console.log('Success:', id + isAddMode);
        isAddMode ? insertData(values) : updateData(id, values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const insertData = async (data) => {
        //  console.log('insert functio is call :', data);
        let postData = {
            id: id,
            name: data.name,
            shortName: data.shortName,
            description: data.description,
            createdDttm: '' + new Date().getTime(),
            createdBy: 1
        };
        const baseApi = new BaseApi();
        const result = await baseApi.request('productmaingroups', postData, 'post');
        if (result.status === 200) {
            // router.push('/product-main-group');
            message.success('Record is save successfully..!', 5);
        }
    };
    const updateData = async (id, data) => {
        //console.log('update function is call:', id + isAddMode);
        let postData = {
            id: id,
            name: data.name,
            shortName: data.shortName,
            description: data.description,
            updatedDttm: '' + new Date().getTime(),
            updatedBy: 1
        };
        //console.log(postData);
        const baseApi = new BaseApi();
        const result = await baseApi.request('productmaingroups', postData, 'patch');
        if (result.status === 200) {
            //router.push('/product-main-group');
            message.success('Record is save successfully..!', 5);
        }
    };

    // return (
    //     <Grid container spacing={3}>
    //         <Grid item xs={12}>
    //             <Form
    //                 name="frmproductmaingroup"
    //                 labelCol={{
    //                     span: 22
    //                 }}
    //                 wrapperCol={{
    //                     span: 22
    //                 }}
    //                 initialValues={{
    //                     remember: true
    //                 }}
    //                 form={form} // Add this!
    //                 layout="vertical"
    //                 //onSubmit={handleSubmit}
    //                 onFinish={onFinish}
    //                 onFinishFailed={onFinishFailed}
    //                 autoComplete="off"
    //             >
    //                 <Form.Item
    //                     wrapperCol={{
    //                         offset: 8,
    //                         span: 8
    //                     }}
    //                 >
    //                     <Space
    //                         direction="horizontal"
    //                         size="middle"
    //                         align="end"
    //                         style={{
    //                             display: 'flex'
    //                         }}
    //                     >
    //                         <h1>{isAddMode ? 'Create' : 'Edit'}</h1>

    //                         <Button type="primary" htmlType="submit">
    //                             Save
    //                         </Button>
    //                         <Link to={'//product-main-group'}>
    //                             <Button type="danger">Cancel</Button>
    //                         </Link>
    //                     </Space>
    //                 </Form.Item>
    //                 <Form.Item
    //                     label="Product Main Group Name"
    //                     name="name"
    //                     rules={[
    //                         {
    //                             required: true,
    //                             message: 'Please enter group name.'
    //                         }
    //                     ]}
    //                 >
    //                     <Input />
    //                 </Form.Item>

    //                 <Form.Item
    //                     label="Product Main Group Short Name"
    //                     name="shortName"
    //                     id="shortName"
    //                     rules={[
    //                         {
    //                             required: true,
    //                             message: 'Please enter group short name.'
    //                         }
    //                     ]}
    //                 >
    //                     <Input />
    //                 </Form.Item>

    //                 <Form.Item
    //                     label="Description"
    //                     name="description"
    //                     rules={[
    //                         {
    //                             required: true,
    //                             message: 'Please enter description.'
    //                         }
    //                     ]}
    //                 >
    //                     <TextArea rows={4} />
    //                 </Form.Item>
    //             </Form>
    //         </Grid>
    //     </Grid>
    // );
    return (
        <Form
            name="frmproductmaingroup"
            initialValues={{
                remember: true
            }}
            form={form} // Add this!
            layout="vertical"
            labelCol={{ span: 22 }}
            wrapperCol={{ span: 22 }}
            //onSubmit={handleSubmit}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Grid container spacing={2}>
                <Grid item xs={8}></Grid>
                <Grid item xs={4}>
                    {/* <Space
                        direction="horizontal"
                        size="middle"
                        align="end"
                        style={{
                            display: 'flex'
                        }}
                    > */}
                    <h4>{isAddMode ? 'Create Main Group' : 'Edit Main Group'}</h4>
                    <Button type="primary" htmlType="submit" align="right">
                        Save
                    </Button>
                    <Link to={'//product-main-group'}>
                        <Button type="danger">Cancel</Button>
                    </Link>
                    {/* </Space> */}
                </Grid>
                <Grid item xs={4}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter group name.'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Grid>
                <Grid item xs={4}>
                    <Form.Item
                        label="Short Name"
                        name="shortName"
                        id="shortName"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter short name.'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Grid>
                <Grid item xs={4}>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter description.'
                            }
                        ]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                </Grid>
            </Grid>
        </Form>
    );
};

export default ProductMainGroupAdd;
