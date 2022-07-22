import { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  DatePicker,
  Select,
  Checkbox,
  Upload,
} from "antd";
import { Link, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BaseApi from "services/BaseApi";
const { TextArea } = Input;
import MainCard from "components/MainCard";
import { checkAlphabets, checkNumbers } from "../../../utility/Common";
import moment from "moment";
import { UploadOutlined } from "@ant-design/icons";

const EmployeeAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAddMode = !id;
  const [form] = Form.useForm();
  const dateFormat = "YYYY/MM/DD";
  const [genderList, setGenderList] = useState([]);
 
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([""]);
  const [talukaList, setTalukaList] = useState([]);
  const [villageList, setVillageList] = useState([]);
 
  const [usertypeList, setUserTypeList] = useState([]);
  const [bloodgroupList, setBloodGroupList] = useState([]);
  const [roleList, setRolList] = useState([]);
  const [maritalList, setMaritalList] = useState([]);

  const [chkSmsFlag, setchkSmsFlag] = useState(0);
  const [chkWsmsFlag, setchkWSmsFlag] = useState(0);
  const initialFormValues = {
    id: null,
    name: "",
    marathiName: "",
    primaryMobile: "",
    secondaryMobile: "",
    address: "",
    birthDate: "",
    genderId: "",
    photo: "",
    email: "",
    verificationNum: "",
    dateofjoining: "",
    maritalstatusId: "",
    roleId: "",
    countryId: "",
    stateId: "",
    districtId: "",

    talukaId: "",
    villageId: "",
    pinCode: "",
    pancardNumber: "",
    adharcardNumber: "",
    bloodgroupId: "",
    refNumber : "",
    usertypeId: "",
    registrationDate: "",
    sendSms: "",
    sendwhatsappSms: "",
  };

  const getRecordData = async (id) => {
    const b = new BaseApi();
    const result = await b.getById("employees", id);
    initialFormValues.name = result.name;
    initialFormValues.marathiName = result.marathiName;
    initialFormValues.primaryMobile = result.primaryMobile;
    initialFormValues.secondaryMobile = result.secondaryMobile;
    initialFormValues.address = result.address;
    initialFormValues.birthDate = result.birthDate;
    initialFormValues.genderId = result.genderId;
    initialFormValues.photo = result.photo;

    initialFormValues.email = result.email;
    initialFormValues.verificationNum = result.verificationNum;
    initialFormValues.dateofjoining = result.dateofjoining;
    initialFormValues.maritalstatusId = result.maritalstatusId;
    initialFormValues.roleId = result.roleId;

    initialFormValues.countryId = result.countryId;
    changeCountryHandler(result.countryId);
    initialFormValues.stateId = result.stateId;
    changeStateHandler(result.stateId);
    initialFormValues.districtId = result.districtId;
    changeDistrictHandler(result.districtId);
    initialFormValues.talukaId = result.talukaId;
    changeTalukaHandler(result.talukaId);
    initialFormValues.villageId = result.villageId;

    initialFormValues.pinCode = result.pinCode;
    initialFormValues.pancardNumber = result.pancardNumber;
    initialFormValues.adharcardNumber = result.adharcardNumber;
    initialFormValues.bloodgroupId = result.bloodgroupId;
    initialFormValues.refNumber = result.refNumber;
    initialFormValues.usertypeId = result.usertypeId;
    initialFormValues.registrationDate = result.registrationDate;
   
    if (result.sendSms === 1) {
      setchkSmsFlag(true);
    } else {
      setchkSmsFlag(false);
    }
    if (result.sendwhatsappSms === 1) {
      setchkWSmsFlag(true);
    } else {
      setchkWSmsFlag(false);
    }
    
    form.setFieldsValue({
      name: initialFormValues.name,
      marathiName: initialFormValues.marathiName,
      primaryMobile: initialFormValues.primaryMobile,
      secondaryMobile: initialFormValues.secondaryMobile,
      address: initialFormValues.address,
      birthDate: "null", //initialFormValues.birthDate,

      genderId: initialFormValues.genderId,
      photo: "null",
      email: initialFormValues.email,
      verificationNum: initialFormValues.verificationNum,
      dateofjoining: initialFormValues.dateofjoining,
      maritalstatusId: initialFormValues.maritalstatusId,

      roleId: initialFormValues.roleId,
      countryId: initialFormValues.countryId,
      stateId: initialFormValues.stateId,
      districtId: initialFormValues.districtId,
      talukaId: initialFormValues.talukaId,
      villageId: initialFormValues.villageId,

      pinCode: initialFormValues.pinCode,
      pancardNumber: initialFormValues.pancardNumber,
      adharcardNumber: initialFormValues.adharcardNumber,
      bloodgroupId: initialFormValues.bloodgroupId,
      refNumber: initialFormValues.refNumber,
      usertypeId: initialFormValues.usertypeId,
      registrationDate: "null", //initialFormValues.registrationDate,
    });
  };
  const getGenderList = async () => {
    const b = new BaseApi();
    const genderresult = await b.getListKV("genders");
    setGenderList(genderresult);
  };
  
  const getCountryList = async () => {
    const b = new BaseApi();
    const counrtyresult = await b.getListKV("countries");
    setCountryList(counrtyresult);
  };
  const getStateList = async (id) => {
    const b = new BaseApi();
    const stateresult = await b.getListByParentId(
      "states",
      "getListByCountryId",
      id
    );
    setStateList(stateresult);
  };

  const getDistrictList = async (id) => {
    const b = new BaseApi();
    const result = await b.getListByParentId(
      "districts",
      "getListByStateId",
      id
    );
    setDistrictList(result);
  };

  const getTalukaList = async (id) => {
    const b = new BaseApi();
    const result = await b.getListByParentId(
      "talukas",
      "getListByDistrictId",
      id
    );
    setTalukaList(result);
  };

  const getVillageList = async (id) => {
    const b = new BaseApi();
    const result = await b.getListByParentId(
      "villages",
      "getListByTalukaId",
      id
    );
    setVillageList(result);
  };
  

  const getUserTypeList = async () => {
    const b = new BaseApi();
    const result = await b.getListKV("usertypes");
    setUserTypeList(result);
  };
  const getBloodGroupList = async () => {
    const b = new BaseApi();
    const bloodresult = await b.getListKV("bloodgroups");
    setBloodGroupList(bloodresult);
  };
  const getRoleList = async () => {
    const b = new BaseApi();
    const roleresult = await b.getListKV("roles");
    setRolList(roleresult);
  };

  const getMaritalList = async () => {
    const b = new BaseApi();
    const result = await b.getListKV("maritalstatuses");
    setMaritalList(result);
  };
  

  useEffect(() => {
    getGenderList();    
    getCountryList();   
    getUserTypeList();
    getBloodGroupList();
    getRoleList();
    getMaritalList();
    if (!isAddMode) {
      getRecordData(id);
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const onFinish = (values) => {
    // console.log('Success:', id + isAddMode);
    isAddMode ? insertData(values) : updateData(id, values);
  };
  const onSmsChange = (e) => {
    //console.log("checked =" + e.target.checked);
    setchkSmsFlag(e.target.checked);
  };
  const onWsmsChange = (e) => {
    //console.log("checked =" + e.target.checked);
    setchkWSmsFlag(e.target.checked);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const handleAlphabets = (e) => {
    return checkAlphabets(e);
  };
  const handleNumbers = (e) => {
    return checkNumbers(e);
  };

  const changeCountryHandler = (value) => {
    if (value > 0) {
      //  form.setFieldsValue({
      //   //  stateId: "--- Select ---",
      //   //  districtId: "--- Select ---",
      //   // talukaId: "--- Select ---",
      //   //  villageId: "--- Select ---",     
        
      //  });
      setDistrictList("");
      setTalukaList("");
      setVillageList("");
      getStateList(value);
    }
  };
  const changeStateHandler = (value) => {   
    if (value > 0) {
    //    form.setFieldsValue({
    //      districtId: "",
    //      talukaId: "",
    //      villageId: "",
    //  });
      setTalukaList("");
      setVillageList("");
      getDistrictList(value);
    }
  };

  const changeDistrictHandler = (value) => {   
    if (value > 0) {
      //  form.setFieldsValue({
      //    talukaId: "",
      //    villageId: "",
      //  });
      setVillageList("");
      getTalukaList(value);
    }
  };
  const changeTalukaHandler = (value) => {   
    if (value > 0) {
      //  form.setFieldsValue({
      //    villageId: "",
      //  });
      getVillageList(value);
    }
  };
  const insertData = async (data) => {
    try 
    {
    let smsFlg = 0;
    let wsmsFlg = 0;
    if (chkSmsFlag === true) {
      smsFlg = 1;
    }
    if (chkWsmsFlag === true) {
      wsmsFlg = 1;
    }

    let postData = {
      id: id,
      name: data.name,
      marathiName: data.marathiName,
      primaryMobile: data.primaryMobile,
      secondaryMobile: data.secondaryMobile,
      address: data.address,

      birthDate: "" + new Date().getTime(), //data.birthDate,
      genderId: data.genderId,
      photo: "null",
      email: data.email,
      verificationNum: data.verificationNum,

      dateofjoining:  "" + new Date().getTime(),//data.dateofjoining,
      maritalstatusId: data.maritalstatusId,
      roleId: data.roleId,      
      countryId: data.countryId,

      stateId: data.stateId,
      districtId: data.districtId,
      talukaId: data.talukaId,
      villageId: data.villageId,
      pinCode: data.pinCode,

      pancardNumber: data.pancardNumber,
      adharcardNumber: data.adharcardNumber,
      bloodgroupId: data.bloodgroupId,
      refNumber: data.refNumber,
      usertypeId: data.usertypeId,
      registrationDate: "" + new Date().getTime(), //data.registrationDate,

      sendSms: smsFlg,
      sendwhatsappSms: wsmsFlg,
      createdDttm: "" + new Date().getTime(),
      createdBy: 1,
    };
    console.log(postData);
    const baseApi = new BaseApi();
    const result = await baseApi.request("employees", postData, "post");
    if (result.status === 200) {
      navigate("/employee", {
        state: { message: "Record is successfully created." },
      });
    }
  } catch (error) {console.log("Error : "+error);}
  };
  const updateData = async (id, data) => {
    try 
    {
    let smsFlg = 0;
    let wsmsFlg = 0;
    if (chkSmsFlag === true) {
      smsFlg = 1;
    }
    if (chkWsmsFlag === true) {
      wsmsFlg = 1;
    }
    let postData = {
      id: id,
      name: data.name,
      marathiName: data.marathiName,
      primaryMobile: data.primaryMobile,
      secondaryMobile: data.secondaryMobile,
      address: data.address,

      birthDate: "" + new Date().getTime(), //data.birthDate,
      genderId: data.genderId,
      photo: "null",
      email: data.email,
      verificationNum: data.verificationNum,

      dateofjoining: data.dateofjoining,
      maritalstatusId: data.maritalstatusId,
      roleId: data.roleId,
      email: data.email,
      countryId: data.countryId,

      stateId: data.stateId,
      districtId: data.districtId,
      talukaId: data.talukaId,
      villageId: data.villageId,
      pinCode: data.pinCode,

      pancardNumber: data.pancardNumber,
      adharcardNumber: data.adharcardNumber,
      bloodgroupId: data.bloodgroupId,
      refNumber: data.refNumber,
      usertypeId: data.usertypeId,
      registrationDate: "" + new Date().getTime(), //data.registrationDate,
      //sendSms: 0,
      sendSms: smsFlg,
      sendwhatsappSms: wsmsFlg,
      updatedDttm: "" + new Date().getTime(),
      updatedBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request("employees", postData, "patch");
    if (result.status === 200) {
      navigate("/employee", {
        state: { message: "Record is successfully updated." },
      });
    }
  } catch (error) {console.log("Error : "+error);}
  };

  return (
    <Form
      name="frmemployee"
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
        title={isAddMode ? "Create Employee" : "Edit Employee"}
        secondary={
          <div>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              Save
            </Button>
            <Link to={"/employee"}>
              <Button type="danger">Cancel</Button>
            </Link>
          </div>
        }
      >
        <Typography variant="body2">
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Form.Item
                label="Name"
                name="name"
                id="name"
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
                label="Marathi Name"
                name="marathiName"
                id="marathiName"
                rules={[
                  {
                    required: true,
                    message: "Please enter marathi name.",
                  },
                ]}
              >
                <Input onKeyPress={handleAlphabets} />
              </Form.Item>
            </Grid>
            <Grid item xs={2}>
              <Form.Item
                label="Primary Mobile"
                name="primaryMobile"
                id="primaryMobile"
                rules={[
                  {
                    required: true,
                    message: "Please enter primary mobile no.",
                  },
                  {
                    pattern: new RegExp(/^[0-9]*$/),
                    message: "Please enter a valid value.",
                  },
                ]}
              >
                <Input maxLength={10} onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid>
            <Grid item xs={2}>
              <Form.Item
                label="Secondary Mobile"
                name="secondaryMobile"
                id="secondaryMobile"
                maxLength={10}
                rules={[
                  {
                    pattern: new RegExp(/^[0-9]*$/),
                    message: "Please enter a valid value.",
                  },
                ]}
              >
                <Input maxLength={10} onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid>
           
            <Grid item xs={4}>
              <Form.Item
                label="Address"
                name="address"
                id="address"
                rules={[
                  {
                    required: true,
                    message: "Please enter address.",
                  },
                ]}
              >
                <TextArea rows={2} onKeyPress={handleAlphabets} />
              </Form.Item>
            </Grid>

            {/* <Grid item xs={2}>
              <Form.Item
                label="Birth Date"
                name="birthDate"
                id="birthDate"
                rules={[
                  {
                    required: false,
                    message: "Please enter birth date.",
                  },
                ]}
              >
                <DatePicker
                  defaultValue={moment("1990/01/01", dateFormat)}
                  format={dateFormat}
                />
              </Form.Item>
            </Grid> */}

            <Grid item xs={2}>
              <Form.Item label="Gender" id="genderId" name="genderId">
                <Select placeholder="--- Select ---">
                  {genderList &&
                    genderList.map((row, index) => {
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
              <Form.Item label="Photo" name="photo" id="photo">
                <Upload name="photo" listType="picture">
                  <Button icon={<UploadOutlined />}>Choose File</Button>
                </Upload>
              </Form.Item>
            </Grid>

            <Grid item xs={3}>
              <Form.Item
                label="Email Id"
                name="email"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Grid>
            <Grid item xs={2}>
              <Form.Item label="Marital Status" id="maritalstatusId" name="maritalstatusId">
                <Select placeholder="--- Select ---">
                  {maritalList &&
                    maritalList.map((row, index) => {
                      return (
                        <option key={index} value={row.id}>
                          {row.name}
                        </option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Grid>

            <Grid item xs={3}>
              <Form.Item label="Driving Licence" name="verificationNum" id="verificationNum"
              rules={[
                {
                    required: true,
                    message: 'Please enter driving license number.'
                },
            ]}
              >
                <Input onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid>

            <Grid item xs={2}>
              <Form.Item
                label="Date of Joining"
                name="dateofjoining"
                id="dateofjoining"
              >
                <Input onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid>
            

            <Grid item xs={2}>
              <Form.Item label="Role" id="roleId" name="roleId">
                <Select placeholder="--- Select ---">
                  {roleList &&
                    roleList.map((row, index) => {
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
              <Form.Item label="Country" id="countryId" name="countryId"
               rules={[
                {
                  required: true,
                  message: "Please select country.",
                },
              ]}
              >
                <Select
                  placeholder="--- Select ---"
                  onChange={changeCountryHandler}
                >
                  {countryList &&
                    countryList.map((row, index) => {
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
              <Form.Item label="State" id="stateId" name="stateId">
                <Select
                  placeholder="--- Select ---"
                  onChange={changeStateHandler}
                >
                  {stateList &&
                    stateList.map((row, index) => {
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
              <Form.Item label="District" id="districtId" name="districtId">
                <Select
                  placeholder="--- Select ---"
                  onChange={changeDistrictHandler}
                >
                  {districtList &&
                    districtList.map((row, index) => {
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
              <Form.Item label="Taluka" id="talukaId" name="talukaId">
                <Select
                  placeholder="--- Select ---"
                  onChange={changeTalukaHandler}
                >
                  {talukaList &&
                    talukaList.map((row, index) => {
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
              <Form.Item label="Village" id="villageId" name="villageId">
                <Select placeholder="--- Select ---">
                  {villageList &&
                    villageList.map((row, index) => {
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
              <Form.Item label="Pin Code" name="pinCode" id="pinCode">
                <Input maxLength={6} onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid>
            
            <Grid item xs={2}>
              <Form.Item label="Blood Group" id="bloodgroupId" name="bloodgroupId">
                <Select placeholder="--- Select ---">
                  {bloodgroupList &&
                    bloodgroupList.map((row, index) => {
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
              <Form.Item label="Reference Number" name="refNumber" id="refNumber">
                <Input maxLength={10} onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid>

            <Grid item xs={2}>
              <Form.Item
                label="Pan Card Number"
                name="pancardNumber"
                id="pancardNumber"
              >
                <Input maxLength={10} />
              </Form.Item>
            </Grid>
            <Grid item xs={2}>
              <Form.Item
                label="Aadhar Card Number"
                name="adharcardNumber"
                id="adharcardNumber"
              >
                <Input maxLength={12} onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid>

            <Grid item xs={2}>
              <Form.Item label="User Type" id="usertypeId" name="usertypeId">
                <Select placeholder="--- Select ---">
                  {usertypeList &&
                    usertypeList.map((row, index) => {
                      return (
                        <option key={index} value={row.id}>
                          {row.name}
                        </option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Grid>
            {/* <Grid item xs={2}>
              <Form.Item
                label="Registration Date"
                name="registrationDate"
                id="registrationDate"
              >
                <DatePicker
                  defaultValue={moment("1990/01/01", dateFormat)}
                  format={dateFormat}
                />
              </Form.Item>
            </Grid> */}
            <Grid item xs={2}>
              <Form.Item label="Send SMS" name="sendSms" id="sendSms">
                <Checkbox
                  checked={chkSmsFlag}
                  onChange={onSmsChange}
                ></Checkbox>
              </Form.Item>
            </Grid>

            <Grid item xs={2}>
              <Form.Item
                label="Send Whatsapp SMS"
                name="sendwhatsappSms"
                id="sendwhatsappSms"
              >
                <Checkbox
                  checked={chkWsmsFlag}
                  onChange={onWsmsChange}
                ></Checkbox>
              </Form.Item>
            </Grid>
          </Grid>
        </Typography>
      </MainCard>
    </Form>
  );
};

export default EmployeeAdd;
