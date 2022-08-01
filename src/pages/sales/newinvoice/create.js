import {
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  Popconfirm,
  Table,
  Tabs,
  InputNumber,
  
} from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
const EditableContext = React.createContext(null);
import { Link, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BaseApi from "services/BaseApi";
import { checkNumbers } from "../../../utility/Common";
import MainCard from "components/MainCard";
const { TabPane } = Tabs;
const { TextArea } = Input;

const NewInvoiceAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAddMode = !id;
  const [form] = Form.useForm();
  const [customerList, setCustomerList] = useState([]);
  const [paymentTypeList, setPaymentTypeList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [unitList, setUnitList] = useState([]);
  const dateFormat = "DD-MM-YYYY";
  const [dataSource, setDataSource] = useState([
    // {
    //   key: '0',
    //   name: 'Edward King 0',
    //   rate: '32',
    //   quantity: 'London, Park Lane no. 0',
    // },
    // {
    //   key: '1',
    //   name: 'Edward King 1',
    //   rate: '32',
    //   quantity: 'London, Park Lane no. 1',
    // },
  ]);
  const [count, setCount] = useState(2);
  const [productRate, setProductRate] = useState("");
  const [productQty, setProductQuantity] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [productName, setProductName] = useState("");
  const [showTab,setShowTab]=useState(false);
  const initialFormValues = {
    id: null,
    customerId: "",
    invoiceDate: "",
    paymenttypeId: "",
    productId: "",
    unitId: "",
    rate: "",
    quantity: "",
    amount: "",
    shipandpackCost: "",
  };
  const getCustomerList = async () => {
    const b = new BaseApi();
    const result = await b.getListKV("customers");
    setCustomerList(result);
  };
  const getPaymentTypeList = async () => {
    const b = new BaseApi();
    const result = await b.getListKV("paymenttypes");
    setPaymentTypeList(result);
  };
  const getProductList = async () => {
    const b = new BaseApi();
    const presult = await b.getListKV("products");
    setProductList(presult);
  };
  const getUnitList = async () => {
    const b = new BaseApi();
    const uresult = await b.getListKV("units");
    setUnitList(uresult);
  };

  useEffect(() => {
    getCustomerList();
    getPaymentTypeList();
    getProductList();
    getUnitList();
    if (!isAddMode) {
    }
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const onFinish = (values) => {
    isAddMode ? insertData(values) : "";
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      console.log("Record :" + record[dataIndex]);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
          aria-hidden="true"
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };
  const defaultColumns = [
    {
      title: "Product Name",
      dataIndex: "name",
      width: "30%",
      //editable: true,
    },
    {
      title: "Rate",
      dataIndex: "rate",
      editable: true,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      editable: true,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];

    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
    //console.log("newData"+newData.item.rate);
  };
  
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const insertData = async (data) => {
    try {
      let postData = {
        id: id,
        customerId: data.customerId,
        invoiceDate: data.invoiceDate,
        paymenttypeId: data.paymenttypeId,

        createdDttm: "" + new Date().getTime(),
        createdBy: 1,
      };

      console.log("form data:" + postData);
    } catch (error) {
      console.log("Error : " + error);
    }
  };
  const handleNumbers = (e) => {
    return checkNumbers(e);
  };

  const handleAdd = (event) => {
    event.preventDefault();
    const newData = {
      key: count,
      name: productName,
      rate: productRate,
      quantity: productQty,
      amount: productAmount,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
    setProductRate("");
    setProductQuantity("");
    setProductAmount("");
    setProductAmount("");
    form.setFieldsValue({
      productId: "",
      unitId: "",
      rate: "",
      quantity: "",
      amount: "",
    });
  };
  const changeProductHandler = async (value) => {
    if (value > 0) {
      const b = new BaseApi();
      const result = await b.getById("products", value);
      setProductName(result.name);
    }
  };
  const handleRateChange = (event) => {
    setProductRate(event.target.value);
  };
  const handleQuantityChange = (event) => {
    setProductQuantity(event.target.value);
    let amount = 0;
    amount = productRate * event.target.value;
    setProductAmount(amount);
    form.setFieldsValue({
      amount: amount,
    });
  };

  const checkTabVisibility = {
   
    //setShowTab(true);
  }
  return (
    <Form
      name="frmnewinvoice"
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
        title={isAddMode ? "Create New Invoice" : "Edit New Invoice"}
        secondary={
          <div>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              Save
            </Button>
            <Link to={"/"}>
              <Button type="danger">Cancel</Button>
            </Link>
          </div>
        }
      >
        <Typography variant="body2">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Form.Item label="Customer" id="customerId" name="customerId">
                <Select placeholder="--- Select ---">
                  {customerList &&
                    customerList.map((row, index) => {
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
                label="Invoice Date"
                name="invoiceDate"
                rules={[
                  {
                    required: false,
                    message: "Please enter date.",
                  },
                ]}
              >
                <DatePicker format={dateFormat} />
              </Form.Item>
            </Grid>

            <Grid item xs={4}>
              <Form.Item label="Product" id="productId" name="productId">
                <Select
                  placeholder="--- Select ---"
                  onChange={changeProductHandler}
                >
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
              <Form.Item label="Unit" id="unitId" name="unitId">
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
            <Grid item xs={1}>
              <Form.Item
                label="Rate"
                name="rate"
                id="rate"
                rules={[
                  {
                    //required: true,
                    //message: "Please enter rate.",
                  },
                  {
                    pattern: new RegExp(/^[0-9-.]*$/),
                    message: "Please enter a valid  rate value.",
                  },
                ]}
              >
                <Input onChange={handleRateChange} onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid>
            <Grid item xs={1}>
              <Form.Item
                label="Quantity"
                name="quantity"
                id="quantity"
                rules={[
                  {
                    // required: true,
                    // message: "Please enter quantity.",
                  },
                  {
                    pattern: new RegExp(/^[0-9]*$/),
                    message: "Please enter a valid  rate value.",
                  },
                ]}
              >
                <Input
                  onChange={handleQuantityChange}
                  onKeyPress={handleNumbers}
                />
              </Form.Item>
            </Grid>
            <Grid item xs={1}>
              <Form.Item
                label="Amount"
                name="amount"
                id="amount"
                rules={[
                  {
                    // required: true,
                    // message: "Please enter amount.",
                  },
                  {
                    pattern: new RegExp(/^[0-9-.]*$/),
                    message: "Please enter a valid  amount value.",
                  },
                ]}
              >
                <Input disabled onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid>
            <Grid item xs={3}>
              <Form.Item label=" ">
                <Button type="primary" onClick={handleAdd}>
                  Add To List
                </Button>
              </Form.Item>
            </Grid>

            <Grid container spacing={4}>
              <Grid item xs={12}>
                <div>
                  <Table
                    components={components}
                    rowClassName={() => "editable-row"}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                  />
                </div>
              </Grid>
            </Grid>
            {/* <Grid item xs={12}> */}
            <Grid container spacing={2}>
            <Grid item xs={6}>
              <Form.Item>
                <Button type="primary" id= "btnShippingDetails" name= "btnShippingDetails" onClick={checkTabVisibility} >
                 Shipping & Payment Details
                </Button>
              </Form.Item>
            </Grid>
            
            
            <Grid item xs={6}>
              <Form.Item>
                <Button type="primary">
                 Billing Amount Description
                </Button>
              </Form.Item>
            </Grid>
            </Grid>
            <Grid item xs={8}>
            <div className="Tab">
              {
                showTab?
            <Tabs size="middle">
                <TabPane tab="Shipping Cost" key="shippingTab">
                  <Grid item xs={2}>
                    <Form.Item
                      label="Shipping Cost"
                      name="shipandpackCost"
                      id="shipandpackCost"
                      rules={[
                        {
                          pattern: new RegExp(/^[0-9-.]*$/),
                          message: "Please enter a valid  amount value.",
                        },
                      ]}
                    >
                      <Input onKeyPress={handleNumbers} defaultValue = {0} />
                    </Form.Item>
                  </Grid>
                </TabPane>
                <TabPane tab="Invoice Ref" key="invoiceTab">
                  Content of tab 2
                </TabPane>
                <TabPane tab="Payment Details" key="paymentTab">
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Form.Item
                        label="Payment Type"
                        id="paymenttypeId"
                        name="paymenttypeId"
                      >
                        <Select placeholder="--- Select ---" 
                        defaultValue={1}
                        >
                          {paymentTypeList &&
                            paymentTypeList.map((row, index) => {
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
                        label="Paid Amount"
                        name="paidAmount"
                        id="paidAmount"
                        rules={[
                          {
                            pattern: new RegExp(/^[0-9-.]*$/),
                            message: "Please enter a valid  amount value.",
                          },
                        ]}
                      >
                        <Input onKeyPress={handleNumbers} defaultValue = {0} />
                      </Form.Item>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={3}>
                      <Form.Item
                        label="Bill Disc %"
                        name="billDiscPerc"
                        id="billDiscPerc"
                        rules={[
                          {
                            pattern: new RegExp(/^[0-9]*$/),
                            message: "Please enter a valid  amount value.",
                          },
                        ]}
                      >
                        <InputNumber min={0} max={10} defaultValue={0} />
                      </Form.Item>
                    </Grid>
                    <Grid item xs={3}>
                      <Form.Item
                        label="Bill Disc Amount"
                        name="billDiscAmt"
                        id="billDiscAmt"
                        rules={[
                          {
                            pattern: new RegExp(/^[0-9]*$/),
                            message: "Please enter a valid  amount value.",
                          },
                        ]}
                      >
                        <InputNumber min={0} max={10} defaultValue={0} />
                      </Form.Item>
                    </Grid>
                  </Grid>
                </TabPane>
                <TabPane tab="Terms & Conditions" key="tcTab">
                  <Grid item xs={4}>
                    <Form.Item
                      label="Delivery Note"
                      name="deliveryNote"
                      id="deliveryNote"
                    >
                      <TextArea rows={2} />
                    </Form.Item>
                  </Grid>
                  <Grid item xs={4}>
                    <Form.Item
                      label="Personel Note"
                      name="personalNote"
                      id="personalNote"
                    >
                      <TextArea rows={2} />
                    </Form.Item>
                  </Grid>
                </TabPane>
              </Tabs>:""
              }
              </div>
            </Grid>
            <Grid item xs={4}>
            <Grid item xs={4} >
              <Form.Item
                label="No. Of Products"
                name="totalProducts"
                
              >
                <Input disabled defaultValue={0} />
              </Form.Item>
            </Grid>
            <Grid item xs={4}>
              <Form.Item
                label="Total Discount"
                name="totDiscountAmt"
                id="totDiscountAmt"
                
              >
                <Input disabled defaultValue={0} />
              </Form.Item>
            </Grid>
            <Grid item xs={4}>
              <Form.Item
                label="Total GST"
                name="totGstAmt"
                id="totGstAmt"
                
              >
                <Input disabled defaultValue={0} />
              </Form.Item>
            </Grid>
            </Grid>
            {/* </Grid> */}
          </Grid>
        </Typography>
      </MainCard>
    </Form>
  );
};
export default NewInvoiceAdd;
