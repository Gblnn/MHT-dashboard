import { ConfigProvider, FloatButton } from "antd";
import {PlusOutlined} from '@ant-design/icons'

interface Props{
    onClick?:any
}

export default function AddButton(props:Props) {
    return(
        <ConfigProvider theme={{token:{colorPrimary:"var(--clr-btn)"}}}>
        <FloatButton className="float" icon={<PlusOutlined/>} shape="square" type="primary" onClick={props.onClick}/>
      </ConfigProvider>
    )
}