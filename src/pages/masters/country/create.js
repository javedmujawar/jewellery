import { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { Link, useParams } from "react-router-dom";
import { Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BaseApi from "services/BaseApi";
import { checkAlphabets, checkNumbers } from "../../../utility/Common";

const CountryAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAddMode = !id;
  const [form] = Form.useForm();
  const initialFormValues = {
    id: null,
    name: "",
    shortName: "",
    phoneCode: "",
  };
  //const [currentRecordDetails, setCurrentRecord] = useState(initialFormValues);
  const getRecordData = async (id) => {
    const b = new BaseApi();
    const result = await b.getById("countries", id);
    initialFormValues.name = result.name;
    initialFormValues.shortName = result.shortName;
    initialFormValues.phoneCode = result.phoneCode;

    form.setFieldsValue({
      name: initialFormValues.name,
      shortName: initialFormValues.shortName,
      phoneCode: initialFormValues.phoneCode,
    });
  };

  useEffect(() => {
    // console.log('test by rashid');
    if (!isAddMode) {
      getRecordData(id);
    }
  }, [id]);

  const onFinish = (values) => {
    //console.log('Success:', values);
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
      name: data.name,
      shortName: data.shortName,
      phoneCode: data.phoneCode,
      createdDttm: "" + new Date().getTime(),
      createdBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request("countries", postData, "post");
    if (result.status === 200) {
      navigate("/country", {
        state: { message: "Record is successfully created." },
      });
    }
  };
  const updateData = async (id, data) => {
    let postData = {
      id: id,
      name: data.name,
      shortName: data.shortName,
      phoneCode: data.phoneCode,
      updatedDttm: "" + new Date().getTime(),
      updatedBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request(
      "countries",
      postData,
      "patch"
    );
    if (result.status === 200) {
      navigate("/country", {
        state: { message: "Record is successfully updated." },
      });
    }
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
      name="frmcountry"
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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="baseline"
            sx={{ mb: { xs: -0.5, sm: 0.5 } }}
          >
            <Typography variant="h3">
              {isAddMode ? "Create Country" : "Edit Country"}
            </Typography>
            <div>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px" }}
              >
                Save
              </Button>
              <Link to={"/country"}>
                <Button type="danger">Cancel</Button>
              </Link>
            </div>
          </Stack>
        </Grid>

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
          <Form.Item label="Short Name" name="shortName" id="shortName">
            <Input />
          </Form.Item>
        </Grid>
        <Grid item xs={4}>
          <Form.Item label="Phone Code" name="phoneCode" id="phoneCode"
          rules={[
            {
              required: true,
              message: "Please enter Phone code.",
            },
            {
                pattern:new RegExp(/^[0-9]*$/),
                message: "Please enter a valid  phone code value."
              }
          ]}>
             <Input onKeyPress={handleNumbers} />
          </Form.Item>
        </Grid>
       
      </Grid>
    </Form>
  );
};

export default CountryAdd;
