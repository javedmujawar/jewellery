import { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { Link, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BaseApi from "services/BaseApi";
import MainCard from "components/MainCard";

const CompanyAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAddMode = !id;
  const [form] = Form.useForm();
  const initialFormValues = {
    id: null,
    name: "",
    headOffice: "",
    serviceCenter: "",
    centerName: "",
    centerAddress: "",
    contactNumber: "",
    serviceCenterMobNo: "",
    contactPersonName: "",
    contactPersonMobNo: "",
  };

  const getRecordData = async (id) => {
    try 
    {
    const b = new BaseApi();
    const result = await b.getById("companies", id);
    initialFormValues.name = result.name;
    initialFormValues.headOffice = result.headOffice;
    initialFormValues.serviceCenter = result.serviceCenter;
    initialFormValues.centerName = result.centerName;
    initialFormValues.centerAddress = result.centerAddress;
    initialFormValues.contactNumber = result.contactNumber;
    initialFormValues.serviceCenterMobNo = result.serviceCenterMobNo;
    initialFormValues.contactPersonName = result.contactPersonName;
    initialFormValues.contactPersonMobNo = result.contactPersonMobNo;

    form.setFieldsValue({
      name: initialFormValues.name,
      headOffice: initialFormValues.headOffice,
      serviceCenter: initialFormValues.serviceCenter,
      centerName: initialFormValues.centerName,
      centerAddress: initialFormValues.centerAddress,
      contactNumber: initialFormValues.contactNumber,
      serviceCenterMobNo: initialFormValues.serviceCenterMobNo,
      contactPersonName: initialFormValues.contactPersonName,
      contactPersonMobNo: initialFormValues.contactPersonMobNo,
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
      headOffice: data.headOffice,
      serviceCenter: data.serviceCenter,
      centerName: data.centerName,
      centerAddress: data.centerAddress,
      contactNumber: data.contactNumber,
      serviceCenterMobNo: data.serviceCenterMobNo,
      contactPersonName: data.contactPersonName,
      contactPersonMobNo: data.contactPersonMobNo,
      createdDttm: "" + new Date().getTime(),
      createdBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request("companies", postData, "post");
    if (result.status === 200) {
      navigate("/company", {
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
      headOffice: data.headOffice,
      serviceCenter: data.serviceCenter,
      serviceCenter: data.serviceCenter,
      centerName: data.centerName,
      centerAddress: data.centerAddress,
      contactNumber: data.contactNumber,
      serviceCenterMobNo: data.serviceCenterMobNo,
      contactPersonName: data.contactPersonName,
      contactPersonMobNo: data.contactPersonMobNo,
      updatedDttm: "" + new Date().getTime(),
      updatedBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request("companies", postData, "patch");
    if (result.status === 200) {
      navigate("/company", {
        state: { message: "Record is successfully updated." },
      });
    }
  } catch (error) {console.log("Error : "+error);}
  };

  return (
    <Form
      name="frmcompany"
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
        title={isAddMode ? "Create Company" : "Edit Company"}
        secondary={
          <div>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              Save
            </Button>
            <Link to={"/company"}>
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
                <Input />
              </Form.Item>
            </Grid>
            <Grid item xs={4}>
              <Form.Item
                label="Head Office"
                name="headOffice"
                id="headOffice"
                rules={[
                  {
                    required: true,
                    message: "Please enter head office.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Grid>
            <Grid item xs={4}>
              <Form.Item
                label="Service Center"
                name="serviceCenter"
                id="serviceCenter"
                rules={[
                  {
                    required: true,
                    message: "Please enter service center.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Grid>
            <Grid item xs={4}>
              <Form.Item
                label="Center Name"
                name="centerName"
                id="centerName"
                rules={[
                  {
                    required: true,
                    message: "Please enter center name.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Grid>

            <Grid item xs={4}>
              <Form.Item
                label="Center Address"
                name="centerAddress"
                id="centerAddress"
                rules={[
                  {
                    required: true,
                    message: "Please enter center address.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Grid>

            <Grid item xs={4}>
              <Form.Item
                label="Contact Number"
                name="contactNumber"
                id="contactNumber"
                rules={[
                  {
                    required: true,
                    message: "Please enter company contact number.",
                  },
                  {
                    pattern: new RegExp(/^[0-9]*$/),
                    message: "Please enter a valid  percentage value.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Grid>
            <Grid item xs={4}>
              <Form.Item
                label="Service Center Mobile No"
                name="serviceCenterMobNo"
                id="serviceCenterMobNo"
                rules={[
                  {
                    required: true,
                    message: "Please enter service center mobile no.",
                  },
                  {
                    pattern: new RegExp(/^[0-9]*$/),
                    message: "Please enter a valid  percentage value.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Grid>
            <Grid item xs={4}>
              <Form.Item
                label="Contact Person Name"
                name="contactPersonName"
                id="contactPersonName"
                rules={[
                  {
                    required: false,
                    message: "Please enter contact Person Name.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Grid>
            <Grid item xs={4}>
              <Form.Item
                label="Contact Person Mobile No"
                name="contactPersonMobNo"
                id="contactPersonMobNo"
                rules={[
                  {
                    required: false,
                    message: "Please enter contact person mobile no.",
                  },
                  {
                    pattern: new RegExp(/^[0-9]*$/),
                    message: "Please enter a valid  percentage value.",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Grid>
          </Grid>
        </Typography>
      </MainCard>
    </Form>
  );
};

export default CompanyAdd;
