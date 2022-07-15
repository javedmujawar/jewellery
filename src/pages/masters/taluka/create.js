import { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { Link, useParams } from "react-router-dom";
import { Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BaseApi from "services/BaseApi";
import { checkAlphabets, checkNumbers } from "../../../utility/Common";

const TalukaAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAddMode = !id;
  const [form] = Form.useForm();
  const [countryList, setCountryList] = useState([]);
  const [selectedCountryId, setCountryId] = useState(0);
  const [stateList, setStateList] = useState([]);
  const [selectedStateId, setStateId] = useState(0);

  const [districtList, setDistrictList] = useState([]);
  //const [selectedStateId, setStateId] = useState(0);
  const initialFormValues = {
    id: null,
    name: "",
    shortName: "",
    countryId: "",
    stateId: "",
    districtId: "",
    code: "",
  };

  const getRecordData = async (id) => {
    const b = new BaseApi();
    const result = await b.getById("talukas", id);
    initialFormValues.name = result.name;
    initialFormValues.shortName = result.shortName;
    initialFormValues.code = result.code;
    initialFormValues.countryId = result.countryId;
    initialFormValues.stateId = result.stateId;
    initialFormValues.districtId = result.districtId;
    changeCountryHandler(initialFormValues.countryId);   
    changeStateHandler(result.stateId); 
    form.setFieldsValue({
      name: initialFormValues.name,
      shortName: initialFormValues.shortName,
      code: initialFormValues.code,
      countryId: initialFormValues.countryId,
      stateId: initialFormValues.stateId,
      districtId: initialFormValues.districtId,
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
    //console.log(stateresult);
    setStateList(stateresult);  
  };

  const getDistrictList = async (id) => {
    const b = new BaseApi();    
    const result = await b.getListByParentId(
      "districts",
      "getListByStateId",
      id
    );
    //console.log(result);
    setDistrictList(result);  
   
  };
  useEffect(() => {
    getCountryList();
    if (!isAddMode) {
      getRecordData(id);      
    }
  }, [id]);

  const changeCountryHandler = (value) => {
  //  console.log("Selected Country Id :" + value);
    if (value > 0) { 
        form.setFieldsValue({            
            stateId: '--- Select ---',
            districtId: '--- Select ---',
         });  
         setDistrictList('');       
      setCountryId(value);
      getStateList(value);

    }
  };
  const changeStateHandler = (value) => {
      //console.log("Selected State Id :" + value);
      if (value > 0) { 
          form.setFieldsValue({            
              districtId: '--- Select ---',
           });        
        setStateId(value);
        getDistrictList(value);
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
    //  console.log('insert functio is call :', data);
    let postData = {
      id: id,
      name: data.name,
      shortName: data.shortName,
      code: data.code,
      countryId: data.countryId,
      stateId: data.stateId,
      districtId: data.districtId,
      createdDttm: "" + new Date().getTime(),
      createdBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request("talukas", postData, "post");
    if (result.status === 200) {
      navigate("/taluka", {
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
      updatedDttm: "" + new Date().getTime(),
      updatedBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request("talukas", postData, "patch");
    if (result.status === 200) {
      navigate("/taluka", {
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
      name="frmtaluka"
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
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h3">
              {isAddMode ? "Create Taluka" : "Edit Taluka"}
            </Typography>
            <div>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px" }}
              >
                Save
              </Button>
              <Link to={"/taluka"}>
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
        <Grid item xs={4}>
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
        <Grid item xs={4}>
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
            <Select placeholder="--- Select ---"  onChange={changeStateHandler}>
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
        <Grid item xs={4}>
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
            <Select placeholder="--- Select ---" >
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
      </Grid>
    </Form>
  );
};

export default TalukaAdd;
