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
//import { CSVLink } from "react-csv";
const Search = Input.Search;

const CategoryList = () => {
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
    //   //defaultSortOrder: "ascend",
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
      fixed: 'right',
      render: (text, record) => {
        return (
          <span>
            <Link to={"/category/edit/" + record.id}>
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
    const result = await b.getAll("categories");
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

      const res = await b.request("categories", postData, "patch");
      if (res.status === 200) {
        setModalVisible(false);
        setDeletedId(0);
        navigate("/category", {
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
        row.name.includes(e.target.value)
    );
    setSearchData(filteredData);
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const handlePDF = () => {
    try {
      // const unit = "pt";
      // const size = "A4"; // Use A1, A2, A3 or A4
      // const orientation = "portrait"; // portrait or landscape

      // const marginLeft = 40;
      // const doc = new jsPDF(orientation, unit, size);
      // doc.setFontSize(15);

      // const title = "Sub Category Report";
      // const headers = [["Name", "categoryName","Status"]];
      // const tdata = data.map(elt=> [elt.name, elt.categoryName,elt.status]);
      // console.log("tdata :" + tdata);
      // let content = {
      //   startY: 50,
      //   head: headers,
      //   body: tdata
      // };

      // doc.text(title, marginLeft, 40);
      // doc.autoTable(content);
      // doc.save("subcategory.pdf")

      const title = "Category List";
      const headers = [["Name", "Status"]];
      const tdata = data.map((elt) => [
        elt.name,
        elt.status === "A" ? "Active" : "Inactive",
      ]);
      exportPDFData(title, headers, tdata);
    } catch (error) {
      console.log("Error : " + error);
    }
  };
  const handleExcell = () => {
    try {
      const fileName = "Category List";
      const apiData = data.map((item) => ({
        Name: item.name,
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
        title="Category List"
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
                navigate("/category/add");
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
            {/* <Divider type="vertical" />

            <CSVLink
              filename={"Expense_Table.csv"}
              data={data}              
              onClick={() => {
                message.success("The file is downloading");
              }}
            >
              CSV
            </CSVLink> */}
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
              pagination={{  showSizeChanger: true }}
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

export default CategoryList;
