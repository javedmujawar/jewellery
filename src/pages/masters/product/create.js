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
  const [unitList, setUnitList] = useState([]);
  const [purityList, setPurityList] = useState([]);
  const [maingroupList, setMainGroupList] = useState([]);
  const [groupList, setGroupList] = useState([]);
  const [subgroupList, setSubGroupList] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [shapeList, setShapeList] = useState([]);
  const [hsnsacList, setHsnSacList] = useState([]);
  const [gstList, setGstList] = useState([]);
  const [warehouseList, setwarehouseList] = useState([]);
  
  const initialFormValues = {
    id: null,
    name: "",
    barcode: "",
    shortName: "",
    unitId : "",
    openingStock : "",
    categoryId: "",
    subcategoryId: "",
    purityId : "",    
    maingroupId :  "",
    groupId :  "",
    subgroupId : "",
    companyId :   "",
    colorId : "",
    sizeId :  "",
    shapeId:  "",
    hsnsacId :  "",
    gstId : "",
    warehouseId : "",
    weight : "",
    hight : "",
    storageLocation : "",
    purchaseRate : 0,
    mrpRate : 0,
    minsalesRate : 0,
    salesRate : 0,
    minstockLevel:0,
    maxstockLevel : 0,     
    description: "",
  };
 

  const getRecordData = async (id) => {
    try 
    {
    const b = new BaseApi();
    const result = await b.getById("products", id);
    initialFormValues.name = result.name;
    initialFormValues.barcode = result.barcode;
    initialFormValues.shortName = result.shortName;
    initialFormValues.unitId = result.unitId;
    initialFormValues.openingStock = result.openingStock;
    initialFormValues.categoryId = result.categoryId;
    changeCategoryHandler(result.categoryId);
    initialFormValues.subcategoryId = result.subcategoryId;
    initialFormValues.purityId = result.purityId; 
    initialFormValues.maingroupId = result.maingroupId; 
    initialFormValues.groupId = result.groupId; 
    initialFormValues.subgroupId = result.subgroupId;
    initialFormValues.companyId = result.companyId;  
    initialFormValues.colorId = result.colorId; 
    initialFormValues.sizeId = result.sizeId; 
    initialFormValues.shapeId = result.shapeId;
    initialFormValues.hsnsacId = result.hsnsacId;
    initialFormValues.gstId = result.gstId; 
    initialFormValues.warehouseId = result.warehouseId; 
    initialFormValues.weight = result.weight;
    initialFormValues.hight = result.hight;  
    initialFormValues.storageLocation = result.storageLocation;  
    initialFormValues.purchaseRate = result.purchaseRate;
    initialFormValues.mrpRate = result.mrpRate; 
    initialFormValues.minsalesRate = result.minsalesRate;
    initialFormValues.salesRate = result.salesRate;
    initialFormValues.minstockLevel = result.minstockLevel;
    initialFormValues.maxstockLevel = result.maxstockLevel; 

    initialFormValues.description = result.description;

    form.setFieldsValue({
      name: initialFormValues.name,
      barcode: initialFormValues.barcode,
      shortName: initialFormValues.shortName,
      unitId: initialFormValues.unitId,
      openingStock: initialFormValues.openingStock,
      categoryId: initialFormValues.categoryId,
      subcategoryId: initialFormValues.subcategoryId,
      purityId: initialFormValues.purityId,
      maingroupId: initialFormValues.maingroupId,
      groupId: initialFormValues.groupId,
      subgroupId: initialFormValues.subgroupId,
      companyId: initialFormValues.companyId,
      colorId: initialFormValues.colorId,
      sizeId: initialFormValues.sizeId,
      shapeId: initialFormValues.shapeId,
      hsnsacId: initialFormValues.hsnsacId,
      gstId: initialFormValues.gstId,
      warehouseId: initialFormValues.warehouseId,
      weight: initialFormValues.weight,
      hight: initialFormValues.hight,
      storageLocation: initialFormValues.storageLocation,
      purchaseRate: initialFormValues.purchaseRate,
      mrpRate: initialFormValues.mrpRate,
      minsalesRate: initialFormValues.minsalesRate,
      salesRate: initialFormValues.salesRate,
      minstockLevel: initialFormValues.minstockLevel,
      maxstockLevel: initialFormValues.maxstockLevel,
      description: initialFormValues.description,
    });
  } catch (error) {console.log("Error : "+error);}
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
  const getPurityList = async () => {
    const b = new BaseApi();
    const presult = await b.getListKV("purities");   
    setPurityList(presult);
  };
  const getMainGroupList = async () => {
    const b = new BaseApi();
    const pmgresult = await b.getListKV("productmaingroups");   
    setMainGroupList(pmgresult);
  };
  const getGroupList = async () => {
    const b = new BaseApi();
    const pgresult = await b.getListKV("productgroups");   
    setGroupList(pgresult);
  };
  const getSubGroupList = async () => {
    const b = new BaseApi();
    const psgresult = await b.getListKV("productsubgroups");   
    setSubGroupList(psgresult);
  };
  const getCompanyList = async () => {
    const b = new BaseApi();
    const result = await b.getListKV("companies");   
    setCompanyList(result);
  };
  const getSizeList = async () => {
    const b = new BaseApi();
    const result = await b.getListKV("sizes");   
    setSizeList(result);
  };
  const getShapeList = async () => {
    const b = new BaseApi();
    const result = await b.getListKV("shapes");   
    setShapeList(result);
  };
  const getHsnsacList = async () => {
    const b = new BaseApi();
    const result = await b.getListKV("hsnsacs");   
    setHsnSacList(result);
  };
  const getGstList = async () => {
    const b = new BaseApi();
    const result = await b.getListKV("gsts");   
    setGstList(result);
  };
  const getWareHouseList = async () => {
    const b = new BaseApi();
    const result = await b.getListKV("warehouses");   
    setwarehouseList(result);
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
    getPurityList();
    getMainGroupList();
    getGroupList();
    getSubGroupList();
    getCompanyList();
    getSizeList();
    getShapeList();
    getHsnsacList();
    getGstList();
    getWareHouseList();
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
      //  form.setFieldsValue({
      //    subcategoryId: "--- Select ---",
      //  });      
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
    try 
    {
    let postData = {
      id: id,
      barcode : data.barcode,
      name: data.name,
      shortName: data.shortName,
      unitId: data.unitId,
      openingStock: data.openingStock,
      categoryId: data.categoryId,
      subcategoryId: data.subcategoryId,
      purityId: data.purityId,
      maingroupId: data.maingroupId,
      groupId: data.groupId,
      subgroupId: data.subgroupId,
      companyId: data.companyId,
      colorId: data.colorId,
      sizeId: data.sizeId,
      shapeId: data.shapeId,
      hsnsacId: data.hsnsacId,
      gstId: data.gstId,

      warehouseId: data.warehouseId,
      weight: data.weight,
      hight: data.hight,
      storageLocation: data.storageLocation,
      purchaseRate: data.purchaseRate,

      mrpRate: data.mrpRate,
      minsalesRate: data.minsalesRate,
      salesRate: data.salesRate,
      minstockLevel: data.minstockLevel,
      maxstockLevel: data.maxstockLevel,
      description: data.description,
      createdDttm: "" + new Date().getTime(),
      createdBy: 1,
    };
//console.log(postData);
     const baseApi = new BaseApi();
     const result = await baseApi.request("products", postData, "post");
     if (result.status === 200) {
       navigate("/product", {
         state: { message: "Record is successfully created." },
       });
    }
  } catch (error) {console.log("Error : "+error);}
  };
  const updateData = async (id, data) => {
    try {

    let postData = {
      id: id,
      barcode : data.barcode,
      name: data.name,
      shortName: data.shortName,
      unitId: data.unitId,
      openingStock: data.openingStock,
      categoryId: data.categoryId,
      subcategoryId: data.subcategoryId,
      purityId: data.purityId,
      maingroupId: data.maingroupId,
      groupId: data.groupId,
      subgroupId: data.subgroupId,
      companyId: data.companyId,
      colorId: data.colorId,
      sizeId: data.sizeId,
      shapeId: data.shapeId,
      hsnsacId: data.hsnsacId,
      gstId: data.gstId,

      warehouseId: data.warehouseId,
      weight: data.weight,
      hight: data.hight,
      storageLocation: data.storageLocation,
      purchaseRate: data.purchaseRate,

      mrpRate: data.mrpRate,
      minsalesRate: data.minsalesRate,
      salesRate: data.salesRate,
      minstockLevel: data.minstockLevel,
      maxstockLevel: data.maxstockLevel,
      description: data.description,
      updatedDttm: "" + new Date().getTime(),
      updatedBy: 1,
    };
   const baseApi = new BaseApi();
     const result = await baseApi.request("products", postData, "patch");
     if (result.status === 200) {
       navigate("/product", {
         state: { message: "Record is successfully updated." },
       });
     }
    } catch (error) {console.log("Error : "+error);}
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
                    pattern: new RegExp(/^[0-9]*$/),
                    message: "Please enter valid value.",
                  },
                ]}
              >
                <Input  onKeyPress={handleNumbers} />
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
            <Grid item xs={2}>
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
            <Grid item xs={2}>
              <Form.Item
                label="Purity"
                id="purityId"
                name="purityId"                
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
                label="Product Main Group"
                id="maingroupId"
                name="maingroupId"               
              >
               <Select placeholder="--- Select ---">
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
            <Grid item xs={2}>
              <Form.Item
                label="Product Group"
                id="groupId"
                name="groupId"
               
              >
               <Select placeholder="--- Select ---">
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
            <Grid item xs={2}>
              <Form.Item
                label="Product Sub Group"
                id="subgroupId"
                name="subgroupId"                
              >
               <Select placeholder="--- Select ---">
              {subgroupList &&
                subgroupList.map((row, index) => {
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
                label="Company"
                id="companyId"
                name="companyId"
                
              >
               <Select placeholder="--- Select ---">
              {companyList &&
                companyList.map((row, index) => {
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
                label="Color"
                id="colorId"
                name="colorId"               
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
            <Grid item xs={2}>
              <Form.Item
                label="Size"
                id="sizeId"
                name="sizeId"                
              >
               <Select placeholder="--- Select ---">
              {sizeList &&
                sizeList.map((row, index) => {
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
                label="Shape"
                id="shapeId"
                name="shapeId"
               
              >
               <Select placeholder="--- Select ---">
              {shapeList &&
                shapeList.map((row, index) => {
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
                label="HSN / SAC"
                id="hsnsacId"
                name="hsnsacId"               
              >
               <Select placeholder="--- Select ---">
              {hsnsacList &&
                hsnsacList.map((row, index) => {
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
                label="GST"
                id="gsId"
                name="gsId"               
              >
               <Select placeholder="--- Select ---">
              {gstList &&
                gstList.map((row, index) => {
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
                label="Ware House"
                id="warehouseId"
                name="warehouseId"               
              >
               <Select placeholder="--- Select ---">
              {warehouseList &&
                warehouseList.map((row, index) => {
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
                label="Weight"
                name="weight"
                id="weight"
                rules={[                  
                  {
                    pattern: new RegExp(/^[0-9-.]*$/),
                    message: "Please enter valid value.",
                  },
                ]}
              >
                <Input  onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid>   
            <Grid item xs={2}>
              <Form.Item
                label="Hight"
                name="hight"
                id="hight"
                rules={[                  
                  {
                    pattern: new RegExp(/^[0-9-.]*$/),
                    message: "Please enter valid value.",
                  },
                ]}
              >
                <Input  onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid> 
            <Grid item xs={2}>
                    <Form.Item
                        label="Storage Location"
                        name="storageLocation"  
                        id="storageLocation"                       
                    >
                       <Input onKeyPress={handleAlphabets}  />
                    </Form.Item>
                </Grid>
                <Grid item xs={2}>
              <Form.Item
                label="Purchase Rate"
                name="purchaseRate"
                id="purchaseRate"
                rules={[                  
                  {
                    pattern: new RegExp(/^[0-9-.]*$/),
                    message: "Please enter valid value.",
                  },
                ]}
              >
                <Input  onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid>
            <Grid item xs={2}>
              <Form.Item
                label="Mrp Rate"
                name="mrpRate"
                id="mrpRate"
                rules={[                  
                  {
                    pattern: new RegExp(/^[0-9-.]*$/),
                    message: "Please enter valid value.",
                  },
                ]}
              >
                <Input  onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid>
            <Grid item xs={2}>
              <Form.Item
                label="Min Sales Rate"
                name="minsalesRate"
                id="minsalesRate"
                rules={[                  
                  {
                    pattern: new RegExp(/^[0-9-.]*$/),
                    message: "Please enter valid value.",
                  },
                ]}
              >
                <Input  onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid>
            <Grid item xs={2}>
              <Form.Item
                label="Sales Rate"
                name="salesRate"
                id="salesRate"
                rules={[                  
                  {
                    pattern: new RegExp(/^[0-9-.]*$/),
                    message: "Please enter valid value.",
                  },
                ]}
              >
                <Input  onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid>
            <Grid item xs={2}>
              <Form.Item
                label="Min Stock Level"
                name="minstockLevel"
                id="minstockLevel"
                rules={[                  
                  {
                    pattern: new RegExp(/^[0-9]*$/),
                    message: "Please enter valid value.",
                  },
                ]}
              >
                <Input  onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid>

            <Grid item xs={2}>
              <Form.Item
                label="Max Stock Level"
                name="maxstockLevel"
                id="maxstockLevel"
                rules={[                  
                  {
                    pattern: new RegExp(/^[0-9]*$/),
                    message: "Please enter valid value.",
                  },
                ]}
              >
                <Input  onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid>
            <Grid item xs={4}>
              <Form.Item label="Description" name="description">
                <TextArea rows={2} />
              </Form.Item>
            </Grid>
          </Grid>
        </Typography>
      </MainCard>
    </Form>
  );
};

export default ProductAdd;
