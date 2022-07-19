import { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { Link, useParams } from "react-router-dom";
import { Grid,  Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BaseApi from "services/BaseApi";
import { checkAlphabets, checkNumbers } from "../../../utility/Common";
import MainCard from "components/MainCard";

const VillageAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAddMode = !id;
  const [form] = Form.useForm();
  const [countryList, setCountryList] = useState([]);  
  const [stateList, setStateList] = useState([]);  
  const [districtList, setDistrictList] = useState(['']);
    const [talukaList, setTalukaList] = useState([]);
  const initialFormValues = {
    id: null,
    name: "",
    shortName: "",
    countryId: "",
    stateId: "",
    districtId: "",
    talukaId: "",
    code: "",
  };

  const getRecordData = async (id) => {
    const b = new BaseApi();
    const result = await b.getById("villages", id);
    initialFormValues.name = result.name;
    initialFormValues.shortName = result.shortName;
    initialFormValues.code = result.code;
    initialFormValues.countryId = result.countryId;
    initialFormValues.stateId = result.stateId;
    initialFormValues.districtId = result.districtId;
    initialFormValues.talukaId = result.talukaId;

    changeCountryHandler(result.countryId);
    changeStateHandler(result.stateId);
    changeDistrictHandler(result.districtId);

    form.setFieldsValue({
      name: initialFormValues.name,
      shortName: initialFormValues.shortName,
      code: initialFormValues.code,
      countryId: initialFormValues.countryId,
      stateId: initialFormValues.stateId,
      districtId: initialFormValues.districtId,
      talukaId: initialFormValues.talukaId,
    });
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
  useEffect(() => {
    getCountryList();
    if (!isAddMode) {
      getRecordData(id);
    }
  }, [id]);// eslint-disable-line react-hooks/exhaustive-deps

  const changeCountryHandler = (value) => {
    
    if (value > 0) {
      form.setFieldsValue({
        stateId: "--- Select ---",
       districtId: "--- Select ---",
        talukaId: "--- Select ---",
       
      });     
      setDistrictList('');  
      setTalukaList('');     
      getStateList(value);
    }
  };
  const changeStateHandler = (value) => {
    //console.log("Selected State Id :" + value);
    if (value > 0) {
      form.setFieldsValue({
        districtId: "--- Select ---",
        talukaId: "--- Select ---",
      });      
      setTalukaList('');   
      getDistrictList(value);
    }
  };

  const changeDistrictHandler = (value) => {
    //console.log("Selected State Id :" + value);
    if (value > 0) {
      form.setFieldsValue({
        talukaId: "--- Select ---",
      });     
      getTalukaList(value);
    }
  };

  const onFinish = (values) => {
    // console.log('Success:', id + isAddMode);
    isAddMode ? insertData(values) : updateData(id, values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const insertData = async (data) => {    
    let postData = {
      id: id,
      name: data.name,
      shortName: data.shortName,
      code: data.code,
      countryId: data.countryId,
      stateId: data.stateId,
      districtId: data.districtId,
      districtId: data.districtId,
      talukaId: data.talukaId,
      createdDttm: "" + new Date().getTime(),
      createdBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request("villages", postData, "post");
    if (result.status === 200) {
      navigate("/village", {
        state: { message: "Record is successfully created." },
      });
    }
  };
  const updateData = async (id, data) => {
    let postData = {
      id: id,
      name: data.name,
      shortName: data.shortName,
      code: data.code,
      countryId: data.countryId,
      stateId: data.stateId,
      districtId: data.districtId,
      talukaId: data.talukaId,
      updatedDttm: "" + new Date().getTime(),
      updatedBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request("villages", postData, "patch");
    if (result.status === 200) {
      navigate("/village", {
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
  const handleChange = (e) => {
    form.setFieldsValue({
      shortName: e.target.value,
    });
  };

  return (
    <Form
      name="frmvillage"
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
       <MainCard
        title={isAddMode ? "Create Village" : "Edit Village"}
        secondary={
          <div>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              Save
            </Button>
            <Link to={"/village"}>
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
            rules={[
              {
                required: true,
                message: "Please enter name.",
              },
            ]}
          >
           <Input onKeyPress={handleAlphabets} onChange={handleChange} />
          </Form.Item>
        </Grid>
        <Grid item xs={4}>
          <Form.Item label="Short Name" name="shortName" id="shortName">
            <Input />
          </Form.Item>
        </Grid>
        <Grid item xs={4}>
          <Form.Item
            label="Code"
            name="code"
            id="code"
            rules={[
              {
                required: true,
                message: "Please enter code.",
              },
              {
                pattern: new RegExp(/^[0-9]*$/),
                message: "Please enter a valid  code value.",
              },
            ]}
          >
           <Input onKeyPress={handleNumbers} />
          </Form.Item>
        </Grid>
        <Grid item xs={3}>
          <Form.Item
            label="Country"
            id="countryId"
            name="countryId"
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
        <Grid item xs={3}>
          <Form.Item
            label="State"
            id="stateId"
            name="stateId"
            rules={[
              {
                required: true,
                message: "Please select state.",
              },
            ]}
          >
            <Select placeholder="--- Select ---" onChange={changeStateHandler}>
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
        <Grid item xs={3}>
          <Form.Item
            label="District"
            id="districtId"
            name="districtId"
            rules={[
              {
                required: true,
                message: "Please select district.",
              },
            ]}
          >
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
        <Grid item xs={3}>
          <Form.Item
            label="Taluka"
            id="talukaId"
            name="talukaId"
            rules={[
              {
                required: true,
                message: "Please select taluka.",
              },
            ]}
          >
            <Select placeholder="--- Select ---">
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
      </Grid>
      </Typography>
      </MainCard>
    </Form>
  );
};

export default VillageAdd;
