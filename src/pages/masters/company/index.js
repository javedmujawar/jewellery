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

const CompanyList = () => {
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
    //   //defaultSortOrder: 'descend',
    //   defaultSortOrder: "ascend",
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
      title: "Head Office",
      dataIndex: "headOffice",
      key: "headOffice",
      sorter: (a, b) => a.name.length - b.name.length,
      //defaultSortOrder: "descend",
    },
    {
      title: "Service Center",
      dataIndex: "serviceCenter",
      key: "serviceCenter",
    },
    {
      title: "Center Name",
      dataIndex: "centerName",
      key: "centerName",
    },
    {
      title: "Center Address",
      dataIndex: "centerAddress",
      key: "centerAddress",
    },
    {
      title: "Contact Number",
      dataIndex: "contactNumber",
      key: "contactNumber",
    },
    {
      title: "Service Center No",
      dataIndex: "serviceCenterMobNo",
      key: "serviceCenterMobNo",
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
            <Link to={"/company/edit/" + record.id}>
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
    const result = await b.getAll("companies");
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
      const res = await b.request("companies", postData, "patch");
      if (res.status === 200) {
        setModalVisible(false);
        setDeletedId(0);
        navigate("/company", {
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
        row.headOffice.includes(e.target.value)
    );
    setSearchData(filteredData);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePDF = () => {
    try {
      const title = "Company List";
      const headers = [
        [
          "Name",
          "Head Office",
          "Service Center",
          "Center Name",
          "Center Address",
          "Contact Number",
          "Service Center No",
          "Status",
        ],
      ];
      const tdata = data.map((elt) => [
        elt.name,
        elt.headOffice,
        elt.serviceCenter,
        elt.centerName,
        elt.centerAddress,
        elt.contactNumber,
        elt.serviceCenterMobNo,
        elt.status === "A" ? "Active" : "Inactive",
      ]);
      exportPDFData(title, headers, tdata);
    } catch (error) {
      console.log("Error : " + error);
    }
  };
  const handleExcell = () => {
    try {
      const fileName = "Company List";
      const apiData = data.map((item) => ({
        Name: item.name,
        HeadOffice: item.headOffice,
        ServiceCenter: item.serviceCenter,
        CenterName: item.centerName,
        CenterAddress: item.centerAddress,
        ContactNo: item.contactNumber,
        ServiceCenterNo: item.serviceCenterMobNo,
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
        title="Company List"
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
                navigate("/company/add");
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

export default CompanyList;
