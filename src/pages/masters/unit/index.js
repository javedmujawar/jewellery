import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';

// material-ui
import { Grid, Stack, Typography } from '@mui/material';
//import AuthWrapper from './AuthWrapper';

const data = [
    {
        id: '1',
        name: '10 GM',
        short_name: '10gm'
    },
    {
        id: '2',
        name: '50 GM',
        short_name: '50gm'
    },
    {
        id: '3',
        name: '100 GM',
        short_name: '100gm'
    }
];

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
        title: 'Unit Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        defaultSortOrder: 'descend'
    },
    {
        title: 'Unit Short Name',
        dataIndex: 'short_name',
        key: 'short_name'
    }
];
const UnitList = () => (
    <Grid container spacing={3}>
        <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                <Typography variant="h3">Unit Master List</Typography>
                {/* <Typography component={Link} to="/productgroup-create" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                    Create
                </Typography> */}
                <Link to={'//unit-create'}>
                    <Button type="primary">Create</Button>
                </Link>
            </Stack>
        </Grid>
        <Grid item xs={12}>
            <Table columns={columns} dataSource={data} bordered />;
        </Grid>
    </Grid>
);
export default UnitList;
