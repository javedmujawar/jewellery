import { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { Link, useParams } from "react-router-dom";
import { Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BaseApi from "services/BaseApi";


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
    countryId : "",
    code: "",
  };
  
  const getRecordData = async (id) => {
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
  };

  const getCountryList = async () => {
    const b = new BaseApi();
    const counrtyresult = await b.getListKV("countries");
    //console.log(counrtyresult);
    setCountryList(counrtyresult);
  };
  useEffect(() => {
    getCountryList();
    if (!isAddMode) {
      getRecordData(id);
    }
  }, [id]);

  const onFinish = (values) => {
    //console.log('Success:', values);
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
  };
  const updateData = async (id, data) => {
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
    const result = await baseApi.request(
      "states",
      postData,
      "patch"
    );
    if (result.status === 200) {
      navigate("/state", {
        state: { message: "Record is successfully updated." },
      });
    }
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
              {isAddMode ? "Create State" : "Edit State"}
            </Typography>
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
          </Stack>
        </Grid>

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
            <Input />
          </Form.Item>
        </Grid>
        <Grid item xs={3}>
          <Form.Item label="Short Name" name="shortName" id="shortName">
            <Input />
          </Form.Item>
        </Grid>
        <Grid item xs={3}>
          <Form.Item label="Code" name="code" id="code"
          rules={[
            {
              required: true,
              message: "Please enter code.",
            },
            {
                pattern:new RegExp(/^[0-9]*$/),
                message: "Please enter a valid  code value."
              }
          ]}>
            <Input />
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
    </Form>
  );
};

export default StateAdd;
