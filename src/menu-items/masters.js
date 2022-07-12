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
            id: 'productsubgroup',
            title: 'Product Sub Group',
            type: 'item',
            url: '/productsubgroup',
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
        },
        {
            id: 'shape',
            title: 'Shape',
            type: 'item',
            url: '/shape',
            icon: icons.ProfileOutlined,
            target: false
        },
        {
            id: 'hsnsac',
            title: 'HSN / SAC',
            type: 'item',
            url: '/hsnsac',
            icon: icons.ProfileOutlined,
            target: false
        },
        {
            id: 'gst',
            title: 'GST',
            type: 'item',
            url: '/gst',
            icon: icons.ProfileOutlined,
            target: false
        },
        {
            id: 'warehouse',
            title: 'WareHouse',
            type: 'item',
            url: '/warehouse',
            icon: icons.ProfileOutlined,
            target: false
        },
        {
            id: 'bank',
            title: 'Bank',
            type: 'item',
            url: '/bank',
            icon: icons.ProfileOutlined,
            target: false
        },
        {
            id: 'payment-type',
            title: 'Payment Type',
            type: 'item',
            url: '/payment-type',
            icon: icons.ProfileOutlined,
            target: false
        },
        {
            id: 'counter',
            title: 'Counter',
            type: 'item',
            url: '/counter',
            icon: icons.ProfileOutlined,
            target: false
        },
        {
            id: 'country',
            title: 'Country',
            type: 'item',
            url: '/country',
            icon: icons.ProfileOutlined,
            target: false
        }


    ]
};
export default masters;
