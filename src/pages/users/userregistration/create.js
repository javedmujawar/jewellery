import { useEffect, useState } from "react";
import { Button, Form, Input, Select, Checkbox, Upload ,message } from "antd";
import { Link, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BaseApi from "services/BaseApi";
import { checkAlphabets, checkNumbers } from "../../../utility/Common";
import { EyeInvisibleOutlined, EyeTwoTone,UploadOutlined  } from "@ant-design/icons";
import MainCard from "components/MainCard";

const UserRegistrationAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAddMode = !id;
  const [form] = Form.useForm();
  const [userTypeList, setUserTypeList] = useState([]);
  const [customerList, setCustomerList] = useState([]);
  const [supplierList, setSupplierList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [chkFlag, setchkFlag] = useState(0);
  const initialFormValues = {
    id: null,
    userName: "",
    userTypeId: "",
    customerId: "",
    supplierId: "",
    employeeId: "",
    password: "",
    mobileNumber: "",
    email: "",
    photo: "",
    sendSms: "",
  };

  const getRecordData = async (id) => {
    try 
    {
    const b = new BaseApi();
    const result = await b.getById("userregistrations", id);
   
    initialFormValues.userName = result.userName;
    initialFormValues.userTypeId = result.userTypeId;
    initialFormValues.customerId = result.customerId;
    initialFormValues.supplierId = result.supplierId;
    initialFormValues.employeeId = result.employeeId;
    initialFormValues.password = result.password;
    initialFormValues.mobileNumber = result.mobileNumber;
    initialFormValues.email = result.email;
    //initialFormValues.sendSms = result.sendSms;
    //initialFormValues.photo = result.photo;
    if (result.sendSms === 1) {
      setchkFlag(true);
    } else {
      setchkFlag(false);
    }
    form.setFieldsValue({
      userName: initialFormValues.userName,
      userTypeId: initialFormValues.userTypeId,
      customerId: initialFormValues.customerId,
      supplierId: initialFormValues.supplierId,
      employeeId: initialFormValues.employeeId,
      password: initialFormValues.password,
      mobileNumber: initialFormValues.mobileNumber,
      email: initialFormValues.email,      
      // photo: initialFormValues.photo,
    });
  } catch (error) {console.log("Error : "+error);}
  };
  const getUserTypeList = async () => {
    const b = new BaseApi();
    const result = await b.getListKV("usertypes");
    setUserTypeList(result);
  };  
  const getCustomerList = async () => {
    const b = new BaseApi();
    const result = await b.getListKV("customers");
    setCustomerList(result);
  };
  const getSupplierList = async () => {
    const b = new BaseApi();
    const result = await b.getListKV("suppliers");
    setSupplierList(result);
  };
  const getemployeeList = async () => {
    const b = new BaseApi();
    const result = await b.getListKV("employees");
    setEmployeeList(result);
  };

  useEffect(() => {
    getUserTypeList();
    getCustomerList();
    getSupplierList();
    getemployeeList();
    if (!isAddMode) {
      getRecordData(id);
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const onFinish = (values) => {    
    isAddMode ? insertData(values) : updateData(id, values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const insertData = async (data) => {
    try 
    {
    let smsFlg = 0;
    if(chkFlag===true)
    {
      smsFlg = 1;
    }
    let postData = {
      id: id,
      userName: data.userName,
      userTypeId: data.userTypeId,
      customerId: data.customerId,
      supplierId: data.supplierId,
      employeeId: data.employeeId,
      password: data.password,
      mobileNumber: data.mobileNumber,
      email: data.email,
      sendSms: smsFlg,
      photo: "null",
      createdDttm: "" + new Date().getTime(),
      createdBy: 1,
    };
   // console.log(postData);
    const baseApi = new BaseApi();
    const result = await baseApi.request("userregistrations", postData, "post");
    if (result.status === 200) {
      navigate("/user-registration", {
        state: { message: "Record is successfully created." },
      });
    }
  } catch (error) {console.log("Error : "+error);}
  };
  const updateData = async (id, data) => {
    try 
    {
    let smsFlg = 0;
    if(chkFlag===true)
    {
      smsFlg = 1;
    }
    let postData = {
      id: id,
      userName: data.userName,
      userTypeId: data.userTypeId,
      customerId: data.customerId,
      supplierId: data.supplierId,
      employeeId: data.employeeId,
      password: data.password,
      mobileNumber: data.mobileNumber,
      email: data.email,
      sendSms: smsFlg,
      photo: "null",
      updatedDttm: "" + new Date().getTime(),
      updatedBy: 1,
    };
    //console.log(postData);
    const baseApi = new BaseApi();
    const result = await baseApi.request(
      "userregistrations",
      postData,
      "patch"
    );
    if (result.status === 200) {
      navigate("/user-registration", {
        state: { message: "Record is successfully updated." },
      });
    }
  } catch (error) {console.log("Error : "+error);}
  };
  const handleAlphabets = (e) => {
    return checkAlphabets(e);
  };
  const handleNumbers = (e) => {
    return checkNumbers(e);
  };
  const onChange = (e) => {   
   // console.log("checked =" + e.target.checked);
    setchkFlag(e.target.checked);
  };
  const props = {
    beforeUpload: (file) => {
      const isPNG = file.type === 'image/png';
  
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
  
      return isPNG || Upload.LIST_IGNORE;
    },
    onChange: (info) => {
      console.log("File Name :"+info.name);
    },
  };
  return (
    <Form
      name="frmuserregistration"
      initialValues={{
        remember: true,
      }}
      form={form} // Add this!
      layout="vertical"
      labelCol={{ span: 22 }}
      wrapperCol={{ span: 22 }}      
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <MainCard
        title={isAddMode ? "Create User Registration" : "Edit User Registration"}
        secondary={
          <div>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              Save
            </Button>
            <Link to={"/user-registration"}>
              <Button type="danger">Cancel</Button>
            </Link>
          </div>
        }
      >
        <Typography variant="body2">
          <Grid container spacing={2}>
           

            <Grid item xs={2}>
              <Form.Item
                label="User Type"
                id="userTypeId"
                name="userTypeId"
                rules={[
                  {
                    required: true,
                    message: "Please select user type.",
                  },
                ]}
              >
                <Select placeholder="--- Select ---">
                  {userTypeList &&
                    userTypeList.map((row, index) => {
                      return (
                        <option key={index} value={row.id}>
                          {row.name}
                        </option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Grid>

            <Grid item xs={2}>
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
            
            <Grid item xs={2}>
              <Form.Item
                label="Supplier"
                id="supplierId"
                name="supplierId"                
              >
                <Select placeholder="--- Select ---">
                  {supplierList &&
                    supplierList.map((row, index) => {
                      return (
                        <option key={index} value={row.id}>
                          {row.name}
                        </option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Grid>

            <Grid item xs={2}>
              <Form.Item
                label="Employee"
                id="employeeId"
                name="employeeId"                
              >
                <Select placeholder="--- Select ---">
                  {employeeList &&
                    employeeList.map((row, index) => {
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
                label="Photo"
                name="photo"
                id="photo"               
              >
                {/* <Input onKeyPress={handleAlphabets} /> */}
                <Upload {...props}>
    <Button icon={<UploadOutlined />}>Upload</Button>
  </Upload>
              </Form.Item>
            </Grid>

            <Grid item xs={2}>
              <Form.Item
                label="Name"
                name="userName"
                id="userName"
                rules={[
                  {
                    required: true,
                    message: "Please enter name.",
                  },
                ]}
              >
                <Input onKeyPress={handleAlphabets} />
              </Form.Item>
            </Grid>

            <Grid item xs={2}>
              <Form.Item
                label="Password"
                name="password"
                id="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter password.",
                  },
                ]}
              >
                <Input.Password
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
            </Grid>

            <Grid item xs={4}>
              <Form.Item
                label="Email Id"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: false,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Grid>

            <Grid item xs={4}>
              <Form.Item
                label="Mobile Number"
                name="mobileNumber"
                id="mobileNumber"
                rules={[
                  {
                    required: true,
                    message: "Please enter mobile number.",
                  },
                ]}
              >
                <Input maxLength = {12} onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid>

            

            <Grid item xs={2}>
              <Form.Item label="Send SMS" name="sendSms" id="sendSms">
                <Checkbox
                  checked={chkFlag}                 
                  onChange={onChange}
                ></Checkbox>               
              </Form.Item>
            </Grid>
          </Grid>
        </Typography>
      </MainCard>
    </Form>
  );
};

export default UserRegistrationAdd;
