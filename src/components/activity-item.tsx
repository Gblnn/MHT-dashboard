import { db } from "@/firebase"
import { LoadingOutlined } from '@ant-design/icons'
import { Checkbox, ConfigProvider, message } from "antd"
import { format } from "date-fns"
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import DialogBox from "./dialogbox"
import EndWorkDialog from "./endwork-dialog"
import moment from "moment"

interface Props{
    title:string
    tag?:string
    icon:any
    classname?:string
    to:string
    status?:boolean
    id:number
    rid:number
    selectable?:boolean
    onDialogConfirm?:any
    dialogPrefetch:boolean
}

export default function ActivityItem(props: Props){

    const date = format(new Date(), "dd-MM-yyyy");
    const timestamp = moment().toString()
    const rid = props.id
    const [ename, setEname] = useState("")
    const [site, setSite] = useState("")
    const [start, setStart] = useState<any>()
    const [end, setEnd] = useState("")
    const [siteinfo, setSiteinfo] = useState("")
    const [startinfo, setStartinfo] = useState("")
    const [workinfo, setWorkinfo] = useState("")
    const [work, setWork] = useState("")
    const [dialog, setDialog] = useState(false)
    const [summarydialog, setSummaryDialog] = useState(false)
    let doc_id = ""
    const [postable, setPostable] = useState(false)
    const [endable, setEndable] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [time, setTime] = useState("")
    const [working, setWorking] = useState(false)
    const [checked, setChecked] = useState(false)
    const [items, setItems] = useState<any>([])
    
    // useEffect(()=>{
    //     console.log(moment(start, "hh:mm A").format("hh:mm A"))
    // },[start])


    useEffect(()=>{
        
    },[])

    useEffect(()=>{

        if(work=="Site Work"&&start){
            setPostable(true)
        }

        else{

            setPostable(false)

            if(site==""||work==""||start==""){
                setPostable(false)
                
            }
            else{
                setPostable(true)
            }

        }

        
        
    },[site, work, start])

    useEffect(()=>{
        if(end==""){
            setEndable(false)
        }   
        else{
            setEndable(true)
        }
    },[end])


    const getData = async () => {
        const RecordRef = collection(db, "records")
        const q = query(RecordRef, where("rid", "==", rid), where("status", "==", true))
        const records = await getDocs(q)
        records.forEach((doc)=>{
        
        setSiteinfo(doc.data().site)
        setStartinfo(doc.data().start)
        setWorkinfo(doc.data().work)
        
        if(doc.data()){
            setWorking(true)
        }
        else{
            setWorking(false)
        }
        })
        
        setSummaryDialog(true)
        setUploading(false)
        
    }

    const handleDisabled = () => {
        if(!checked){
            setChecked(true)
            const new_item = { id: props.id, name: props.title };
            setItems((prev:any) => {
                return[
                    ...prev,
                    new_item
                ]
            })
            // setItems((prevItems:any) => [...prevItems, new_item]);
            console.log(items)
        
        }else{
            setChecked(false)
        }
    }
    

    const handleClick = async () => {
            setUploading(true)
            await fetch("https://65d73a6d27d9a3bc1d7a7e03.mockapi.io/employees/"+props.id)
            .then(res => res.json())
            .then(data => {
                setEname(data.name)
                if(data.status==false){
                    setDialog(true)
                    setUploading(false)
                }
                else{
                    
                    getData()
                    
                    // fetch("https://65d73a6d27d9a3bc1d7a7e03.mockapi.io/records?rid="+rid)
                    // .then(res => res.json())
                    // .then(data => {
                    //     data.map((data:any)=>{
                    //         setSiteinfo(data.site)
                    //         console.log(data.rid)
                    //     })  
                    // })
                    
                    
                }
            }) 
      }

      const Assign = async () => {
        setDialog(false)
        setUploading(true)
        const obj = {rid, date, ename, site, work, start, end, status:true, timestamp}

        await addDoc(collection(db, "records"), obj)

        await fetch('https://65d73a6d27d9a3bc1d7a7e03.mockapi.io/employees/'+props.id, {
            method: 'PUT',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({status:true})
            })

        props.onDialogConfirm()
        setUploading(false)
        
        // window.location.reload()
      }

      const endWork = async () => {
        setSummaryDialog(false)
        setUploading(true)

        const RecordReference = collection(db, "records")
        const q = query(RecordReference, where("status", "==", true), where("rid", "==", rid))
        const records = await getDocs(q)
        records.forEach((doc)=>{
            doc_id = doc.id
        })
        
        try {
            await updateDoc(doc(db, "records", doc_id),{end:end,status:false})

            await fetch('https://65d73a6d27d9a3bc1d7a7e03.mockapi.io/employees/'+props.id, {
            method: 'PUT',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({status:false})
            
            })
            props.onDialogConfirm()
            
            

        } catch (error) {
            message.error("Updation failed")
            console.log(error)
        }

        //     fetch('https://65d73a6d27d9a3bc1d7a7e03.mockapi.io/records/'+refid, {
        //         method: 'PUT',
        //         headers: {'content-type':'application/json'},
        //         body: JSON.stringify({end:end})
                
        //         })
        //         console.log(end)
        
            // setTimeout(()=>{
            // window.location.reload()
            // },500)

            setUploading(false)
      }

      const CancelWork = async () => {
        setUploading(true)
        setSummaryDialog(false)
        await fetch('https://65d73a6d27d9a3bc1d7a7e03.mockapi.io/employees/'+props.id, {
        method: 'PUT',
        headers: {'content-type':'application/json'},
        body: JSON.stringify({status:false})
        
        })
        setUploading(false)
        window.location.reload()
    }

    return(
        <>
        <Link style={{transition:"0.5s"}} onClick={props.selectable?handleDisabled:handleClick} to={props.to} className={props.classname}>
            <div className="dir-item fixed-length">
                <div style={{display:"flex", alignItems:'center', gap:"0.75rem"}}>
                    {
                        props.selectable?<ConfigProvider theme={{token:{colorPrimary:"blue"}}}><Checkbox style={{background:"rgba(0 0 0/0%)"}} checked={checked}/></ConfigProvider>:
                        uploading?<LoadingOutlined width="1.5rem"/>:props.icon
                    }
                
            <p style={{fontSize:"1.1rem"}}>{props.title}</p>
            
            
            <p style={{fontSize:"0.8rem", background:"var(--clr-accent)", color:"white", borderRadius:"1rem", paddingLeft:"0.5rem", paddingRight:"0.5rem", fontWeight:"500"}}>{props.tag}</p>
                </div>
            
            <div style={{display:"flex", alignItems:"center", gap:"0.5rem", transition:"0.3s"}}>
            {

                props.status?

                <p style={{color:"lime", fontSize:"1.1rem", fontWeight:"900", marginRight:"0.5rem", textShadow:"1px 1px 5px lime"}}>•</p>
                :null
            }
            {/* <ChevronRight width="1rem"/> */}
            </div>
            
        </div>
        </Link>
        <DialogBox postable={postable} ampm={(value:any)=>{setStart(time+" "+value)}} time={setTime} onChange={setSite} work={setWork} title="Assign work : " desc={ename} open={dialog} okText="Assign" onCancel={()=>{setDialog(false);setPostable(false)}} onConfirm={Assign} prefetch={props.dialogPrefetch} sitedetails={(e:any)=>{setSite(e.target.value);setWork("Site Visit")}} />

        <EndWorkDialog postable={endable} ampm={(value:any)=>{setEnd(time+" "+value);setEndable(true)}} time={setTime} title="End Work" open={summarydialog} okText="End Work" onCancel={()=>setSummaryDialog(false)} onConfirm={endWork} desc={ename} desc2={"on Site : "+siteinfo} desc3={"Started : "+startinfo} working={working} cancelWork={CancelWork} work={workinfo}/>
        </>
        
    )
}