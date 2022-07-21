import { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { Link, useParams } from "react-router-dom";
import { Grid,  Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BaseApi from "services/BaseApi";
const { TextArea } = Input;
import MainCard from "components/MainCard";
import Creatable from "react-select/creatable";
import { checkAlphabets } from "../../../utility/Common";
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
    console.log(result);
    initialFormValues.name = result.name;
    initialFormValues.categoryId = result.categoryId.value;
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
    let list = [];
    if (result) {
      list = result.map((row) => {
        return { label: row.name, value: row.id };
      });
    }  
    setCategoryList(list);
  };

  useEffect(() => {
    getCategoryList();
    if (!isAddMode) {
      getRecordData(id);
    }
  }, [id]);// eslint-disable-line react-hooks/exhaustive-deps

  const onFinish = (values) => {   
    // console.log('Success:', id + isAddMode);
    isAddMode ? insertData(values) : updateData(id, values);
  };
  const handleAlphabets = (e) => {
    return checkAlphabets(e);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const insertData = async (data) => {  
    
    if(data.categoryId.value>0)
    {
    let postData = {
      id: id,
      name: data.name,
      categoryId: data.categoryId.value,
      description: data.description,
      createdDttm: "" + new Date().getTime(),
      createdBy: 1,
    };
    console.log(postData);
     const baseApi = new BaseApi();
     const result = await baseApi.request("subcategories", postData, "post");
     if (result.status === 200) {
       navigate("/subcategory", {
         state: { message: "Record is successfully created." },
       });
     }
  }
  else
  {
    //console.log('New Category Item is Found:');
    let categoryData = {
      id: id,
      name: data.categoryId.value,
      description: data.categoryId.value,
      createdDttm: "" + new Date().getTime(),
      createdBy: 1,
    }
  
     const baseApi = new BaseApi();
     const result = await baseApi.request("categories", categoryData, "post");
     if (result.status === 200) {
     
      let postData = {
        id: id,
        name: data.name,
        categoryId: result.data.id,
        description: data.description,
        createdDttm: "" + new Date().getTime(),
        createdBy: 1,
      };
      //console.log(postData);
       const baseApi = new BaseApi();
        const newresult = await baseApi.request("subcategories", postData, "post");
        if (newresult.status === 200) {
         navigate("/subcategory", {
           state: { message: "Record is successfully created." },
        });
       }      
     }
  }
  };
  const updateData = async (id, data) => {
    if(data.categoryId.value>0)
    {    
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
  }
  else
  {
     console.log('New Category Item is Found:');
     let categoryData = {
      id: id,
      name: data.categoryId.value,
      description: data.categoryId.value,
      createdDttm: "" + new Date().getTime(),
      createdBy: 1,
    }
  
     const baseApi = new BaseApi();
     const result = await baseApi.request("categories", categoryData, "post");
     if (result.status === 200) {
     
      let postData = {
        id: id,
        name: data.name,
        categoryId: result.data.id,
        description: data.description,
        updatedDttm: "" + new Date().getTime(),
        updatedBy: 1,
      };
      //console.log(postData);
       const baseApi = new BaseApi();
        const newresult = await baseApi.request("subcategories", postData, "patch");
        if (newresult.status === 200) {
         navigate("/subcategory", {
           state: { message: "Record is successfully updated." },
        });
       }      
     }
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
       <MainCard
        title={isAddMode ? "Create Sub Categry" : "Edit Sub Category"}
        secondary={
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
            <Input onKeyPress={handleAlphabets} />
          </Form.Item>
        </Grid>

        {/* <Grid item xs={4}>
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
        </Grid> */}
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
                <Creatable options={categoryList} >                 
                </Creatable>
              </Form.Item>
            </Grid>
        <Grid item xs={4}>
          <Form.Item label="Description" name="description">
            <TextArea rows={4} />
          </Form.Item>
        </Grid>
      </Grid>
      </Typography>
      </MainCard>
    </Form>
  );
};

export default SubCategoryAdd;
