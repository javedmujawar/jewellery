import { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { useNavigate   } from 'react-router-dom';
import BaseApi from 'services/BaseApi';
import { checkAlphabets, checkNumbers } from "../../../utility/Common";
const { TextArea } = Input;
import MainCard from "components/MainCard";

const HsnSacAdd = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isAddMode = !id;
    const [form] = Form.useForm();
    const initialFormValues = {
        id: null,
        name: '',
        shortName: '',
        code :'',
        percentageValue : '',
        description: ''
    };    
    const getRecordData = async (id) => {
        const b = new BaseApi();
        const result = await b.getById('hsnsacs', id);
        initialFormValues.name = result.name;
        initialFormValues.shortName = result.shortName;
        initialFormValues.code = result.code;
        initialFormValues.percentageValue = result.percentageValue;
        initialFormValues.description = result.description;

        form.setFieldsValue({
            name: initialFormValues.name,
            shortName: initialFormValues.shortName,
            code: initialFormValues.code,
            percentageValue: initialFormValues.percentageValue,
            description: initialFormValues.description
        });
    };

    useEffect(() => {      
        if (!isAddMode) {
            getRecordData(id);
        }
    },[id]);// eslint-disable-line react-hooks/exhaustive-deps

    const onFinish = (values) => {       
        // console.log('Success:', id + isAddMode);
        isAddMode ? insertData(values) : updateData(id, values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const insertData = async (data) => {       
        let postData = {
            id: id,
            name: data.name,
            shortName: data.shortName,
            code: data.code,
            percentageValue: data.percentageValue,
            description: data.description,
            createdDttm: '' + new Date().getTime(),
            createdBy: 1
        };        
        const baseApi = new BaseApi();
        const result = await baseApi.request('hsnsacs', postData, 'post');
        if (result.status === 200) {            
            navigate('/hsnsac', { state: { message:'Record is successfully created.' }})
        }
    };
    const updateData = async (id, data) => {
      
        let postData = {
            id: id,
            name: data.name,
            shortName: data.shortName,
            code: data.code,
            percentageValue: data.percentageValue,
            description: data.description,
            updatedDttm: '' + new Date().getTime(),
            updatedBy: 1
        };        
        const baseApi = new BaseApi();
        const result = await baseApi.request('hsnsacs', postData, 'patch');
        if (result.status === 200) {
            navigate('/hsnsac', { state: { message:'Record is successfully updated.' }})
        }
    };
    const handleAlphabets = (e) => {
        return checkAlphabets(e);
      };
      const handleNumbers = (e) => {
        return checkNumbers(e);
      };
      const handleChange = (e) => {
        form.setFieldsValue({
          shortName: e.target.value,
        });
      };

    return (
        <Form
            name="frmhsnsac"
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
             <MainCard
        title={isAddMode ? "Create HSN / SAC" : "Edit HSN / SAC"}
        secondary={
          <div>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              Save
            </Button>
            <Link to={"/hsnsac"}>
              <Button type="danger">Cancel</Button>
            </Link>
          </div>
        }
      >
        <Typography variant="body2">
            <Grid container spacing={2}>
                                <Grid item xs={3}>
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
                        <Input onKeyPress={handleAlphabets} onChange={handleChange} />
                    </Form.Item>
                </Grid>
                <Grid item xs={3}>
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
                <Grid item xs={3}>
                    <Form.Item
                        label="Code"
                        name="code"
                        id="code"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter code.'
                            },
                            {
                                pattern:new RegExp(/^[0-9]*$/),
                                message: "Please enter valid percentage value."
                              }
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Grid>
                <Grid item xs={3}>
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
                                pattern:new RegExp(/^[0-9-.]*$/),
                                message: "Please enter valid percentage value."
                              }
                        ]}
                    >
                        <Input onKeyPress={handleNumbers} />
                    </Form.Item>
                </Grid>
                <Grid item xs={6}>
                    <Form.Item
                        label="Description"
                        name="description"
                        
                    >
                        <TextArea rows={4} />
                    </Form.Item>
                </Grid>
            </Grid>
            </Typography>
            </MainCard>
        </Form>
    );
};

export default HsnSacAdd;
