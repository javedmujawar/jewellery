import { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { Link, useParams } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BaseApi from "services/BaseApi";
import { checkAlphabets } from "../../../utility/Common";
import MainCard from "components/MainCard";

const UnitAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAddMode = !id;
  const [form] = Form.useForm();
  const initialFormValues = {
    id: null,
    name: "",
    shortName: "",
  };
  const getRecordData = async (id) => {
    const b = new BaseApi();
    const result = await b.getById("units", id);
    initialFormValues.name = result.name;
    initialFormValues.shortName = result.shortName;

    form.setFieldsValue({
      name: initialFormValues.name,
      shortName: initialFormValues.shortName,
    });
  };

  useEffect(() => {    
    if (!isAddMode) {
      getRecordData(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onFinish = (values) => {
    isAddMode ? insertData(values) : updateData(id, values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const insertData = async (data) => {
    //  console.log('insert functio is call :', data);
    let postData = {
      id: id,
      name: data.name,
      shortName: data.shortName,
      createdDttm: "" + new Date().getTime(),
      createdBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request("units", postData, "post");
    if (result.status === 200) {
      navigate("/unit", {
        state: { message: "Record is successfully created." },
      });
    }
  };
  const updateData = async (id, data) => {
    let postData = {
      id: id,
      name: data.name,
      shortName: data.shortName,
      updatedDttm: "" + new Date().getTime(),
      updatedBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request("units", postData, "patch");
    if (result.status === 200) {
      navigate("/unit", {
        state: { message: "Record is successfully updated." },
      });
    }
  };

  const handleAlphabets = (e) => {
    return checkAlphabets(e);
  };
  const handleChange = (e) => {
    form.setFieldsValue({
      shortName: e.target.value,
    });
  };

  return (
    <Form
      name="frmunit"
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
      
        <MainCard title={isAddMode ? "Create Unit" : "Edit Unit"} secondary={ <div>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px" }}
              >
                Save
              </Button>
              <Link to={"/unit"}>
                <Button type="danger">Cancel</Button>
              </Link>
            </div>}>
          
           
          
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
            </Grid>
          </Typography>
        </MainCard>
      
    </Form>
  );
};

export default UnitAdd;
