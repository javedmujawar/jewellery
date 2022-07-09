import { useEffect } from 'react';
import { Button, Form, Input, message } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { Grid, Stack, Typography } from '@mui/material';
import { useNavigate   } from 'react-router-dom';
import BaseApi from 'services/BaseApi';
//import router from 'umi/router';
const { TextArea } = Input;

//const ProductMainGroupAdd = () => (
const ProductMainGroupAdd = () => {
    const navigate = useNavigate();
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
            navigate('/product-main-group', { state: { message:'Record is successfully created.' }})
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
            navigate('/product-main-group', { state: { message:'Record is successfully updated.' }})
        }
    };

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
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                        <Typography variant="h3">{isAddMode ? 'Create Main Group' : 'Edit Main Group'}</Typography>
                        <div>
                            <Button type="primary" htmlType="submit" style={{marginRight:'10px'}}>
                                Save
                            </Button>
                            <Link to={'//product-main-group'}>
                                <Button type="danger">Cancel</Button>
                            </Link>
                        </div>
                    </Stack>
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
