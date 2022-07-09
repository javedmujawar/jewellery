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
            id: 'product-main-group',
            title: 'Product Main Group',
            type: 'item',
            url: '/product-main-group',
            icon: icons.ProfileOutlined,
            target: false
        },
        {
            id: 'productgroup',
            title: 'Product Group',
            type: 'item',
            url: '/productgroup',
            icon: icons.ProfileOutlined,
            target: false
        },
        {
            id: 'unit',
            title: 'Unit',
            type: 'item',
            url: '/unit',
            icon: icons.ProfileOutlined,
            target: false
        },
        {
            id: 'purity',
            title: 'Purity',
            type: 'item',
            url: '/purity',
            icon: icons.ProfileOutlined,
            target: false
        },
        {
            id: 'category',
            title: 'Category',
            type: 'item',
            url: '/category',
            icon: icons.ProfileOutlined,
            target: false
        },
        {
            id: 'subcategory',
            title: 'Sub Category',
            type: 'item',
            url: '/subcategory',
            icon: icons.ProfileOutlined,
            target: false
        },
        {
            id: 'color',
            title: 'Color',
            type: 'item',
            url: '/color',
            icon: icons.ProfileOutlined,
            target: false
        },
        {
            id: 'size',
            title: 'Size',
            type: 'item',
            url: '/size',
            icon: icons.ProfileOutlined,
            target: false
        }
    ]
};
export default masters;
