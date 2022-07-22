import { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { Link, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BaseApi from "services/BaseApi";
import { checkAlphabets } from "../../../utility/Common";
const { TextArea } = Input;
import MainCard from "components/MainCard";

const ProductMainGroupAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAddMode = !id;
  const [form] = Form.useForm();
  const initialFormValues = {
    id: null,
    name: "",
    shortName: "",
    description: "",
  };
  
  const getRecordData = async (id) => {
    try 
    {
    const b = new BaseApi();
    const result = await b.getById("productmaingroups", id);
    initialFormValues.name = result.name;
    initialFormValues.shortName = result.shortName;
    initialFormValues.description = result.description;

    form.setFieldsValue({
      name: initialFormValues.name,
      shortName: initialFormValues.shortName,
      description: initialFormValues.description,
    });
  } catch (error) {console.log("Error : "+error);}
  };

  useEffect(() => {   
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
      description: data.description,
      createdDttm: "" + new Date().getTime(),
      createdBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request("productmaingroups", postData, "post");
    if (result.status === 200) {
      navigate("/product-main-group", {
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
      description: data.description,
      updatedDttm: "" + new Date().getTime(),
      updatedBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request(
      "productmaingroups",
      postData,
      "patch"
    );
    if (result.status === 200) {
      navigate("/product-main-group", {
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
      name="frmproductmaingroup"
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
        title={isAddMode ? "Create Main Group" : "Edit Main Group"}
        secondary={
          <div>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              Save
            </Button>
            <Link to={"/product-main-group"}>
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
                    message: "Please enter group name.",
                  },
                ]}
              >
                <Input onKeyPress={handleAlphabets} onChange={handleChange} />
              </Form.Item>
            </Grid>
            <Grid item xs={4}>
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
            <Grid item xs={4}>
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

export default ProductMainGroupAdd;
