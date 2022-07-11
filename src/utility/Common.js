import{Tag } from 'antd';
export function statusTag(status){
if(status==='A')
{
    
    return <Tag color="green">active</Tag>
}
else{
    return <Tag color="red">inactive</Tag>
}
}