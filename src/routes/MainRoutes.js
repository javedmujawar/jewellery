import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const Typography = Loadable(lazy(() => import('pages/components-overview/Typography')));
const Color = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));
const CustomerList = Loadable(lazy(() => import('pages/masters/customer/index')));
const Customer = Loadable(lazy(() => import('pages/masters/customer/create')));
const ProductGroupList = Loadable(lazy(() => import('pages/masters/productgroup/index')));
const ProductGroup = Loadable(lazy(() => import('pages/masters/productgroup/create')));

const ProductMainGroupList = Loadable(lazy(() => import('pages/masters/productmaingroup/index')));
const ProductMainGroup = Loadable(lazy(() => import('pages/masters/productmaingroup/create')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'customer',
            element: <CustomerList />
        },
        {
            path: 'customer-create',
            element: <Customer />
        },
        {
            path: 'productgroup',
            element: <ProductGroupList />
        },
        {
            path: 'productgroup-create',
            element: <ProductGroup />
        },
        {
            path: 'product-main-group',
            element: <ProductMainGroupList />
        },
        {
            path: 'product-main-group-create',
            element: <ProductMainGroup />
        },
        {
            path: 'color',
            element: <Color />
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />
                }
            ]
        },
        {
            path: 'sample-page',
            element: <SamplePage />
        },
        {
            path: 'shadow',
            element: <Shadow />
        },
        {
            path: 'typography',
            element: <Typography />
        },
        {
            path: 'icons/ant',
            element: <AntIcons />
        }
    ]
};

export default MainRoutes;
