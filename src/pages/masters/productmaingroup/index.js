import { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import BaseApi from 'services/BaseApi';
// material-ui
import { Grid, Stack, Typography } from '@mui/material';
//import AuthWrapper from './AuthWrapper';

const ProductMainGroupList = () => {
    const [data, setData] = useState([]);
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
        }
    ];
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         productmaingroup: []
    //     };
    // }
    // componentDidMount() {
    //     const b = new BaseApi();
    //     console.log(b.test());
    //     // ProductMainGroupApi.getAll().then((res) => {
    //     //     this.setState({ productmaingroup: res.data });
    //     // });
    // }
    const getAllList = async () => {
        const b = new BaseApi();
        const result = await b.getAll('productmaingroups');
        console.log(result?.data);
        setData(result?.data);
    };

    useEffect(() => {
        getAllList();
    }, []);

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                    <Typography variant="h3">Product Main Group Details List</Typography>
                    <Link to={'//product-main-group-create'}>
                        <Button type="primary">Create</Button>
                    </Link>
                </Stack>
            </Grid>
            <Grid item xs={12}>
                <Table columns={columns} dataSource={data} bordered />;
            </Grid>
        </Grid>
    );
};

export default ProductMainGroupList;
