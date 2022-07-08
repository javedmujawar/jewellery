import { useState, useEffect } from 'react';
import { Table, Button, Divider, Modal, message } from 'antd';
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import BaseApi from 'services/BaseApi';
// material-ui
import { Grid, Stack, Typography } from '@mui/material';
//const { confirm } = Modal;

const ProductMainGroupList = () => {
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [deletedId, setDeletedId] = useState(0);
    //const [currentRecordId, setCurrentRecordId] = useState(0);
    const columns = [
        {
            title: 'Sr.No',
            dataIndex: 'id',
            key: 'id',
            //defaultSortOrder: 'descend',
            defaultSortOrder: 'ascend',
            sorter: (a, b) => a.id - b.id
        },
        {
            title: 'Product Main Group Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            defaultSortOrder: 'descend'
        },
        {
            title: 'Product Main Group Short Name',
            dataIndex: 'shortName',
            key: 'shortName'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => {
                return (
                    <span>
                        <Link to={'/productmaingroup/edit/' + record.id}>
                            <Button type="primary" id="btnEdit" name="btnEdit" icon={<EditOutlined />} size="small"></Button>
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
            }
        }
    ];

    const getAllList = async () => {
        const b = new BaseApi();
        const result = await b.getAll('productmaingroups');
        console.log(result);
        setData(result);
    };

    useEffect(() => {
        getAllList();
        visible: false;
    }, []);

    const showModal = (recordId) => {
        /* confirm({
            title: 'Are you sure delete this record?',
            icon: <ExclamationCircleOutlined />,
            content: '',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                handleOk();
            },
            onCancel() {
                handleCancel();
            }
        }); */
        console.log('id=', recordId);
        setDeletedId(recordId);
        setModalVisible(true);
    };
    const handleCancel = () => {
        setDeletedId(0);
        setModalVisible(false);
    };

    const handleOk = async () => {
        try {
            console.log('selected id : ', deletedId);
            const b = new BaseApi();
            const postData = { isDeleted: true, id: deletedId };
            console.log('postData=', postData);
            const method = 'patch';
            const msg = 'Record has been deleted successfully.';
            const res = await b.request('productmaingroups', postData, method);
            if (res.status === 200) {
                getAllList();

                message.success(msg, 5);
            }
            setModalVisible(false);
            setDeletedId(0);
        } catch (error) {}
    };
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h3">Product Main Group Details List</Typography>
                    <Link to={'//product-main-group-create'}>
                        <Button type="primary" id="btnCreate" name="btnCreate">
                            Create
                        </Button>
                    </Link>
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

export default ProductMainGroupList;
