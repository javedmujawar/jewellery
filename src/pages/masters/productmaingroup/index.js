import { Table, Button } from 'antd';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ProductMainGroupApi from 'services/ProductMainGroupApi';
import BaseApi from 'services/BaseApi';
// material-ui
import { Grid, Stack, Typography } from '@mui/material';
//import AuthWrapper from './AuthWrapper';

const data = [
    {
        id: '1',
        name: 'Vivo',
        short_name: 'VV',
        description: 'Vivo Mobile'
    },
    {
        id: '2',
        name: 'Apple',
        short_name: 'AP',
        description: 'Apple Phone'
    },
    {
        id: '3',
        name: 'Nokia',
        short_name: 'NK',
        description: 'Nokia Phone'
    },
    {
        id: '4',
        name: 'Oppo',
        short_name: 'OP',
        description: 'Oppo Phone'
    },
    {
        id: '5',
        name: 'Charger',
        short_name: 'charger',
        description: 'Charger'
    },
    {
        id: '6',
        name: 'Battery',
        short_name: 'BT',
        description: 'Battery Heavy'
    },
    {
        id: '7',
        name: 'AST',
        short_name: 'ast',
        description: 'ast'
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
        title: 'Product Main Group Name',
        dataIndex: 'name',
        key: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        defaultSortOrder: 'descend'
    },
    {
        title: 'Product Main Group Short Name',
        dataIndex: 'short_name',
        key: 'short_name'
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description'
    }
];
//const ProductMainGroupList  = () => (
class ProductMainGroupList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productmaingroup: []
        };
    }
    componentDidMount() {
        console.log(BaseApi.test());
        ProductMainGroupApi.getAll().then((res) => {
            this.setState({ productmaingroup: res.data });
        });
    }
    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
                        <Typography variant="h3">Product Main Group Details List</Typography>
                        {/* <Typography component={Link} to="/productgroup-create" variant="body1" sx={{ textDecoration: 'none' }} color="primary">
                    Create
                </Typography> */}
                        <Link to={'//product-main-group-create'}>
                            <Button type="primary">Create</Button>
                        </Link>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Table columns={columns} dataSource={data} bordered />;
                </Grid>
                <Grid item xs={12}>
                    <div>
                        <h2 className="text-center">List</h2>
                        <div className="row">
                            <button className="btn btn-primary" onClick={this.addproductmaingroup}>
                                {' '}
                                Add
                            </button>
                        </div>
                        <br></br>
                        <div className="row">
                            <table className="table table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th> Name</th>
                                        <th> Short Name</th>
                                        <th> Description</th>
                                        <th> Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.productmaingroup.map((productmaingroup) => (
                                        <tr key={productmaingroup.id}>
                                            <td> {productmaingroup.name} </td>
                                            <td> {productmaingroup.shortName}</td>
                                            <td> {productmaingroup.description}</td>
                                            <td>
                                                <button
                                                    onClick={() => this.editproductmaingroup(productmaingroup.id)}
                                                    className="btn btn-info"
                                                >
                                                    Update{' '}
                                                </button>
                                                <button
                                                    style={{ marginLeft: '10px' }}
                                                    onClick={() => this.deleteproductmaingroup(productmaingroup.id)}
                                                    className="btn btn-danger"
                                                >
                                                    Delete{' '}
                                                </button>
                                                <button
                                                    style={{ marginLeft: '10px' }}
                                                    onClick={() => this.viewproductmaingroup(productmaingroup.id)}
                                                    className="btn btn-info"
                                                >
                                                    View{' '}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export default ProductMainGroupList;
