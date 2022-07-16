import { useEffect, useState } from "react";
import { Button, Form, Input, Select, DatePicker } from "antd";
import { Link, useParams } from "react-router-dom";
import { Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BaseApi from "services/BaseApi";
import { checkNumbers } from "../../../utility/Common";
import moment from 'moment';
const { TextArea } = Input;

const RateAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAddMode = !id;
  const [form] = Form.useForm();
  const [categoryList, setCategoryList] = useState([]);
  const [purityList, setPurityList] = useState([]);
  const [selectedCategoryId, setCategoryId] = useState([0]);
  const [subcategoryList, setSubCategoryList] = useState([]);
  const dateFormat = 'YYYY/MM/DD';
  const initialFormValues = {
    id: null,
    rateDate: "",    
    categoryId: "",
    subcategoryId: "",
    productId : 1,
    purityId: "",
    rateOne : "",
    rateTen :"",
    description: "",
  };

  const getRecordData = async (id) => {
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
    changeCategoryHandler(initialFormValues.categoryId);    
    form.setFieldsValue({
      rateDate: initialFormValues.rateDate,
      description: initialFormValues.description,
      purityId: initialFormValues.purityId,
      categoryId: initialFormValues.categoryId,
      subcategoryId: initialFormValues.subcategoryId,      
      rateOne: initialFormValues.rateOne,
      rateTen: initialFormValues.rateTen,
    });
  };

  const getCategoryList = async () => {
    const b = new BaseApi();
    const categoryresult = await b.getListKV("categories");    
    setCategoryList(categoryresult);
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
    if (!isAddMode) {
      getRecordData(id);      
    }
  }, [id]);

  const changeCategoryHandler = (value) => {
  //  console.log("Selected Country Id :" + value);
    if (value > 0) { setCategoryId
        form.setFieldsValue({            
            subcategoryId: '--- Select ---',
         });        
      setCategoryId(value);
      getSubCategoryList(value);
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
      rateDate: data.rateDate,
      description: data.description,
      purityId: data.purityId,
      categoryId: data.categoryId,
      subcategoryId: data.subcategoryId,
      productId: '1',
      rateOne: data.rateOne,
      rateTen: data.rateTen,
      createdDttm: "" + new Date().getTime(),
      createdBy: 1,
    };
    console.log(postData);
    
      const baseApi = new BaseApi();
     const result = await baseApi.request("rates", postData, "post");
      if (result.status === 200) {
        navigate("/rate", {
          state: { message: "Record is successfully created." },
       });
      }
  };
  const updateData = async (id, data) => {
    let postData = {
      id: id,
      rateDate: data.rateDate,
      description: data.description,
      purityId: data.purityId,
      categoryId: data.categoryId,
      subcategoryId: data.subcategoryId,
      productId: '1',
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
  };

  
  const handleNumbers = (e) => {
    return checkNumbers(e);
  };
  

  return (
    <Form
      ratedate="frmrate"
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
              {isAddMode ? "Create Rate" : "Edit Rate"}
            </Typography>
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
          </Stack>
        </Grid>

        <Grid item xs={3}>
          <Form.Item
            label="Date"
            name="rateDate"
            rules={[
              {
                required: true,
                message: "Please enter date.",
              },
            ]}
          >
            <DatePicker defaultValue={moment('2022/04/01', dateFormat)} format={dateFormat}  selected={rateDate} />
          </Form.Item>
        </Grid>        
       
        <Grid item xs={3}>
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
            <Select
              placeholder="--- Select ---"              
            >
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

        <Grid item xs={4}>
                    <Form.Item
                        label="Rate (1 gm)"
                        name="rateOne"
                        id="rateOne"                        
                        rules={[
                            {
                                required: true,                                
                                message: 'Please enter rate value.'
                            },
                            {
                                pattern:new RegExp(/^[0-9-.]*$/),
                                message: "Please enter a valid  rate value."
                              }
                        ]}
                    >
                        <Input onKeyPress={handleNumbers} />
                    </Form.Item>
                </Grid>
                <Grid item xs={4}>
                    <Form.Item
                        label="Rate (10 gm)"
                        name="rateTen"
                        id="rateTen"
                        
                        rules={[
                            {
                                required: true,                                
                                message: 'Please enter rate value.'
                            },
                            {
                                pattern:new RegExp(/^[0-9-.]*$/),
                                message: "Please enter a valid  rate value."
                              }
                        ]}
                    >
                        <Input onKeyPress={handleNumbers} />
                    </Form.Item>
                </Grid>

                <Grid item xs={4}>
                    <Form.Item
                        label="Description"
                        name="description"
                        id ="description"                        
                    >
                        <TextArea rows={2} />
                    </Form.Item>
                </Grid>
      </Grid>
    </Form>
  );
};

export default RateAdd;
