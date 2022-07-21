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


const ProductMainGroupList = Loadable(lazy(() => import('pages/masters/productmaingroup/index')));
const ProductMainGroup = Loadable(lazy(() => import('pages/masters/productmaingroup/create')));
const ProductGroupList = Loadable(lazy(() => import('pages/masters/productgroup/index')));
const ProductGroup = Loadable(lazy(() => import('pages/masters/productgroup/create')));
const ProductSubGroupList = Loadable(lazy(() => import('pages/masters/productsubgroup/index')));
const ProductSubGroup = Loadable(lazy(() => import('pages/masters/productsubgroup/create')));
const UnitList = Loadable(lazy(() => import('pages/masters/unit/index')));
const Unit = Loadable(lazy(() => import('pages/masters/unit/create')));
const PurityList = Loadable(lazy(() => import('pages/masters/purity/index')));
const Purity = Loadable(lazy(() => import('pages/masters/purity/create')));
const CategoryList = Loadable(lazy(() => import('pages/masters/category/index')));
const Category = Loadable(lazy(() => import('pages/masters/category/create')));
const SubCategoryList = Loadable(lazy(() => import('pages/masters/subcategory/index')));
const SubCategory = Loadable(lazy(() => import('pages/masters/subcategory/create')));
const ColorList = Loadable(lazy(() => import('pages/masters/color/index')));
const Color = Loadable(lazy(() => import('pages/masters/color/create')));
const SizeList = Loadable(lazy(() => import('pages/masters/size/index')));
const Size = Loadable(lazy(() => import('pages/masters/size/create')));
const ShapeList = Loadable(lazy(() => import('pages/masters/shape/index')));
const Shape = Loadable(lazy(() => import('pages/masters/shape/create')));
const HsnSacList = Loadable(lazy(() => import('pages/masters/hsnsac/index')));
const HsnSac = Loadable(lazy(() => import('pages/masters/hsnsac/create')));
const GstList = Loadable(lazy(() => import('pages/masters/gst/index')));
const Gst = Loadable(lazy(() => import('pages/masters/gst/create')));
const WareHouseList = Loadable(lazy(() => import('pages/masters/warehouse/index')));
const WareHouse = Loadable(lazy(() => import('pages/masters/warehouse/create')));

const BankList = Loadable(lazy(() => import('pages/masters/bank/index')));
const Bank = Loadable(lazy(() => import('pages/masters/bank/create')));
const PaymentTypeList = Loadable(lazy(() => import('pages/masters/paymenttype/index')));
const PaymentType = Loadable(lazy(() => import('pages/masters/paymenttype/create')));
const CounterList = Loadable(lazy(() => import('pages/masters/counter/index')));
const Counter = Loadable(lazy(() => import('pages/masters/counter/create')));
const CountryList = Loadable(lazy(() => import('pages/masters/country/index')));
const Country = Loadable(lazy(() => import('pages/masters/country/create')));
const StateList = Loadable(lazy(() => import('pages/masters/state/index')));
const State = Loadable(lazy(() => import('pages/masters/state/create')));
const DistrictList = Loadable(lazy(() => import('pages/masters/district/index')));
const District = Loadable(lazy(() => import('pages/masters/district/create')));
const TalukaList = Loadable(lazy(() => import('pages/masters/taluka/index')));
const Taluka = Loadable(lazy(() => import('pages/masters/taluka/create')));
const VillageList = Loadable(lazy(() => import('pages/masters/village/index')));
const Village = Loadable(lazy(() => import('pages/masters/village/create')));

const CompanyList = Loadable(lazy(() => import('pages/masters/company/index')));
const Company = Loadable(lazy(() => import('pages/masters/company/create')));

const CustomerCategoryList = Loadable(lazy(() => import('pages/masters/customercategories/index')));
const CustomerCategory = Loadable(lazy(() => import('pages/masters/customercategories/create')));
const CustomerList = Loadable(lazy(() => import('pages/masters/customer/index')));
const Customer = Loadable(lazy(() => import('pages/masters/customer/create')));

const SupplierList = Loadable(lazy(() => import('pages/masters/supplier/index')));
const Supplier = Loadable(lazy(() => import('pages/masters/supplier/create')));

const EmployeeList = Loadable(lazy(() => import('pages/masters/employee/index')));
const Employee = Loadable(lazy(() => import('pages/masters/employee/create')));

const RateList = Loadable(lazy(() => import('pages/masters/rate/index')));
const Rate = Loadable(lazy(() => import('pages/masters/rate/create')));

const Product = Loadable(lazy(() => import('pages/masters/product/create')));
const ProductList = Loadable(lazy(() => import('pages/masters/product/index')));

//// Users Menu ///
const UserTypeList = Loadable(lazy(() => import('pages/users/usertype/index')));
const UserType = Loadable(lazy(() => import('pages/users/usertype/create')));
const UserRegistrationList = Loadable(lazy(() => import('pages/users/userregistration/index')));
const UserRegistration = Loadable(lazy(() => import('pages/users/userregistration/create')));




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
            path: 'productsubgroup',
            element: <ProductSubGroupList />
        },
        {
            path: 'productsubgroup/add',
            element: <ProductSubGroup />
        },
        {
            path: 'productsubgroup/edit/:id',
            element: <ProductSubGroup />
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
            path: 'warehouse',
            element: <WareHouseList/>
        },        
        {
            path: 'warehouse/add',
            element: <WareHouse/>
        },
        {
            path: 'warehouse/edit/:id',
            element: <WareHouse/>
        },
        {
            path: 'bank',
            element: <BankList/>
        },        
        {
            path: 'bank/add',
            element: <Bank/>
        },
        {
            path: 'bank/edit/:id',
            element: <Bank/>
        },
        {
            path: 'payment-type',
            element: <PaymentTypeList/>
        },        
        {
            path: 'payment-type/add',
            element: <PaymentType/>
        },
        {
            path: 'payment-type/edit/:id',
            element: <PaymentType/>
        },
        {
            path: 'counter',
            element: <CounterList/>
        },        
        {
            path: 'counter/add',
            element: <Counter/>
        },
        {
            path: 'counter/edit/:id',
            element: <Counter/>
        },
        {
            path: 'country',
            element: <CountryList/>
        },        
        {
            path: 'country/add',
            element: <Country/>
        },
        {
            path: 'country/edit/:id',
            element: <Country/>
        },
        {
            path: 'state',
            element: <StateList/>
        }, 
        {
            path: 'state/add',
            element: <State/>
        },
        {
            path: 'state/edit/:id',
            element: <State/>
        },
        {
            path: 'district',
            element: <DistrictList/>
        }, 
        {
            path: 'district/add',
            element: <District/>
        },
        {
            path: 'district/edit/:id',
            element: <District/>
        },
        {
            path: 'taluka',
            element: <TalukaList/>
        }, 
        {
            path: 'taluka/add',
            element: <Taluka/>
        },
        {
            path: 'taluka/edit/:id',
            element: <Taluka/>
        },
        {
            path: 'village',
            element: <VillageList/>
        }, 
        {
            path: 'village/add',
            element: <Village/>
        },
        {
            path: 'village/edit/:id',
            element: <Village/>
        },
        {
            path: 'company',
            element: <CompanyList/>
        }, 
        {
            path: 'company/add',
            element: <Company/>
        },
        {
            path: 'company/edit/:id',
            element: <Company/>
        },
        
        {
            path: 'customer',
            element: <CustomerList/>
        }, 
        {
            path: 'customer/add',
            element: <Customer/>
        },
        {
            path: 'customer/edit/:id',
            element: <Customer/>
        },
        
        {
            path: 'supplier',
            element: <SupplierList/>
        }, 
        {
            path: 'supplier/add',
            element: <Supplier/>
        },
        {
            path: 'supplier/edit/:id',
            element: <Supplier/>
        },

        {
            path: 'employee',
            element: <EmployeeList/>
        }, 
        {
            path: 'employee/add',
            element: <Employee/>
        },
        {
            path: 'employee/edit/:id',
            element: <Employee/>
        },

        {
            path: 'customer-categories',
            element: <CustomerCategoryList/>
        }, 
        {
            path: 'customer-categories/add',
            element: <CustomerCategory/>
        },
        {
            path: 'customer-categories/edit/:id',
            element: <CustomerCategory/>
        },
        {
            path: 'product',
            element: <ProductList/>
        }, 
        {
            path: 'product/add',
            element: <Product/>
        },
        {
            path: 'product/edit/:id',
            element: <Product/>
        },
          {
             path: 'rate',
             element: <RateList/>
        }, 
         {
             path: 'rate/add',
             element: <Rate/>
         },
         {
            path: 'rate/edit/:id',
            element: <Rate/>
         },
         {
            path: 'user-type',
            element: <UserTypeList/>
        }, 
        {
            path: 'user-type/add',
            element: <UserType/>
        },
        {
            path: 'user-type/edit/:id',
            element: <UserType/>
        },
        {
            path: 'user-registration',
            element: <UserRegistrationList/>
        }, 
        {
            path: 'user-registration/add',
            element: <UserRegistration/>
        },
        {
            path: 'user-registration/edit/:id',
            element: <UserRegistration/>
        },
        {
            path: 'util-color',
            element: <UtilColor />
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
