import { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { Link, useParams } from "react-router-dom";
import { Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BaseApi from "services/BaseApi";
const { TextArea } = Input;
const SubCategoryAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAddMode = !id;
  const [form] = Form.useForm();
  const [categoryList, setCategoryList] = useState([]);
  const initialFormValues = {
    id: null,
    name: "",
    categoryId: "",   
    description: "",
  };
 
  const getRecordData = async (id) => {
    const b = new BaseApi();
    const result = await b.getById("subcategories", id);
    initialFormValues.name = result.name;
    initialFormValues.categoryId = result.categoryId;
    initialFormValues.description = result.description;

    form.setFieldsValue({
      name: initialFormValues.name,
      categoryId: initialFormValues.categoryId,
      description: initialFormValues.description,
    });
  };
  const getCategoryList = async () => {
    const b = new BaseApi();
    const result = await b.getListKV("categories");
    //console.log(result);
    setCategoryList(result);
  };

  useEffect(() => {
    getCategoryList();
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
      categoryId: data.categoryId,
      description: data.description,
      createdDttm: "" + new Date().getTime(),
      createdBy: 1,
    };

    const baseApi = new BaseApi();
    const result = await baseApi.request("subcategories", postData, "post");
    if (result.status === 200) {
      navigate("/subcategory", {
        state: { message: "Record is successfully created." },
      });
    }
  };
  const updateData = async (id, data) => {
    let postData = {
      id: id,
      name: data.name,
      categoryId: data.categoryId,
      description: data.description,
      updatedDttm: "" + new Date().getTime(),
      updatedBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request("subcategories", postData, "patch");
    if (result.status === 200) {
      navigate("/subcategory", {
        state: { message: "Record is successfully updated." },
      });
    }
  };

  return (
    <Form
      name="frmsubcategory"
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
              {isAddMode ? "Create Sub Category" : "Edit Sub Category"}
            </Typography>
            <div>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px" }}
              >
                Save
              </Button>
              <Link to={"/subcategory"}>
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
            <Input />
          </Form.Item>
        </Grid>

        <Grid item xs={4}>
          <Form.Item
            label="Category"
            id="categoryId"
            name="categoryId"
            rules={[
              {
                required: true,
                message: "Please select category.",
              },
            ]}
          >
            <Select placeholder="--- Select ---">
              {categoryList &&
                categoryList.map((row, index) => {
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
          <Form.Item label="Description" name="description">
            <TextArea rows={4} />
          </Form.Item>
        </Grid>
      </Grid>
    </Form>
  );
};

export default SubCategoryAdd;
