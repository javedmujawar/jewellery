import { useEffect, useState } from "react";
import { Button, Form, Input,Select } from "antd";
import { Link, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BaseApi from "services/BaseApi";
import MainCard from "components/MainCard";
import { checkAlphabets, checkNumbers } from "../../../utility/Common";

const { TextArea } = Input;
const ProductAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAddMode = !id;
  const [form] = Form.useForm();
  const [categoryList, setCategoryList] = useState([]);
  const [subcategoryList, setSubCategoryList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [unitList, setUnitList] = useState([]);
  
  const initialFormValues = {
    id: null,
    name: "",
    barcode: "",
    shortName: "",
    unitId : "",
    openingStock : "",
    categoryId: "",
    subcategoryId: "",
    colorId : "",
    description: "",
  };
 

  const getRecordData = async (id) => {
    const b = new BaseApi();
    const result = await b.getById("products", id);
    initialFormValues.name = result.name;
    initialFormValues.barcode = result.barcode;
    initialFormValues.shortName = result.shortName;
    initialFormValues.unitId = result.unitId;
    initialFormValues.openingStock = result.openingStock;
    initialFormValues.categoryId = result.categoryId;
    initialFormValues.subcategoryId = result.subcategoryId; 
    initialFormValues.colorId = result.colorId; 
    initialFormValues.description = result.description;

    form.setFieldsValue({
      name: initialFormValues.name,
      barcode: initialFormValues.barcode,
      shortName: initialFormValues.shortName,
      unitId: initialFormValues.unitId,
      openingStock: initialFormValues.openingStock,
      categoryId: initialFormValues.categoryId,
      subcategoryId: initialFormValues.subcategoryId,
      colorId: initialFormValues.colorId,
      description: initialFormValues.description,
    });
  };
  const getCategoryList = async () => {
    const b = new BaseApi();
    const result = await b.getListKV("categories");   
    setCategoryList(result);
  };
  const getColorList = async () => {
    const b = new BaseApi();
    const colorresult = await b.getListKV("colors");   
    setColorList(colorresult);
  };
  const getUnitList = async () => {
    const b = new BaseApi();
    const unitresult = await b.getListKV("units");   
    setUnitList(unitresult);
  };
  const getSubCategoryList = async (id) => {
    const b = new BaseApi();
    const sublist = await b.getListByParentId(
      "subcategories",
      "getListByCategoryId",
      id
    );
    setSubCategoryList(sublist);
  };

  useEffect(() => {
    getCategoryList();
    getColorList();
    getUnitList();

    if (!isAddMode) {
      getRecordData(id);
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

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
  const changeCategoryHandler = (opt) => {    
     if (opt > 0) {
       form.setFieldsValue({
         subcategoryId: "--- Select ---",
       });      
       getSubCategoryList(opt);
     }
  };
  const onFinish = (values) => {   
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
      unitId: data.unitId,
      openingStock: data.openingStock,
      categoryId: data.categoryId,
      subcategoryId: data.subcategoryId,
      colorId: data.colorId,
      description: data.description,
      createdDttm: "" + new Date().getTime(),
      createdBy: 1,
    };
console.log(postData);

    // const baseApi = new BaseApi();
    // const result = await baseApi.request("products", postData, "post");
    // if (result.status === 200) {
    //   navigate("/product", {
    //     state: { message: "Record is successfully created." },
    //   });
    // }
  };
  const updateData = async (id, data) => {
    let postData = {
      id: id,
      name: data.name,
      categoryId: data.categoryId,
      subcategoryId: data.subcategoryId,
      colorId: data.colorId,
      description: data.description,
      updatedDttm: "" + new Date().getTime(),
      updatedBy: 1,
    };
    // const baseApi = new BaseApi();
    // const result = await baseApi.request("products", postData, "patch");
    // if (result.status === 200) {
    //   navigate("/product", {
    //     state: { message: "Record is successfully updated." },
    //   });
    // }
  };

  return (
    <Form
      name="frmproduct"
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
        title={isAddMode ? "Create Product" : "Edit Product"}
        secondary={
          <div>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              Save
            </Button>
            <Link to={"/product"}>
              <Button type="danger">Cancel</Button>
            </Link>
          </div>
        }
      >
        <Typography variant="body2">
          <Grid container spacing={2}>
          <Grid item xs={3}>
              <Form.Item
                label="Barcode"
                name="barcode"
                id="barcode"
                rules={[
                  {
                    required: true,
                    message: "Please enter barcode.",
                  },
                  {
                    pattern: new RegExp(/^[0-9-]*$/),
                    message: "Please enter a valid  barcode value.",
                  },
                ]}
              >
                <Input  onKeyPress={handleNumbers} />
              </Form.Item>
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

            <Grid item xs={2}>
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
                <Input onKeyPress={handleAlphabets} />
              </Form.Item>
            </Grid>
            <Grid item xs={2}>
              <Form.Item
                label="Unit"
                id="unitId"
                name="unitId"
                rules={[
                  {
                    required: true,
                    message: "Please select unit.",
                  },
                ]}
              >
            <Select placeholder="--- Select ---">
              {unitList &&
                unitList.map((row, index) => {
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
              <Form.Item
                label="Opening Stock"
                name="openingStock"
                id="openingStock"
                rules={[
                  {
                    required: true,
                    message: "Please enter opening stock.",
                  },
                  {
                    pattern: new RegExp(/^[0-9]*$/),
                    message: "Please enter valid value.",
                  },
                ]}
              >
                <Input  onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid>            

            <Grid item xs={6}>
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
            <Select placeholder="--- Select ---" onChange={changeCategoryHandler}>
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
            <Grid item xs={6}>
              <Form.Item
                label="Sub Category"
                id="subcategoryId"
                name="subcategoryId"
                rules={[
                  {
                    required: true,
                    message: "Please select sub category.",
                  },
                ]}
              >
               <Select placeholder="--- Select ---">
              {subcategoryList &&
                subcategoryList.map((row, index) => {
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
              <Form.Item
                label="Color"
                id="colorId"
                name="colorId"
                rules={[
                  {
                    required: true,
                    message: "Please select color.",
                  },
                ]}
              >
               <Select placeholder="--- Select ---">
              {colorList &&
                colorList.map((row, index) => {
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
                <TextArea rows={3} />
              </Form.Item>
            </Grid>
          </Grid>
        </Typography>
      </MainCard>
    </Form>
  );
};

export default ProductAdd;
