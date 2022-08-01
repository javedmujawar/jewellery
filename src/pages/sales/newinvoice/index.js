
import { Button, Form, Input, Popconfirm, Table  } from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
const EditableContext = React.createContext(null);
import { Grid, Typography } from "@mui/material";
import MainCard from "components/MainCard";
import { Link } from "react-router-dom";

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]}
      >
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div  
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
       onClick={toggleEdit}  aria-hidden="true"
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

const App = () => {
  const [form] = Form.useForm();
  const [dataSource, setDataSource] = useState([
    {
      key: '0',
      name: 'Edward King 0',
      age: '32',
      address: 'London, Park Lane no. 0',
    },
    {
      key: '1',
      name: 'Edward King 1',
      age: '32',
      address: 'London, Park Lane no. 1',
    },
  ]);
  const [count, setCount] = useState(2);

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };

  const defaultColumns = [
    {
      title: 'name',
      dataIndex: 'name',
      width: '30%',
      editable: true,
    },
    {
      title: 'age',
      dataIndex: 'age',
      editable: true,
    },
    {
      title: 'address',
      dataIndex: 'address',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const handleAdd = () => {
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: '32',
      address: `London, Park Lane no. ${count}`,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const onFinish = (values) => {
   console.log(values);
   const newData = {
    key: count,
    name: values.name,
    age: values.age,
    address: values.address,
  };
  setDataSource([...dataSource, newData]);
  setCount(count + 1);
  };
  return (
   
    <div>
      
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          //marginBottom: 16,
         
        }}
      >
        Add a row
      </Button>
   
     <Form
     name="frmnewinvoice"
     initialValues={{
      remember: true,
    }}
    form={form} // Add this!
    layout="vertical"
    labelCol={{ span: 22 }}
    wrapperCol={{ span: 22 }}   
    onFinish={onFinish}   
    autoComplete="off"
   >
     <MainCard
       title={ "Create New Invoice" }
       secondary={
         <div>
           <Button
             type="primary"
             htmlType="submit"
             style={{ marginRight: "10px" }}
           >
             Save
           </Button>
           <Link to={"/"}>
             <Button type="danger">Cancel</Button>
           </Link>
         </div>
       }
     >
       <Typography variant="body2">
         <Grid container spacing={2}>         

           <Grid item xs={4}>
             <Form.Item
               label="Name"
               name="name"
               id="name"
               rules={[
                 {
                   required: false,
                   message: "Please enter name.",
                 },
               ]}
             >
               <Input />              
             </Form.Item>
           </Grid>

           <Grid item xs={4}>
             <Form.Item
               label="Age"
               name="age"
               id="age"
               rules={[
                 {
                   required: false,
                   message: "Please enter age.",
                 },
               ]}
             >
               <Input />              
             </Form.Item>
           </Grid>
           
           <Grid item xs={4}>
             <Form.Item
               label="Address"
               name="address"
               id="address"
               rules={[
                 {
                   required: false,
                   message: "Please enter address.",
                 },
               ]}
             >
               <Input />              
             </Form.Item>
           </Grid>
         </Grid>
       </Typography>
     </MainCard>
   </Form>
   </div>
   
  );
};

export default App;