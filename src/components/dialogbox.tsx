import { ConfigProvider } from "antd";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";

interface Props {
    open:boolean
    title?:string
    desc?:string
    desc2?:string
    style?:any
    onCancel?:any
    onConfirm?:any
    action?:string
}

export default function DialogBox(props:Props){
    return(
        <>
        <Dialog open={props.open}>
            <DialogContent style={props.style}>
                <DialogHeader>
                <DialogTitle>{props.title}</DialogTitle>
                <br/>
                <h3>{props.desc}</h3>
                <DialogDescription>{props.desc2}</DialogDescription>
                <input placeholder="site"></input>
                </DialogHeader>
                <DialogFooter>
                    <div style={{border:"", width:"100%",display:"flex",gap:"1rem", justifyContent:"center"}}>
                    <ConfigProvider theme={{token:{colorPrimary:"var(--color)"}}}>
                    <button style={{background:"var(--clr-opacity)", fontSize:"1rem"}} onClick={props.onCancel} >Cancel</button>
                    <button style={{background:"crimson", fontSize:"1rem"}} onClick={props.onConfirm}>Confirm</button>
                    </ConfigProvider>
                    
                    </div>
                    
                </DialogFooter>
            </DialogContent>
        </Dialog>
        </>
    )
}