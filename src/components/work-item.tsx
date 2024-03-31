import { db } from '@/firebase'
import { LoadingOutlined } from '@ant-design/icons'
import { deleteDoc, doc } from 'firebase/firestore'
import { Briefcase, ChevronRight } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import ConfirmDialog from './confirm-dialog'
import DeleteUpdateDialog from './delete-update-dialog'

interface Props{
    title:string
    tag?:string
    icon:any
    classname?:string
    to:string
    status?:boolean
    id:string
    rid?:string
    password:string
    dialogtitle:string
    onDelete:any
}

export default function WorkItem(props: Props){

    
    // const [passport, setPassport] = useState("")
    // const [resident, setResident] = useState("")

    const [uploading, setUploading] = useState(false)
    const [overviewdialog, setOverviewDialog] = useState(false)
    const [confirmdialog, setConfirmDialog] = useState(false)

    const [loading, setLoading] = useState(false)


    // useEffect(()=>{
    //     console.log(moment(start, "hh:mm A").format("hh:mm A"))
    // },[start])

    



    const getData = async () => {
        setUploading(true)
        setOverviewDialog(true)
        setUploading(false)
        
    }

    const deleteData = async () => {
        setLoading(true)
        await deleteDoc(doc(db, "work", props.id))
        setLoading(false)
        setOverviewDialog(false)
        setConfirmDialog(false)
        props.onDelete()
    }

      


    return(
        <>
        <Link onClick={getData} to={props.to} className={props.classname}>
            <div className="dir-item fixed-length">
                <div style={{display:"flex", alignItems:'center', gap:"0.75rem"}}>
                {uploading?<LoadingOutlined width="1.5rem"/>:props.icon}
            <p style={{fontSize:"1.1rem"}}>{props.title}</p>
            {
                props.status?
                <p style={{color:"lime", fontSize:"1rem", fontWeight:"bolder"}}>•</p>
                :null
            }
            
            <p style={{fontSize:"0.8rem", background:"var(--clr-accent)", color:"white", borderRadius:"1rem", paddingLeft:"0.5rem", paddingRight:"0.5rem", fontWeight:"500"}}>{props.tag}</p>
                </div>
            
            <div style={{display:"flex"}}>
            <ChevronRight width="1rem"/>
            </div>
            
        </div>
        </Link>

        <DeleteUpdateDialog title={props.title} open={overviewdialog} okText="Delete" onCancel={()=>setOverviewDialog(false)} onConfirm={()=>{setConfirmDialog(true); setOverviewDialog(false)}} loading={loading} titleicon={<Briefcase/>}/>

        <ConfirmDialog title='Confirm Delete?' okText='Confirm' open={confirmdialog} onCancel={()=>setConfirmDialog(false)} onConfirm={deleteData} loading={loading}/>
        
        </>
        
    )
}