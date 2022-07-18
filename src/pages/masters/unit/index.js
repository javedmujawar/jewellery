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
import { Grid, Stack, Typography } from "@mui/material";
import { statusTag } from "../../../utility/Common";
import { map, get } from "lodash";

const Search = Input.Search;

const UnitList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState(
    location.state?.message ? location.state?.message : ""
  );
  const [data, setData] = useState([]); 
  const [searchData, setSearchData] = useState([]);  
  const [searchText, setsearchText] = useState('');
  const [filtered, setfiltered] = useState(false);
  const [filteredInfo, setfilteredInfo] = useState([null]);
  const [sortedInfo, setsortedInfo] = useState([null]);

  const [modalVisible, setModalVisible] = useState(false);
  const [deletedId, setDeletedId] = useState(0);
  const [visible, setVisible] = useState(true);

  
  const columns = [
    {
      title: "Sr.No",
      dataIndex: "id",
      key: "id",
      defaultSortOrder: "descend",
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
            <Link to={"/unit/edit/" + record.id}>
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
    const result = await b.getAll("units");
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
      // console.log('selected id : ', deletedId);
      const b = new BaseApi();
      const postData = {
        isDeleted: true,
        id: deletedId,
        deletedBy: 1,
        deletedDttm: "" + new Date().getTime(),
      };
      //console.log('postData=', postData);
      const res = await b.request("units", postData, "patch");
      if (res.status === 200) {
        setModalVisible(false);
        setDeletedId(0);
        //getAllList();
        navigate("/unit", {
          state: { message: "Record is deleted successfully." },
        });
        window.location.reload();
      }
    } catch (error) {}
  };

  const handleChoosedRow = (event) => {
    console.log("selected id :" + event);
  };
  const onInputChange = e => {
    setsearchText(e.target.value);
   };
  const OnSearch = e => {
    setsearchText(e.target.value);
   if(e.target.value == "")
   {
    setSearchData(data);
    return true;
   }
   const filteredData = data.filter((row)=>
    row.id.toString().includes(e.target.value) 
    || row.shortName.includes(e.target.value)
    || row.name.includes(e.target.value)
   ) 
   setSearchData(filteredData);
  };  
 const  handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);    
    setfilteredInfo(filters);
    setsortedInfo(sorter);

  };
  return (
    <Grid container spacing={3}>
      {message && (
        <Grid item xs={12}>
          <Alert
            message={message}
            type="success"
            closable
            onClose={() => {
              setMessage("");
              setVisible(false);
            }}
          />
        </Grid>
      )}
      <Grid item xs={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="baseline"
          sx={{ mb: { xs: -0.5, sm: 0.5 } }}
        >
          <Typography variant="h3">Unit List</Typography>

          <Button
            type="primary"
            id="btnCreate"
            name="btnCreate"
            onClick={() => {
              navigate("/unit/add");
            }}
          >
            Create
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <Search
          style={{ border: "2px solid green", margin: "0 0 10px 0" }}
          placeholder="Search by..."
          value={searchText}
          //enterButton
         // onSearch={search}
          onChange={OnSearch}
          
        />
        
        {/* <Table rowKey="id"  columns={columns} dataSource={data} bordered ></Table>;  */}
        <Table
          rowKey="id"
          onRow={(r) => ({
            onClick: () => {
              handleChoosedRow();
            },
          })}
          columns={columns}
          dataSource={searchData}
          bordered
          hange={handleChange}
        ></Table>
        ;
        {/* <Table rowKey="id" onRow={(r) => ({
            onClick : () => navigate('/unit/edit/'+r.id),
            onDoubleClick : () => navigate('/unit/edit/'+r.id)
          })} columns={columns} dataSource={data} bordered />;  */}
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

export default UnitList;
