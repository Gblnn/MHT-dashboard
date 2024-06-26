import { LoadingOutlined } from '@ant-design/icons';
import { ConfigProvider } from "antd";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";

interface Props {
  open: boolean;
  title?: string;
  desc?: string;
  desc2?: string;
  onCancel?: any;
  onConfirm?: any;
  okText:string
  action?: string;
  loading?:boolean
}

export default function ConfirmDialog(props: Props) {
  return (
    <>
      <Dialog open={props.open}>
        <DialogContent style={{background:"var(--clr-bg)", border:"none"}}>
          <DialogHeader style={{display:"flex", alignItems:"center"}}>
            <DialogTitle style={{ fontSize: "1.5rem" }}>
              {props.title}
              
            </DialogTitle>

            <h3 style={{opacity:0.5}}>{props.desc}</h3>
            <h3 style={{opacity:0.5}}>{props.desc2}</h3>
          </DialogHeader>

          <DialogFooter>
            <div
              style={{
                border: "",
                width: "100%",
                display: "flex",
                gap: "0.5rem",
                justifyContent: "center",
                flexFlow:""
              }}
            >
              <ConfigProvider
                theme={{ token: { colorPrimary: "var(--color)" } }}
              >
                <button
                  style={{ background: "crimson", fontSize: "1rem", color:"white", fontWeight:600, display:"flex", alignItems:"center", gap:"0.5rem", flex:1, boxShadow:"" }}
                  onClick={props.onConfirm}
                  disabled={props.loading}
                >
                    
                  {props.loading?<LoadingOutlined width="1rem" style={{scale:1.75}}/>:null}
                  {props.okText}
                </button>
                <button
                  style={{ background: "var(--clr-opacity)", fontSize: "1rem", flex:1 }}
                  onClick={props.onCancel}
                >
                  Cancel
                </button>
                
              </ConfigProvider>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
