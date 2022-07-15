import { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { Link, useParams } from "react-router-dom";
import { Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BaseApi from "services/BaseApi";
import { checkAlphabets } from "../../../utility/Common";
const { TextArea } = Input;
const ProductSubGroupAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAddMode = !id;
  const [form] = Form.useForm();
  const [maingroupList, setMainGroupList] = useState([]);
  const [groupList, setGroupList] = useState([]);  
  const initialFormValues = {
    id: null,
    name: "",
    shortName: "",
    maingroupId: "",
    groupId: "",
    description: "",
  };
  
  const getRecordData = async (id) => {
    const b = new BaseApi();
    const result = await b.getById("productsubgroups", id);
    initialFormValues.name = result.name;
    initialFormValues.shortName = result.shortName;
    initialFormValues.maingroupId = result.maingroupId;
    initialFormValues.groupId = result.groupId;
    initialFormValues.description = result.description;

    form.setFieldsValue({
      name: initialFormValues.name,
      shortName: initialFormValues.shortName,
      maingroupId: initialFormValues.maingroupId,
      groupId: initialFormValues.groupId,
      description: initialFormValues.description,
    });
  };
  const getMainGroupList = async () => {
    const b = new BaseApi();
    const mainresult = await b.getListKV("productmaingroups");
    // console.log(mainresult);
    setMainGroupList(mainresult);
  };
  const getGroupList = async () => {
    const b = new BaseApi();
    const groupresult = await b.getListKV("productgroups");
    // console.log(groupresult);
    setGroupList(groupresult);
  };

  useEffect(() => {
    getMainGroupList();
    getGroupList();
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
    // console.log('insert functio is call :', data);
    let postData = {
      id: id,
      name: data.name,
      maingroupId: data.maingroupId,
      groupId: data.groupId,
      description: data.description,
      createdDttm: "" + new Date().getTime(),
      createdBy: 1,
    };

    const baseApi = new BaseApi();
    const result = await baseApi.request("productsubgroups", postData, "post");
    if (result.status === 200) {
      navigate("/productsubgroup", {
        state: { message: "Record is successfully created." },
      });
    }
  };
  const updateData = async (id, data) => {
    let postData = {
      id: id,
      name: data.name,
      maingroupId: data.maingroupId,
      groupId: data.groupId,
      description: data.description,
      updatedDttm: "" + new Date().getTime(),
      updatedBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request("productsubgroups", postData, "patch");
    if (result.status === 200) {
      navigate("/productsubgroup", {
        state: { message: "Record is successfully updated." },
      });
    }
  };
  const handleAlphabets = (e) => {
    return checkAlphabets(e);
  };
  const handleChange = (e) => {
    form.setFieldsValue({
      shortName: e.target.value,
    });
  };
  return (
    <Form
      name="frmproductsubgroup"
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
              {isAddMode ? "Create Sub Group" : "Edit Sub Group"}
            </Typography>
            <div>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px" }}
              >
                Save
              </Button>
              <Link to={"/productsubgroup"}>
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
             <Input onKeyPress={handleAlphabets} onChange={handleChange} />
          </Form.Item>
        </Grid>
        <Grid item xs={3}>
          <Form.Item label="Short Name" name="shortName">
            <Input />
          </Form.Item>
        </Grid>

        <Grid item xs={3}>
          <Form.Item
            label="Main Group"
            id="maingroupId"
            name="maingroupId"
            rules={[
              {
                required: true,
                message: "Please select main group.",
              },
            ]}
          >
            <Select
              placeholder="--- Select ---"              
            >
              {maingroupList &&
                maingroupList.map((row, index) => {
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
            label="Group"
            id="groupId"
            name="groupId"
            rules={[
              {
                required: true,
                message: "Please select group.",
              },
            ]}
          >
            <Select
              placeholder="--- Select ---"              
            >
              {groupList &&
                groupList.map((row, index) => {
                  return (
                    <option key={index} value={row.id}>
                      {row.name}
                    </option>
                  );
                })}
            </Select>
          </Form.Item>
        </Grid>
        <Grid item xs={6}>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} />
          </Form.Item>
        </Grid>
      </Grid>
    </Form>
  );
};

export default ProductSubGroupAdd;
