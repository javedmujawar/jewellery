import { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { Link, useParams } from "react-router-dom";
import { Grid, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BaseApi from "services/BaseApi";
const { TextArea } = Input;

const BankAdd = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isAddMode = !id;
  const [form] = Form.useForm();
  const initialFormValues = {
    id: null,
    name: "",
    shortName: "",
    address: "",
  };
  //const [currentRecordDetails, setCurrentRecord] = useState(initialFormValues);
  const getRecordData = async (id) => {
    const b = new BaseApi();
    const result = await b.getById("banks", id);
    initialFormValues.name = result.name;
    initialFormValues.shortName = result.shortName;
    initialFormValues.address = result.address;

    form.setFieldsValue({
      name: initialFormValues.name,
      shortName: initialFormValues.shortName,
      address: initialFormValues.address,
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
      address: data.address,
      createdDttm: "" + new Date().getTime(),
      createdBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request("banks", postData, "post");
    if (result.status === 200) {
      navigate("/bank", {
        state: { message: "Record is successfully created." },
      });
    }
  };
  const updateData = async (id, data) => {
    let postData = {
      id: id,
      name: data.name,
      shortName: data.shortName,
      address: data.address,
      updatedDttm: "" + new Date().getTime(),
      updatedBy: 1,
    };
    const baseApi = new BaseApi();
    const result = await baseApi.request(
      "banks",
      postData,
      "patch"
    );
    if (result.status === 200) {
      navigate("/bank", {
        state: { message: "Record is successfully updated." },
      });
    }
  };

  return (
    <Form
      name="frmbank"
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
              {isAddMode ? "Create Bank" : "Edit Bank"}
            </Typography>
            <div>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px" }}
              >
                Save
              </Button>
              <Link to={"/bank"}>
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
            <Input />
          </Form.Item>
        </Grid>
        <Grid item xs={2}>
          <Form.Item label="Short Name" name="shortName" id="shortName">
            <Input />
          </Form.Item>
        </Grid>
        <Grid item xs={6}>
          <Form.Item label="Address" name="address">
            <TextArea rows={4} />
          </Form.Item>
        </Grid>
      </Grid>
    </Form>
  );
};

export default BankAdd;
