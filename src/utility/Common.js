import { Tag } from "antd";
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
