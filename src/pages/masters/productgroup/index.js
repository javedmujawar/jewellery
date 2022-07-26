import { useState, useEffect, useRef } from "react";
import { Table, Button, Divider, Modal, Alert, Input } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  FilePdfOutlined,
  PrinterOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import BaseApi from "services/BaseApi";
import { useNavigate, useLocation } from "react-router-dom";
// material-ui
import { Grid } from "@mui/material";
import {
  statusTag,
  exportPDFData,
  exportToExcell,
} from "../../../utility/Common";
import MainCard from "components/MainCard";
import { useReactToPrint } from "react-to-print";
const Search = Input.Search;

const ProductGroupList = () => {
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
  const componentRef = useRef();

  const columns = [
    // {
    //   title: "Sr.No",
    //   dataIndex: "id",
    //   key: "id",
    //   defaultSortOrder: 'descend',
    //   sorter: (a, b) => a.id - b.id,
    // },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      //defaultSortOrder: "descend",
    },
    {
      title: "Short Name",
      dataIndex: "shortName",
      key: "shortName",
      sorter: (a, b) => a.shortName.length - b.shortName.length,
      // defaultSortOrder: "descend",
    },
    {
      title: "Main Group Name",
      dataIndex: "maingroupName",
      key: "maingroupName",
      sorter: (a, b) => a.maingroupName.length - b.maingroupName.length,
      // defaultSortOrder: "descend",
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
            <Link to={"/productgroup/edit/" + record.id}>
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
    const result = await b.getJoinList("productgroups");   
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

      const res = await b.request("productgroups", postData, "patch");
      if (res.status === 200) {
        setModalVisible(false);
        setDeletedId(0);
        navigate("/productgroup", {
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
        row.name.includes(e.target.value) ||
        row.shortName.includes(e.target.value) ||
        row.maingroupName.includes(e.target.value)
    );
    setSearchData(filteredData);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePDF = () => {
    try {
      const title = "Group List";
      const headers = [["Name", "Short Name","Main Group Name", "Status"]];
      const tdata = data.map((elt) => [
        elt.name,
        elt.shortName,
        elt.maingroupName,
        elt.status === "A" ? "Active" : "Inactive",
      ]);
      exportPDFData(title, headers, tdata);
    } catch (error) {
      console.log("Error : " + error);
    }
  };
  const handleExcell = () => {
    try {
      const fileName = "Group List";
      const apiData = data.map((item) => ({
        Name: item.name,
        ShortName: item.shortName,
        MainGroupName: item.maingroupName,
        Status: item.status === "A" ? "Active" : "Inactive",
      }));
      exportToExcell(apiData, fileName);
    } catch (error) {
      console.log("Error : " + error);
    }
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
        title="Group List"
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
                navigate("/productgroup/add");
              }}
            >
              Create
            </Button>
            <Divider type="vertical" />
            <Button
              onClick={handlePDF}
              type="primary"
              id="btnPdf"
              name="btnPdf"
            >
              <FilePdfOutlined /> PDF
            </Button>
            <Divider type="vertical" />
            <Button
              onClick={handlePrint}
              type="primary"
              id="btnPrint"
              name="btnPrint"
            >
              <PrinterOutlined /> Print
            </Button>
            <Divider type="vertical" />
            <Button
              onClick={handleExcell}
              type="primary"
              id="btnExcell"
              name="btnExcell"
            >
              <FileExcelOutlined /> Excell
            </Button>
          </div>
        }
      >
        <Grid item xs={12}>
          <div ref={componentRef}>
            <Table
              rowKey="id"
              columns={columns}
              dataSource={searchData}
              bordered
            ></Table>
          </div>
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

export default ProductGroupList;
