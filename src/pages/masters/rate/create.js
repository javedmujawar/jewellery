import { useEffect, useState } from "react";
import { Button, Form, Input, Select, DatePicker } from "antd";
import { Link, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BaseApi from "services/BaseApi";
import { checkNumbers } from "../../../utility/Common";
import moment from "moment";
const { TextArea } = Input;
import MainCard from "components/MainCard";

const RateAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAddMode = !id;
  const [form] = Form.useForm();
  const [categoryList, setCategoryList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [purityList, setPurityList] = useState([]);  
  const [subcategoryList, setSubCategoryList] = useState([]);
  const dateFormat = "YYYY/MM/DD";
  const initialFormValues = {
    id: null,
    rateDate: "",
    categoryId: "",
    subcategoryId: "",
    productId: "",
    purityId: "",
    rateOne: "",
    rateTen: "",
    description: "",
  };

  const getRecordData = async (id) => {
    try 
    {
    const b = new BaseApi();
    const result = await b.getById("rates", id);

    initialFormValues.rateDate = result.rateDate;
    initialFormValues.purityId = result.purityId;
    initialFormValues.categoryId = result.categoryId;
    initialFormValues.subcategoryId = result.subcategoryId;
    initialFormValues.productId = result.productId;
    initialFormValues.rateOne = result.rateOne;
    initialFormValues.rateTen = result.rateTen;
    initialFormValues.description = result.description;
    changeCategoryHandler(result.categoryId);
    form.setFieldsValue({
      rateDate: initialFormValues.rateDate,
      description: initialFormValues.description,
      purityId: initialFormValues.purityId,
      categoryId: initialFormValues.categoryId,
      subcategoryId: initialFormValues.subcategoryId,
      productId: initialFormValues.productId,
      rateOne: initialFormValues.rateOne,
      rateTen: initialFormValues.rateTen,
    });
  } catch (error) {console.log("Error : "+error);}
  };

  const getCategoryList = async () => {
    const b = new BaseApi();
    const categoryresult = await b.getListKV("categories");
    setCategoryList(categoryresult);
  };
  const getProductList = async () => {
    const b = new BaseApi();
    const presult = await b.getListKV("products");
    setProductList(presult);
  };
  const getPurityList = async () => {
    const b = new BaseApi();
    const result = await b.getListKV("purities");
    setPurityList(result);
  };
  const getSubCategoryList = async (id) => {
    const b = new BaseApi();
    const result = await b.getListByParentId(
      "subcategories",
      "getListByCategoryId",
      id
    );
    setSubCategoryList(result);
  };
  useEffect(() => {
    getCategoryList();
    getPurityList();
    getProductList();
    if (!isAddMode) {
      getRecordData(id);
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const changeCategoryHandler = (value) => {   
    if (value > 0) {      
      // form.setFieldsValue({
      //   subcategoryId: "--- Select ---",
      // });     
      getSubCategoryList(value);
    }
  };

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
      rateDate:"" + new Date().getTime(),// data.rateDate,
      description: data.description,
      purityId: data.purityId,
      categoryId: data.categoryId,
      subcategoryId: data.subcategoryId,
      productId: data.productId,
      rateOne: data.rateOne,
      rateTen: data.rateTen,
      createdDttm: "" + new Date().getTime(),
      createdBy: 1,
    };
    //console.log(postData);
        const baseApi = new BaseApi();
    const result = await baseApi.request("rates", postData, "post");
    if (result.status === 200) {
      navigate("/rate", {
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
      rateDate: "" + new Date().getTime(),//data.rateDate,
      description: data.description,
      purityId: data.purityId,
      categoryId: data.categoryId,
      subcategoryId: data.subcategoryId,
      productId: data.productId,
      rateOne: data.rateOne,
      rateTen: data.rateTen,
      updatedDttm: "" + new Date().getTime(),
      updatedBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request("rates", postData, "patch");
    if (result.status === 200) {
      navigate("/rate", {
        state: { message: "Record is successfully updated." },
      });
    }
  } catch (error) {console.log("Error : "+error);}
  };

  const handleNumbers = (e) => {
    return checkNumbers(e);
  };

  return (
    <Form
      ratedate="frmrate"
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
        title={isAddMode ? "Create Product Rate" : "Edit Product Rate"}
        secondary={
          <div>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              Save
            </Button>
            <Link to={"/rate"}>
              <Button type="danger">Cancel</Button>
            </Link>
          </div>
        }
      >
        <Typography variant="body2">
          <Grid container spacing={2}>
            <Grid item xs={2}>
              <Form.Item
                label="Date"
                name="rateDate"
                rules={[
                  {
                    required: false,
                    message: "Please enter date.",
                  },
                ]}
              >
                {/* <DatePicker
                  defaultValue={moment("2022/04/01", dateFormat)}
                  format={dateFormat}
                  selected={rateDate}
                /> */}
                <Input onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid>

            <Grid item xs={2}>
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
                <Select
                  placeholder="--- Select ---"
                  onChange={changeCategoryHandler}
                >
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

            <Grid item xs={3}>
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
            <Grid item xs={3}>
              <Form.Item
                label="Product"
                id="productId"
                name="productId"
                rules={[
                  {
                    required: true,
                    message: "Please select product.",
                  },
                ]}
              >
                <Select placeholder="--- Select ---">
                  {productList &&
                    productList.map((row, index) => {
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
                label="Purity"
                id="purityId"
                name="purityId"
                rules={[
                  {
                    required: true,
                    message: "Please select purity.",
                  },
                ]}
              >
                <Select placeholder="--- Select ---">
                  {purityList &&
                    purityList.map((row, index) => {
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
                label="Rate (1 gm)"
                name="rateOne"
                id="rateOne"
                rules={[
                  {
                    required: true,
                    message: "Please enter rate value.",
                  },
                  {
                    pattern: new RegExp(/^[0-9-.]*$/),
                    message: "Please enter a valid  rate value.",
                  },
                ]}
              >
                <Input onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid>
            <Grid item xs={2}>
              <Form.Item
                label="Rate (10 gm)"
                name="rateTen"
                id="rateTen"
                rules={[
                  {
                    required: true,
                    message: "Please enter rate value.",
                  },
                  {
                    pattern: new RegExp(/^[0-9-.]*$/),
                    message: "Please enter a valid  rate value.",
                  },
                ]}
              >
                <Input onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid>

            <Grid item xs={4}>
              <Form.Item
                label="Description"
                name="description"
                id="description"
              >
                <TextArea rows={2} />
              </Form.Item>
            </Grid>
          </Grid>
        </Typography>
      </MainCard>
    </Form>
  );
};

export default RateAdd;
