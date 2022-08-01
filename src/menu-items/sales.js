// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
const icons = {
    LoginOutlined,
    ProfileOutlined
};
// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //
const sales = {
    id: 'sales',
    title: 'Sales',
    type: 'group',
    children: [
        {
            id: 'newinvoice',
            title: 'New Invoice',
            type: 'item',
            url: '/newinvoice',
            icon: icons.ProfileOutlined,
            target: false
        },
        
        {
            id: 'salereturn',
            title: 'Sale Return',
            type: 'item',
            url: '/salereturn',
            icon: icons.ProfileOutlined,
            target: false
        }
    ]
};
export default sales;
