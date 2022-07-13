import { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { Grid, Stack, Typography } from '@mui/material';
import { useNavigate   } from 'react-router-dom';
import BaseApi from 'services/BaseApi';
import { UserOutlined } from '@ant-design/icons';


const UnitAdd = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isAddMode = !id;
    const [form] = Form.useForm();
    const initialFormValues = {
        id: null,
        name: '',
        shortName: ''
        
    };
    //const [currentRecordDetails, setCurrentRecord] = useState(initialFormValues);
    const getRecordData = async (id) => {
        const b = new BaseApi();
        const result = await b.getById('units', id);
        initialFormValues.name = result.name;
        initialFormValues.shortName = result.shortName;
       
        form.setFieldsValue({
            name: initialFormValues.name,
            shortName: initialFormValues.shortName,            
        });
    };

    useEffect(() => {
        // console.log('test by rashid');
        if (!isAddMode) {
            getRecordData(id);
        }
    },[id]);

    const onFinish = (values) => {
        
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
            createdDttm: '' + new Date().getTime(),
            createdBy: 1
        };
        const baseApi = new BaseApi();
        const result = await baseApi.request('units', postData, 'post');
        if (result.status === 200) {            
            navigate('/unit', { state: { message:'Record is successfully created.' }})
        }
    };
    const updateData = async (id, data) => {
      
        let postData = {
            id: id,
            name: data.name,
            shortName: data.shortName,            
            updatedDttm: '' + new Date().getTime(),
            updatedBy: 1
        };        
        const baseApi = new BaseApi();
        const result = await baseApi.request('units', postData, 'patch');
        if (result.status === 200) {
            navigate('/unit', { state: { message:'Record is successfully updated.' }})
        }
    };
    
      const handleChange = (e) => {      
        
        //console.log("eneterd :"+e.target.value);
        const isInteger = /^[0-9]+$/;
    if (e.target.value === '' || isInteger.test(e.target.value)) {
//initialFormValues.name = e.target.value ;

    }
    else
    {
      return false;

    }
            
        
      };
     
      
    return (
        <Form
            name="frmunit"
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
                        <Typography variant="h3">{isAddMode ? 'Create Unit' : 'Edit Unit'}</Typography>
                        <div>
                            <Button type="primary" htmlType="submit" style={{marginRight:'10px'}}>
                                Save
                            </Button>
                            <Link to={'/unit'}>
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
                                message: 'Please enter name.'
                            }
                        ]}
                    >
                        <Input onChange={handleChange} />
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

            </Grid>
        </Form>
    );
};

export default UnitAdd;
