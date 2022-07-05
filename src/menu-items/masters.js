// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
const icons = {
    LoginOutlined,
    ProfileOutlined
};
// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //
const masters = {
    id: 'masters',
    title: 'Masters',
    type: 'group',
    children: [
        {
            id: 'customer',
            title: 'Customer',
            type: 'item',
            url: '/customer',
            icon: icons.ProfileOutlined,
            target: false
        },
        {
            id: 'product',
            title: 'Product',
            type: 'item',
            url: '/product',
            icon: icons.ProfileOutlined,
            target: true
        }
    ]
};
export default masters;
