import { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { Link, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BaseApi from "services/BaseApi";
import { checkAlphabets, checkNumbers } from "../../../utility/Common";
import MainCard from "components/MainCard";

const StateAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAddMode = !id;
  const [form] = Form.useForm();
  const [countryList, setCountryList] = useState([]);
  const initialFormValues = {
    id: null,
    name: "",
    shortName: "",
    countryId: "",
    code: "",
  };

  const getRecordData = async (id) => {
    try 
    {
    const b = new BaseApi();
    const result = await b.getById("states", id);
    initialFormValues.name = result.name;
    initialFormValues.shortName = result.shortName;
    initialFormValues.code = result.code;
    initialFormValues.countryId = result.countryId;

    form.setFieldsValue({
      name: initialFormValues.name,
      shortName: initialFormValues.shortName,
      code: initialFormValues.code,
      countryId: initialFormValues.countryId,
    });
  } catch (error) {console.log("Error : "+error);}
  };

  const getCountryList = async () => {
    const b = new BaseApi();
    const counrtyresult = await b.getListKV("countries");
    setCountryList(counrtyresult);
  };
  useEffect(() => {
    getCountryList();
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
    let postData = {
      id: id,
      name: data.name,
      shortName: data.shortName,
      code: data.code,
      countryId: data.countryId,
      createdDttm: "" + new Date().getTime(),
      createdBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request("states", postData, "post");
    if (result.status === 200) {
      navigate("/state", {
        state: { message: "Record is successfully created." },
      });
    }
  } catch (error) {console.log("Error : "+error);}
  };
  const updateData = async (id, data) => {
    try 
    {
    let postData = {
      id: id,
      name: data.name,
      shortName: data.shortName,
      code: data.code,
      countryId: data.countryId,
      updatedDttm: "" + new Date().getTime(),
      updatedBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request("states", postData, "patch");
    if (result.status === 200) {
      navigate("/state", {
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
  const handleChange = (e) => {
    form.setFieldsValue({
      shortName: e.target.value,
    });
  };

  return (
    <Form
      name="frmstate"
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
        title={isAddMode ? "Create State" : "Edit State"}
        secondary={
          <div>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              Save
            </Button>
            <Link to={"/state"}>
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
                    message: "Please enter name.",
                  },
                ]}
              >
                <Input onKeyPress={handleAlphabets} onChange={handleChange} />
              </Form.Item>
            </Grid>
            <Grid item xs={3}>
              <Form.Item label="Short Name" name="shortName" id="shortName">
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
                <Select placeholder="--- Select ---">
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
          </Grid>
        </Typography>
      </MainCard>
    </Form>
  );
};

export default StateAdd;
