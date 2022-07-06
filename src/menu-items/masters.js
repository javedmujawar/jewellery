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
        /* {
            id: 'product',
            title: 'Product',
            type: 'item',
            url: '/product',
            icon: icons.ProfileOutlined,
            target: true
        }, */
        {
            id: 'productgroup',
            title: 'Product Group',
            type: 'item',
            url: '/productgroup',
            icon: icons.ProfileOutlined,
            target: false
        },
        {
            id: 'product-main-group',
            title: 'Product Main Group',
            type: 'item',
            url: '/product-main-group',
            icon: icons.ProfileOutlined,
            target: false
        }
    ]
};
export default masters;
