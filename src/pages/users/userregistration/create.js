import { useEffect, useState } from "react";
import { Button, Form, Input, Select, Checkbox } from "antd";
import { Link, useParams } from "react-router-dom";
import { Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BaseApi from "services/BaseApi";
import { checkAlphabets, checkNumbers } from "../../../utility/Common";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";


const UserRegistrationAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAddMode = !id;
  const [form] = Form.useForm();
  const [userTypeList, setUserTypeList] = useState([]);
  const [chkFlag, setchkFlag] = useState(false);
  const initialFormValues = {
    id: null,
    userName: "",
    userTypeId: "",
    password: "",
    mobileNumber: "",
    email: "",
    photo: "",
    sendSms: "",
  };

  const getRecordData = async (id) => {
    const b = new BaseApi();
    const result = await b.getById("userregistrations", id);
    console.log('Record : '+ result.sendSms);
    initialFormValues.userName = result.userName;
    initialFormValues.userTypeId = result.userTypeId;
    initialFormValues.password = result.password;
    initialFormValues.mobileNumber = result.mobileNumber;
    initialFormValues.email = result.email;
    //initialFormValues.sendSms = result.sendSms;
    //initialFormValues.photo = result.photo;
   if(result.sendSms==='true')
   {
    setchkFlag(true);

   }
   else
   {
    setchkFlag(false);
   }
    form.setFieldsValue({
      userName: initialFormValues.userName,
      userTypeId: initialFormValues.userTypeId,
      password: initialFormValues.password,
      mobileNumber: initialFormValues.mobileNumber,
      email: initialFormValues.email,
     // sendSms: initialFormValues.sendSms,
      // photo: initialFormValues.photo,
    });
  };
  const getUserTypeList = async () => {
    const b = new BaseApi();
    const result = await b.getListKV("usertypes");
    //console.log(result);
    setUserTypeList(result);
  };

  useEffect(() => {
    getUserTypeList();
    if (!isAddMode) {
      getRecordData(id);
    }
  }, [id]);

  const onFinish = (values) => {
    // console.log('Success:', id + isAddMode);
    isAddMode ? insertData(values) : updateData(id, values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const insertData = async (data) => {
    // console.log('insert functio is call :', data);
    let postData = {
      id: id,
      userName: data.userName,
      userTypeId: data.userTypeId,
      password: data.password,
      mobileNumber: data.mobileNumber,
      email: data.email,
      sendSms: chkFlag,
      photo: "null",
      createdDttm: "" + new Date().getTime(),
      createdBy: 1,
    };
    console.log(postData);

    const baseApi = new BaseApi();
    const result = await baseApi.request("userregistrations", postData, "post");
    if (result.status === 200) {
      navigate("/user-registration", {
        state: { message: "Record is successfully created." },
      });
    }
  };
  const updateData = async (id, data) => {
    let postData = {
      id: id,
      userName: data.userName,
      userTypeId: data.userTypeId,
      password: data.password,
      mobileNumber: data.mobileNumber,
      email: data.email,
      sendSms: chkFlag,
      photo: "null",
      updatedDttm: "" + new Date().getTime(),
      updatedBy: 1,
    };
    console.log(postData);
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
  };
  const handleAlphabets = (e) => {
    return checkAlphabets(e);
  };
  const handleNumbers = (e) => {
    return checkNumbers(e);
  };
  const onChange = (e) => {
    console.log("in =" );
    console.log("checked =" + e.target.checked);
    setchkFlag(e.target.checked);
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
      //onSubmit={handleSubmit}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h3">
              {isAddMode ? "Create User" : "Edit User"}
            </Typography>
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
          </Stack>
        </Grid>

        <Grid item xs={4}>
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

        <Grid item xs={4}>
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

        <Grid item xs={4}>
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
            <Input onKeyPress={handleNumbers} />
          </Form.Item>
        </Grid>

        <Grid item xs={4}>
          <Form.Item label="Email Id" name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: false,
              message: 'Please input your E-mail!',
            },
          ]}
          >

            <Input />
          </Form.Item>
        </Grid>

        <Grid item xs={4}>
          <Form.Item label="Send SMS" name="sendSms" id="sendSms">
            <Checkbox                           
             checked={chkFlag}
            value={chkFlag}
             onChange={onChange}
           
            ></Checkbox>
            ;
          </Form.Item>
        </Grid>
      </Grid>
    </Form>
  );
};

export default UserRegistrationAdd;
