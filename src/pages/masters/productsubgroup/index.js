import { useState, useEffect } from "react";
import { Table, Button, Divider, Modal, Alert } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import BaseApi from "services/BaseApi";
import { useNavigate, useLocation } from "react-router-dom";
// material-ui
import { Grid, Stack, Typography } from "@mui/material";
import { statusTag } from "../../../utility/Common";

const ProductSubGroupList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState(
    location.state?.message ? location.state?.message : ""
  );
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [deletedId, setDeletedId] = useState(0);
  
  const columns = [
    {
      title: "Sr.No",
      dataIndex: "id",
      key: "id",
      //defaultSortOrder: 'descend',
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      defaultSortOrder: "descend",
    },
    {
      title: "Short Name",
      dataIndex: "shortName",
      key: "shortName",
    },
    {
        title: "Main Group Name",
        dataIndex: "maingroupName",
        key: "maingroupName",
      },
      {
        title: "Group Name",
        dataIndex: "groupName",
        key: "groupName",
      },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, statusValue) => {
        return statusTag(statusValue.status);
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => {
        return (
          <span>
            <Link to={"/productsubgroup/edit/" + record.id}>
              <Button
                type="primary"
                id="btnEdit"
                name="btnEdit"
                icon={<EditOutlined />}
                size="small"               
              ></Button>
            </Link>

            <Divider type="vertical" />
            <Button
              type="danger"
              id="btnDelete"
              name="btnDelete"
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => showModal(record.id)}
            ></Button>
          </span>
        );
      },
    },
  ];

  const getAllList = async () => {
    const b = new BaseApi();
    const result = await b.getJoinList("productsubgroups");
    //  console.log(result);
    setData(result);
  };

  useEffect(() => {
    getAllList();
  }, []);
  
  const showModal = (recordId) => {
        setDeletedId(recordId);
    setModalVisible(true);
  };
  const handleCancel = () => {
    setDeletedId(0);
    setModalVisible(false);
  };

  const handleOk = async () => {
    try {
      // console.log('selected id : ', deletedId);
      const b = new BaseApi();
      const postData = { isDeleted: true, id: deletedId ,deletedBy: 1 , deletedDttm:'' + new Date().getTime()};
      //console.log('postData=', postData);     
      const res = await b.request("productsubgroups", postData, "patch");
      if (res.status === 200) {
        setModalVisible(false);
        setDeletedId(0);
        //getAllList();    
        navigate('/productsubgroup', { state: { message:'Record is deleted successfully.' }}) 
       window.location.reload();      
       
      }

    } catch (error) {}
  };
  return (
    <Grid container spacing={3}>
      {message && <Grid item xs={12}>
        <Alert message={message} type="success" closable onClose={()=>{setMessage("")}} />
      </Grid>}
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          sx={{ mb: { xs: -0.5, sm: 0.5 } }}
        >
          <Typography variant="h3">Sub Group List</Typography>

          <Button
            type="primary"
            id="btnCreate"
            name="btnCreate"
            onClick={() => {
              navigate("/productsubgroup/add");
            }}
          >
            Create
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Table rowKey="id" columns={columns} dataSource={data} bordered />;
      </Grid>

      <Modal
        visible={modalVisible}
        title="Are you sure delete this record?"
        icon={<ExclamationCircleOutlined />}
        okText="Yes"
        okType="danger"
        cancelText="No"
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
      ></Modal>
    </Grid>
  );
};

export default ProductSubGroupList;