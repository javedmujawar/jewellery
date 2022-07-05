import { Table, Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
// material-ui
import { Grid, Stack, Typography } from '@mui/material';
//import AuthWrapper from './AuthWrapper';

const data = [
    {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street'
    },
    {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street'
    }
];

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
    }
];
const Customer = () => (
    <Grid container spacing={3}>
        <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                <Typography variant="h3">Customer List</Typography>
                <Typography component={Link} to="/customer-create" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                    Create
                </Typography>
            </Stack>
        </Grid>
        <Grid item xs={12}></Grid>
        <Table columns={columns} dataSource={data} bordered />;
    </Grid>
);
export default Customer;
