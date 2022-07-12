import { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { Grid, Stack, Typography } from '@mui/material';
import { useNavigate   } from 'react-router-dom';
import BaseApi from 'services/BaseApi';
//import router from 'umi/router';
const { TextArea } = Input;

//const HsnSacAdd = () => (
const GstAdd = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isAddMode = !id;
    const [form] = Form.useForm();
    const initialFormValues = {
        id: null,
        name: '',
        shortName: '',        
        percentageValue : '',
        igstValue :'',
        cgstValue :'',
        sgstValue :'',
        description: ''
    };
    
    const getRecordData = async (id) => {
        const b = new BaseApi();
        const result = await b.getById('gsts', id);
        initialFormValues.name = result.name;
        initialFormValues.shortName = result.shortName;        
        initialFormValues.percentageValue = result.percentageValue;
        initialFormValues.igstValue = result.igstValue;
        initialFormValues.cgstValue = result.cgstValue;
        initialFormValues.sgstValue = result.sgstValue;
        initialFormValues.description = result.description;
        console.log(initialFormValues);

        form.setFieldsValue({
            name: initialFormValues.name,
            shortName: initialFormValues.shortName,           
            percentageValue: initialFormValues.percentageValue,
            igstValue: initialFormValues.igstValue,
            cgstValue: initialFormValues.cgstValue,
            sgstValue: initialFormValues.sgstValue,
            description: initialFormValues.description
        });
    };

    useEffect(() => {
        // console.log('test by rashid');
        if (!isAddMode) {
            getRecordData(id);
        }
    },[id]);

    const onFinish = (values) => {
       
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
            percentageValue: data.percentageValue,
            igstValue: data.igstValue,
            cgstValue: data.cgstValue,
            sgstValue: data.sgstValue,
            description: data.description,
            createdDttm: '' + new Date().getTime(),
            createdBy: 1
        };
        //console.log(postData);
        
        const baseApi = new BaseApi();
        const result = await baseApi.request('gsts', postData, 'post');
        if (result.status === 200) {            
            navigate('/gst', { state: { message:'Record is successfully created.' }})
        }
    };
    const updateData = async (id, data) => {
      
        let postData = {
            id: id,
            name: data.name,
            shortName: data.shortName,            
            percentageValue: data.percentageValue,
            igstValue: data.igstValue,
            cgstValue: data.cgstValue,
            sgstValue: data.sgstValue,
            description: data.description,
            updatedDttm: '' + new Date().getTime(),
            updatedBy: 1
        };        
        const baseApi = new BaseApi();
        const result = await baseApi.request('gsts', postData, 'patch');
        if (result.status === 200) {
            navigate('/gst', { state: { message:'Record is successfully updated.' }})
        }
    };

    return (
        <Form
            name="frmgst"
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
                        <Typography variant="h3">{isAddMode ? 'Create GST' : 'Edit GST'}</Typography>
                        <div>
                            <Button type="primary" htmlType="submit" style={{marginRight:'10px'}}>
                                Save
                            </Button>
                            <Link to={'/gst'}>
                                <Button type="danger">Cancel</Button>
                            </Link>
                        </div>
                    </Stack>
                </Grid>

                <Grid item xs={2}>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter name.'
                            }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Grid>
                <Grid item xs={2}>
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
               
                <Grid item xs={2}>
                    <Form.Item
                        label="Percantege"
                        name="percentageValue"
                        id="percentageValue"
                        
                        rules={[
                            {
                                required: true,                                
                                message: 'Please enter percentage value.'
                            },
                            {
                                pattern:new RegExp(/^[0-9]*$/),
                                message: "Please enter a valid  percentage value."
                              }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Grid>
                <Grid item xs={2}>
                    <Form.Item
                        label="IGST Value"
                        name="igstValue"
                        id="igstValue"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter igst value.'
                            },
                            {
                                pattern:new RegExp(/^[0-9]*$/),
                                message: "Please enter a valid  percentage value."
                              }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Grid>
                <Grid item xs={2}>
                    <Form.Item
                        label="CGST Value"
                        name="cgstValue"
                        id="cgstValue"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter cgst value.'
                            },
                            {
                                pattern:new RegExp(/^[0-9]*$/),
                                message: "Please enter a valid  percentage value."
                              }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Grid>
                <Grid item xs={2}>
                    <Form.Item
                        label="SGST Value"
                        name="sgstValue"
                        id="sgstValue"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter sgst value.'
                            },
                            {
                                pattern:new RegExp(/^[0-9]*$/),
                                message: "Please enter a valid  percentage value."
                              }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Grid>
                <Grid item xs={12}>
                    <Form.Item
                        label="Description"
                        name="description"                        
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                </Grid>
            </Grid>
        </Form>
    );
};

export default GstAdd;
