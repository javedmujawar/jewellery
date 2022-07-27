import { useEffect ,useState} from 'react';
import { Button, Form, Input, Select, DatePicker } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { useNavigate   } from 'react-router-dom';
import BaseApi from 'services/BaseApi';
import { checkAlphabets } from "../../../utility/Common";
const { TextArea } = Input;
import MainCard from "components/MainCard";

const NewInvoiceAdd = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isAddMode = !id;
    const [form] = Form.useForm();
    const [customerList, setCustomerList] = useState([]);
    const dateFormat = "DD-MM-YYYY";
    const initialFormValues = {
        id: null,
        name: '',       
        description: ''
    };   
    const getCustomerList = async () => {
        const b = new BaseApi();
        const result = await b.getListKV("customers");
        setCustomerList(result);
      };

    useEffect(() => {  
        getCustomerList();      
        if (!isAddMode) {          
        }
    },[id]);// eslint-disable-line react-hooks/exhaustive-deps

    const onFinish = (values) => {       
       
        isAddMode ? insertData(values) : updateData(id, values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const insertData = async (data) => { 
        try 
        { 
            /*     
        let postData = {
            id: id,
            name: data.name,           
            description: data.description,
            createdDttm: '' + new Date().getTime(),
            createdBy: 1
        };
        const baseApi = new BaseApi();
        const result = await baseApi.request('categories', postData, 'post');
        if (result.status === 200) {            
            navigate('/category', { state: { message:'Record is successfully created.' }})
        }
        */
    } catch (error) {console.log("Error : "+error);}
    };
    const updateData = async (id, data) => {
      try 
      {
        /*
        let postData = {
            id: id,
            name: data.name,            
            description: data.description,
            updatedDttm: '' + new Date().getTime(),
            updatedBy: 1
        };        
        const baseApi = new BaseApi();
        const result = await baseApi.request('categories', postData, 'patch');
        if (result.status === 200) {
            navigate('/category', { state: { message:'Record is successfully updated.' }})
        }
        */
    } catch (error) {console.log("Error : "+error);}
    };
    const handleAlphabets = (e) => {
        return checkAlphabets(e);
      };
      const handleChange = (e) => {
        form.setFieldsValue({
          description: e.target.value,
        });
      };

    return (
        <Form
            name="frmnewinvoice"
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
        title={isAddMode ? "Create New Invoice" : "Edit New Invoice"}
        secondary={
          <div>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              Save
            </Button>
            <Link to={"/"}>
              <Button type="danger">Cancel</Button>
            </Link>
          </div>
        }
      >
        <Typography variant="body2">
            <Grid container spacing={2}>               
                <Grid item xs={4}>
                <Form.Item
                label="Customer"
                id="customerId"
                name="customerId"                
              >
                <Select placeholder="--- Select ---">
                  {customerList &&
                    customerList.map((row, index) => {
                      return (
                        <option key={index} value={row.id}>
                          {row.name}
                        </option>
                      );
                    })}
                </Select>
              </Form.Item>
                </Grid>
               
                <Grid item xs={4}>
                <Form.Item
                label="Invoice Date"
                name="invoiceDate"
                rules={[
                  {
                    required: false,
                    message: "Please enter date.",
                  },
                ]}
              >
                 <DatePicker                  
                  format={dateFormat}                  
                /> 
                {/* <Input onKeyPress={handleNumbers} /> */}
              </Form.Item>
                </Grid>
            </Grid>
            </Typography>
      </MainCard>
        </Form>
    );
};
export default NewInvoiceAdd;
