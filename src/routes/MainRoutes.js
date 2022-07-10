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
const UtilColor = Loadable(lazy(() => import('pages/components-overview/Color')));
const Shadow = Loadable(lazy(() => import('pages/components-overview/Shadow')));
const AntIcons = Loadable(lazy(() => import('pages/components-overview/AntIcons')));

const ProductGroupList = Loadable(lazy(() => import('pages/masters/productgroup/Index')));
const ProductGroup = Loadable(lazy(() => import('pages/masters/productgroup/Create')));
const ProductMainGroupList = Loadable(lazy(() => import('pages/masters/productmaingroup/Index')));
const ProductMainGroup = Loadable(lazy(() => import('pages/masters/productmaingroup/Create')));
const UnitList = Loadable(lazy(() => import('pages/masters/unit/Index')));
const Unit = Loadable(lazy(() => import('pages/masters/unit/Create')));
const PurityList = Loadable(lazy(() => import('pages/masters/purity/Index')));
const Purity = Loadable(lazy(() => import('pages/masters/purity/Create')));
const CategoryList = Loadable(lazy(() => import('pages/masters/category/Index')));
const Category = Loadable(lazy(() => import('pages/masters/category/Create')));
const SubCategoryList = Loadable(lazy(() => import('pages/masters/subcategory/Index')));
const SubCategory = Loadable(lazy(() => import('pages/masters/subcategory/Create')));
const ColorList = Loadable(lazy(() => import('pages/masters/color/Index')));
const Color = Loadable(lazy(() => import('pages/masters/color/Create')));
const SizeList = Loadable(lazy(() => import('pages/masters/size/Index')));
const Size = Loadable(lazy(() => import('pages/masters/size/Create')));
const ShapeList = Loadable(lazy(() => import('pages/masters/shape/Index')));
const Shape = Loadable(lazy(() => import('pages/masters/shape/Create')));
const HsnSacList = Loadable(lazy(() => import('pages/masters/hsnsac/Index')));
const HsnSac = Loadable(lazy(() => import('pages/masters/hsnsac/Create')));
const GstList = Loadable(lazy(() => import('pages/masters/gst/Index')));
const Gst = Loadable(lazy(() => import('pages/masters/gst/Create')));


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
            path: 'product-main-group',
            element: <ProductMainGroupList />
        },
        {
            path: 'product-main-group/add',
            element: <ProductMainGroup />
        },
        {
            path: 'product-main-group/edit/:id',
            element: <ProductMainGroup />
        },
        {
            path: 'productgroup',
            element: <ProductGroupList />
        },
        {
            path: 'productgroup/add',
            element: <ProductGroup />
        },
        {
            path: 'productgroup/edit/:id',
            element: <ProductGroup />
        },
        {
            path: 'unit',
            element: <UnitList />
        },        
        {
            path: 'unit/add',
            element: <Unit/>
        },
        {
            path: 'unit/edit/:id',
            element: <Unit/>
        },
        {
            path: 'purity',
            element: <PurityList />
        },        
        {
            path: 'purity/add',
            element: <Purity/>
        },
        {
            path: 'purity/edit/:id',
            element: <Purity/>
        },
        {
            path: 'category',
            element: <CategoryList />
        },        
        {
            path: 'category/add',
            element: <Category/>
        },
        {
            path: 'category/edit/:id',
            element: <Category/>
        },
        {
            path: 'subcategory',
            element: <SubCategoryList />
        },        
        {
            path: 'subcategory/add',
            element: <SubCategory/>
        },
        {
            path: 'subcategory/edit/:id',
            element: <SubCategory/>
        },
        {
            path: 'color',
            element: <ColorList />
        },        
        {
            path: 'color/add',
            element: <Color/>
        },
        {
            path: 'color/edit/:id',
            element: <Color/>
        },
        {
            path: 'size',
            element: <SizeList />
        },        
        {
            path: 'size/add',
            element: <Size/>
        },
        {
            path: 'size/edit/:id',
            element: <Size/>
        },
        {
            path: 'shape',
            element: <ShapeList />
        },        
        {
            path: 'shape/add',
            element: <Shape/>
        },
        {
            path: 'shape/edit/:id',
            element: <Shape/>
        },
        {
            path: 'hsnsac',
            element: <HsnSacList />
        },        
        {
            path: 'hsnsac/add',
            element: <HsnSac/>
        },
        {
            path: 'hsnsac/edit/:id',
            element: <HsnSac/>
        },
        {
            path: 'gst',
            element: <GstList/>
        },        
        {
            path: 'gst/add',
            element: <Gst/>
        },
        {
            path: 'gst/edit/:id',
            element: <Gst/>
        },
        {
            path: 'util-color',
            element: <UtilColor />
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
