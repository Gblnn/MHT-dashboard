import { ConfigProvider } from "antd";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import {LoadingOutlined} from "@ant-design/icons"

interface Props {
  open: boolean;
  title?: string;
  desc?: string;
  desc2?: string;
  onCancel?: any;
  onConfirm?: any;
  okText:string
  action?: string;
  inputPlaceholder?:string
  inputOnChange?:any
  loading?:boolean
}

export default function SingleInputDialog(props: Props) {
  return (
    <>
      <Dialog open={props.open}>
        <DialogContent style={{background:"var(--clr-bg)", border:"none"}}>
          <DialogHeader>
            <DialogTitle style={{ fontSize: "1.5rem", display:"flex" }}>
              {props.title}
            </DialogTitle>

            <h3>{props.desc}</h3>

          
            <input placeholder={props.inputPlaceholder} onChange={props.inputOnChange}/>
            
            
            
          </DialogHeader>

          <DialogFooter>
            <div
              style={{
                border: "",
                width: "100%",
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
              }}
            >
              <ConfigProvider
                theme={{ token: { colorPrimary: "var(--color)" } }}
              >
                <button 
                  style={{ background: "var(--clr-opacity)" }}
                  onClick={props.onCancel}
                >
                  Cancel
                </button>
                <button
                  style={{ background: "var(--clr-accent)", width:"6rem", color:"white" }}
                  onClick={props.onConfirm}
                  disabled={props.loading}
                >
                  {props.loading?<LoadingOutlined/>:null}
                  {props.okText}
                  
                  
                </button>
              </ConfigProvider>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
