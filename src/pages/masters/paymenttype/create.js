import { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { Link, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BaseApi from "services/BaseApi";
import { checkAlphabets } from "../../../utility/Common";
const { TextArea } = Input;
import MainCard from "components/MainCard";

const PaymentTypeAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAddMode = !id;
  const [form] = Form.useForm();
  const initialFormValues = {
    id: null,
    name: "",
    description: "",
  };

  const getRecordData = async (id) => {
    try 
    {
    const b = new BaseApi();
    const result = await b.getById("paymenttypes", id);
    initialFormValues.name = result.name;
    initialFormValues.description = result.description;

    form.setFieldsValue({
      name: initialFormValues.name,
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
      description: data.description,
      createdDttm: "" + new Date().getTime(),
      createdBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request("paymenttypes", postData, "post");
    if (result.status === 200) {
      navigate("/payment-type", {
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
      description: data.description,
      updatedDttm: "" + new Date().getTime(),
      updatedBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request("paymenttypes", postData, "patch");
    if (result.status === 200) {
      navigate("/payment-type", {
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
      description: e.target.value,
    });
  };

  return (
    <Form
      name="frmpaymenttype"
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
        title={isAddMode ? "Create Payment Type" : "Edit Payment Type"}
        secondary={
          <div>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              Save
            </Button>
            <Link to={"/payment-type"}>
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
                <Input onKeyPress={handleAlphabets} onChange={handleChange} />
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

export default PaymentTypeAdd;
