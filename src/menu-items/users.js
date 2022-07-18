// assets
import {
    AppstoreAddOutlined,
    AntDesignOutlined,
    BarcodeOutlined,
    BgColorsOutlined,
    FontSizeOutlined,
    LoadingOutlined
} from '@ant-design/icons';

// icons
const icons = {
    FontSizeOutlined,
    BgColorsOutlined,
    BarcodeOutlined,
    AntDesignOutlined,
    LoadingOutlined,
    AppstoreAddOutlined
};

// ==============================|| MENU ITEMS - UTILITIES ||============================== //

const users = {
    id: 'users',
    title: 'Users',
    type: 'group',
    children: [
        {
            id: 'user-type',
            title: 'User Type',
            type: 'item',
            url: '/user-type',
            icon: icons.ProfileOutlined,
            target: false
        },
        {
            id: 'user-registration',
            title: 'New User',
            type: 'item',
            url: '/user-registration',
            icon: icons.ProfileOutlined,
            target: false
        }
        
    ]
};

export default users;
