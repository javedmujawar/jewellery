import { Tag } from "antd";
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
export function statusTag(status) {
  if (status === "A") {
    return <Tag color="green">active</Tag>;
  } else {
    return <Tag color="red">inactive</Tag>;
  }
}
export function checkAlphabets(text) {
   // console.log('in');
  const specialCharRegex = new RegExp("[a-zA-Z._' ,-]");
  const pressedKey = String.fromCharCode(
    !text.charCode ? text.which : text.charCode
  );
  if (!specialCharRegex.test(pressedKey)) {
    text.preventDefault();
    return false;
  } 
  else {
    return true;
  }
}
export function checkNumbers(text) {
  const specialCharRegex = new RegExp("[0-9' ,.]");
  const pressedKey = String.fromCharCode(
    !text.charCode ? text.which : text.charCode
  );
  if (!specialCharRegex.test(pressedKey)) {
    text.preventDefault();
    return false;
  } else {
    return true;
  }
}

export function exportPDFData(pageTitle,headings,tableData) {
  
  const unit = "pt";
  const size = "A4"; // Use A1, A2, A3 or A4
  const orientation = "portrait"; // portrait or landscape

  const marginLeft = 40;
  const doc = new jsPDF(orientation, unit, size);
  doc.setFontSize(15);

  const title = pageTitle;
  const headers = headings;
  const tdata = tableData;   
  
  let content = {
    startY: 50,
    head: headers,
    body: tdata
  };
  doc.text(title, marginLeft, 40);
  doc.autoTable(content);
  doc.save(title+".pdf");
}
export function exportToExcell  (csvData, fileName) {  
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";
  const ws = XLSX.utils.json_to_sheet(csvData);  
  const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], {type: fileType});
  FileSaver.saveAs(data, fileName + fileExtension);
}
