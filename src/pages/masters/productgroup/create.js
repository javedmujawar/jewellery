import { useEffect,useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { Link, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BaseApi from "services/BaseApi";
import { checkAlphabets } from "../../../utility/Common";
const { TextArea } = Input;
import MainCard from "components/MainCard";

const ProductGroupAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAddMode = !id;
  const [form] = Form.useForm();
  const [maingroupList, setMainGroupList] = useState([]);
  const initialFormValues = {
    id: null,
    name: "",
    shortName: "",
    maingroupId: "",
    description: "",
  };

  const getRecordData = async (id) => {
    try 
    {
    const b = new BaseApi();
    const result = await b.getById("productgroups", id);
    initialFormValues.name = result.name;
    initialFormValues.shortName = result.shortName;
    initialFormValues.maingroupId = result.maingroupId;
    initialFormValues.description = result.description;

    form.setFieldsValue({
      name: initialFormValues.name,
      shortName: initialFormValues.shortName,
      maingroupId: initialFormValues.maingroupId,
      description: initialFormValues.description,
    });
  } catch (error) {console.log("Error : "+error);}
  };
  const getMainGroupList = async () => {
    const b = new BaseApi();
    const mainresult = await b.getListKV("productmaingroups");
    setMainGroupList(mainresult);
  };

  useEffect(() => {
    getMainGroupList();
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
      maingroupId: data.maingroupId,
      description: data.description,
      createdDttm: "" + new Date().getTime(),
      createdBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request("productgroups", postData, "post");
    if (result.status === 200) {
      navigate("/productgroup", {
        state: { message: "Record is successfully created." },
      });
    }
  } catch (error) {console.log("Error : "+error);}
  };
  const updateData = async (id, data) => {
    try{
    let postData = {
      id: id,
      name: data.name,
      shortName: data.shortName,
      maingroupId: data.maingroupId,
      description: data.description,
      updatedDttm: "" + new Date().getTime(),
      updatedBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request("productgroups", postData, "patch");
    if (result.status === 200) {
      navigate("/productgroup", {
        state: { message: "Record is successfully updated." },
      });
    }
  } catch (error) {console.log("Error : "+error);}
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
      name="frmproductgroup"
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
        title={isAddMode ? "Create Group" : "Edit Group"}
        secondary={
          <div>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              Save
            </Button>
            <Link to={"/productgroup"}>
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
                    message: "Please enter group name.",
                  },
                ]}
              >
                <Input onKeyPress={handleAlphabets} onChange={handleChange} />
              </Form.Item>
            </Grid>
            <Grid item xs={3}>
              <Form.Item
                label="Short Name"
                name="shortName"
                id="shortName"
                rules={[
                  {
                    required: true,
                    message: "Please enter short name.",
                  },
                ]}
              >
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
                        <Option key={index} value={row.id}>
                          {row.name}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Grid>
            <Grid item xs={3}>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please enter description.",
                  },
                ]}
              >
                <TextArea rows={4} />
              </Form.Item>
            </Grid>
          </Grid>
        </Typography>
      </MainCard>
    </Form>
  );
};

export default ProductGroupAdd;
