import { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { Link, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BaseApi from "services/BaseApi";
import { checkAlphabets, checkNumbers } from "../../../utility/Common";
const { TextArea } = Input;
import MainCard from "components/MainCard";

const GstAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAddMode = !id;
  const [form] = Form.useForm();
  const initialFormValues = {
    id: null,
    name: "",
    shortName: "",
    percentageValue: "",
    igstValue: "",
    cgstValue: "",
    sgstValue: "",
    description: "",
  };

  const getRecordData = async (id) => {
    try 
    {
    const b = new BaseApi();
    const result = await b.getById("gsts", id);
    initialFormValues.name = result.name;
    initialFormValues.shortName = result.shortName;
    initialFormValues.percentageValue = result.percentageValue;
    initialFormValues.igstValue = result.igstValue;
    initialFormValues.cgstValue = result.cgstValue;
    initialFormValues.sgstValue = result.sgstValue;
    initialFormValues.description = result.description;   
    form.setFieldsValue({
      name: initialFormValues.name,
      shortName: initialFormValues.shortName,
      percentageValue: initialFormValues.percentageValue,
      igstValue: initialFormValues.igstValue,
      cgstValue: initialFormValues.cgstValue,
      sgstValue: initialFormValues.sgstValue,
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
      percentageValue: data.percentageValue,
      igstValue: data.igstValue,
      cgstValue: data.cgstValue,
      sgstValue: data.sgstValue,
      description: data.description,
      createdDttm: "" + new Date().getTime(),
      createdBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request("gsts", postData, "post");
    if (result.status === 200) {
      navigate("/gst", {
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
      percentageValue: data.percentageValue,
      igstValue: data.igstValue,
      cgstValue: data.cgstValue,
      sgstValue: data.sgstValue,
      description: data.description,
      updatedDttm: "" + new Date().getTime(),
      updatedBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request("gsts", postData, "patch");
    if (result.status === 200) {
      navigate("/gst", {
        state: { message: "Record is successfully updated." },
      });
    }
  } catch (error) {console.log("Error : "+error);}
  };
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
  return (
    <Form
      name="frmgst"
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
        title={isAddMode ? "Create GST " : "Edit GST "}
        secondary={
          <div>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: "10px" }}
            >
              Save
            </Button>
            <Link to={"/gst"}>
              <Button type="danger">Cancel</Button>
            </Link>
          </div>
        }
      >
        <Typography variant="body2">
          <Grid container spacing={2}>
            <Grid item xs={2}>
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
                <Input />
              </Form.Item>
            </Grid>

            <Grid item xs={2}>
              <Form.Item
                label="Percantege"
                name="percentageValue"
                id="percentageValue"
                rules={[
                  {
                    required: true,
                    message: "Please enter percentage value.",
                  },
                  {
                    pattern: new RegExp(/^[0-9-.]*$/),
                    message: "Please enter a valid  percentage value.",
                  },
                ]}
              >
                <Input onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid>
            <Grid item xs={2}>
              <Form.Item
                label="IGST Value"
                name="igstValue"
                id="igstValue"
                rules={[
                  {
                    required: true,
                    message: "Please enter igst value.",
                  },
                  {
                    pattern: new RegExp(/^[0-9-.]*$/),
                    message: "Please enter a valid  percentage value.",
                  },
                ]}
              >
                <Input onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid>
            <Grid item xs={2}>
              <Form.Item
                label="CGST Value"
                name="cgstValue"
                id="cgstValue"
                rules={[
                  {
                    required: true,
                    message: "Please enter cgst value.",
                  },
                  {
                    pattern: new RegExp(/^[0-9-.]*$/),
                    message: "Please enter a valid  percentage value.",
                  },
                ]}
              >
                <Input onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid>
            <Grid item xs={2}>
              <Form.Item
                label="SGST Value"
                name="sgstValue"
                id="sgstValue"
                rules={[
                  {
                    required: true,
                    message: "Please enter sgst value.",
                  },
                  {
                    pattern: new RegExp(/^[0-9-.]*$/),
                    message: "Please enter a valid  percentage value.",
                  },
                ]}
              >
                <Input onKeyPress={handleNumbers} />
              </Form.Item>
            </Grid>
            <Grid item xs={6}>
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

export default GstAdd;
