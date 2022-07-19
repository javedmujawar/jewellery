import { useState, useEffect } from "react";
import { Table, Button, Divider, Modal, Alert, Input } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import BaseApi from "services/BaseApi";
import { useNavigate, useLocation } from "react-router-dom";
// material-ui
import { Grid } from "@mui/material";
import { statusTag } from "../../../utility/Common";
import MainCard from "components/MainCard";
const Search = Input.Search;

const UserRegistrationList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState(
    location.state?.message ? location.state?.message : ""
  );
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [deletedId, setDeletedId] = useState(0);
  const [searchData, setSearchData] = useState([]);
  const [searchText, setsearchText] = useState("");

  const columns = [
    // {
    //   title: "Sr.No",
    //   dataIndex: "id",
    //   key: "id",
    //   defaultSortOrder: 'descend',
    //  // defaultSortOrder: "ascend",
    //   sorter: (a, b) => a.id - b.id,
    // },
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
      sorter: (a, b) => a.userName.length - b.userName.length,
      //defaultSortOrder: "descend",
    },

    {
      title: "User Type",
      dataIndex: "userType",
      key: "userType",
      sorter: (a, b) => a.userType.length - b.userType.length,
      //defaultSortOrder: "descend",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
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
            <Link to={"/user-registration/edit/" + record.id}>
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
    const result = await b.getJoinList("userregistrations");
    setData(result);
    setSearchData(result);
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
      const b = new BaseApi();
      const postData = {
        isDeleted: true,
        id: deletedId,
        deletedBy: 1,
        deletedDttm: "" + new Date().getTime(),
      };

      const res = await b.request("userregistrations", postData, "patch");
      if (res.status === 200) {
        setModalVisible(false);
        setDeletedId(0);
        navigate("/user-registration", {
          state: { message: "Record is deleted successfully." },
        });
        window.location.reload();
      }
    } catch (error) {}
  };
  const OnSearch = (e) => {
    setsearchText(e.target.value);
    if (e.target.value == "") {
      setSearchData(data);
      return true;
    }
    const filteredData = data.filter(
      (row) =>
        row.id.toString().includes(e.target.value) ||
        row.userName.includes(e.target.value) ||
        row.userType.includes(e.target.value)
    );
    setSearchData(filteredData);
  };
  return (
    <>
      {message && (
        <Grid item xs={12}>
          <Alert
            message={message}
            type="success"
            closable
            onClose={() => {
              setMessage("");
            }}
          />
        </Grid>
      )}
      <MainCard
        title="User Registration List"
        secondary={
          <div>
            <Search
              style={{ width: "250px", marginRight: "10px" }}
              placeholder="Search by..."
              value={searchText}
              onChange={OnSearch}
            />
            <Button
              type="primary"
              id="btnCreate"
              name="btnCreate"
              onClick={() => {
                navigate("/user-registration/add");
              }}
            >
              Create
            </Button>
          </div>
        }
      >
        <Grid item xs={12}>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={searchData}
            bordered
          ></Table>
        </Grid>
      </MainCard>
      <Modal
        visible={modalVisible}
        title="Delete"
        icon={<ExclamationCircleOutlined />}
        okText="Yes"
        okType="danger"
        cancelText="No"
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
      >
        <p>Are you sure delete this record?</p>
      </Modal>
    </>
  );
};

export default UserRegistrationList;
