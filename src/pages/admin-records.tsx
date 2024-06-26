import AMPMCombo from "@/components/ampmcombo";
import Back from "@/components/back";
import ComboDialog from "@/components/combo-dialog";
import ConfirmDialog from "@/components/confirm-dialog";
import DefaultDialog from "@/components/default-dialog";
import EditMode from "@/components/edit-mode";
import SiteCombo from "@/components/site-combo";
import TimeComboBox from "@/components/time-combobox";
import WorkCombo from "@/components/work-combo";
import { db } from "@/firebase";
import { LoadingOutlined } from '@ant-design/icons';
import { message } from "antd";
import { collection, deleteDoc, doc, getDocs, orderBy, query, updateDoc } from "firebase/firestore";
import { Package } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";

type Record = {
  id:string,
  date:string,
  ename:string,
  site:string,
  work:string,
  start:string,
  end:string
}

export default function AdminRecords() {

  const [sitedialog, setSiteDialog] = useState(false);
  const [workdialog, setWorkDialog] = useState(false);
  const [startdialog, setStartDialog] = useState(false);
  const [enddialog, setEndDialog] = useState(false);
  const [deletedialog, setDeleteDialog] = useState(false)
  const [deleteconfirm, setDeleteConfirm] = useState(false)

  const [records, setRecords] = useState<any[]>([])
  const firestore = db

  const [ename, setEname] = useState("")
  const [doc_id, setDoc_id] = useState("")
  const [date, setDate] = useState("")
  const [sitepreview, setSitePreview] = useState("")

  const [time, setTime] = useState("")

  const [site, setSite] = useState("")
  const[work, setWork] = useState("")
  const [start, setStart] = useState("")
  const [end, setEnd] = useState("")
  const [rid, setRid] = useState("")
  const [onUpdate, setOnUpdate] = useState(false)
  const[loading, setLoading] = useState(false)
  // let [search, setSearch] = useState('')
  const [updating, setUpdating] = useState(false)
  const [status, setStatus] = useState(false)
  const [editable, setEditable] = useState(false)

  async function fetchData(){
    setLoading(true)
    const RecordCollection = collection(firestore, "records")
    const recordQuery = query(RecordCollection, orderBy("date", "desc"))
    const querySnapshot = await getDocs(recordQuery)
    const fetchedData: Array<Record> = [];

    querySnapshot.forEach((doc)=>{
      fetchedData.push({id: doc.id, ...doc.data()} as Record)
    })
    setLoading(false)
    setRecords(fetchedData)
  }

  useEffect(()=>{
    fetchData();
  },[])

  useEffect(()=>{
    fetchData()
  },[onUpdate])

  const handleSite = async (p:any) => {
    setLoading(true)
    await updateDoc(doc(db, "records", p),{site:site})
    setLoading(false)
    setSiteDialog(false)
    setOnUpdate(!onUpdate)
  }

  const handleWork = async (p:any) => {
    setLoading(true)
    await updateDoc(doc(db, "records", p),{work:work})
    setLoading(false)
    setWorkDialog(false)
    setOnUpdate(!onUpdate)
  }

  const handleStart = async (p:any) => {
    setLoading(true)
    await updateDoc(doc(db, "records", p),{start:start})
    setLoading(false)
    setStartDialog(false)
    setOnUpdate(!onUpdate)
  }

  const handleEnd = async (p:any) => {
    setLoading(true)
    await updateDoc(doc(db, "records", p),{end:end})
    if(status==true){
      await fetch('https://65d73a6d27d9a3bc1d7a7e03.mockapi.io/employees/'+rid, {
            method: 'PUT',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({status:false})
            })
    }
    setLoading(false)
    setEndDialog(false)
    setOnUpdate(!onUpdate)
  }

  const handleDeleteDoc = async () => {
    setUpdating(true)
    setLoading(true)
    console.log(doc_id)
    try {
      await deleteDoc(doc(db, "records", doc_id))
      if(status==true){
        await fetch('https://65d73a6d27d9a3bc1d7a7e03.mockapi.io/employees/'+rid, {
            method: 'PUT',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({status:false})
            })
      }

      setOnUpdate(!onUpdate)
      setDeleteConfirm(false)
      setUpdating(false)
      
    } catch (error) {
      message.error(String(error))
    }
    
    
  }

  // const handleClick = () => {
  //   setDialog(true);
  // };


 

  return (
    <>
      <div className="page">
        <div>
        <Back/>
        <EditMode onClick={()=>setEditable(!editable)} editable={editable}/>
        </div>
          
          <div className="page-content">

          <div style={{display:"flex", width:"100%", height:"100svh", flexFlow:"column", overflowY:"auto", gap:"1rem", alignItems:"center", justifyContent:"flex-start", marginTop:"2.5rem", padding:"1.5rem", paddingTop:"2.5rem"}}>

          <h1 style={{fontWeight:600, fontSize:"1.25rem", padding:"0.05rem", background:"var(--clr-opacity)", borderRadius:"1rem", paddingLeft:"1rem", paddingRight:"1rem"}}>Time Sheet</h1>
          
            {/* <div style={{width:"100%"}}>

            <input onChange={(e)=>{setSearch(e.target.value);console.log(search)}} placeholder="Search Records" style={{width:"100%"}}/>

            </div> */}
            
          {/* {posts.map((posts) => (
              <DirItem
                onclick={handleClick}
                key={posts.id}
                to=""
                icon={<File width="1rem" color="salmon" />}
                title={posts.date}
                
              />
            ))} */}
            
              <table style={{tableLayout:"fixed", width:"100%", textAlign:"center"}}>
                <thead>
                  <tr>
                    
                    <th>Date</th>
                    <th>Name</th>
                    <th>Site</th>
                    <th>Work</th>
                    <th>Start</th>
                    <th>End</th>
                    <th>Hours</th>
                  </tr>
                  
                </thead>
                
                <tbody>
                
                  {
                    records
                  //   .filter((item)=>{
                  //     item.name.toLowerCase().includes(search)
                  // })
                  .map((record)=>(
                      <tr key={record.id} onClick={()=>{!editable?setDeleteDialog(true):null;setEname(record.ename);setDate(record.date);setDoc_id(record.id); setSitePreview(record.site); setStatus(record.status); setRid(record.rid)}}>
                        <td onClick={()=>{}}>{updating?<LoadingOutlined/>:record.date}</td>
                        <td>{record.ename}</td>
                        <td onClick={()=>{editable?setSiteDialog(true):null;setDoc_id(record.id)}}>{record.site}</td>
                        <td onClick={()=>{editable?setWorkDialog(true):null;setDoc_id(record.id)}}>{record.work}</td>
                        <td onClick={()=>{editable?setStartDialog(true):null;setDoc_id(record.id)}}>{record.start}</td>
                        <td onClick={()=>{editable?setEndDialog(true):null;setDoc_id(record.id);console.log(typeof(doc_id))}}>{record.end}</td>
                        <td>{record.end==""?"-":String(
                          
                          moment.duration(moment(record.end, "h:mm A").diff(moment(record.start, "h:mm A"))).get("hours")
                          
                      )}
                      </td>
                      </tr>
                    ))
                  }
                  
                </tbody>
                
              </table>
              {records.length<1?
              <div style={{ width:"100%",height:"75%", display:"flex", justifyContent:"center",alignItems:"center",fontSize:"0.85rem"}}>
              {loading?<LoadingOutlined style={{fontSize:"2rem", color:"var(--clr-accent)"}}/>
                :<p style={{background:"var(--clr-opacity)", padding:"0.5rem", borderRadius:"1rem", paddingLeft:"1rem", paddingRight:"1rem",display:"flex", gap:"0.4rem", alignItems:"center", opacity:0.75, fontSize:'1rem' }}><Package width="1.1rem"/> Record Empty</p>}
              </div>
              :null
              }
            

          </div>
            
          </div>
        
      </div>
      {/* <DefaultDialog
        open={dialog}
        title="Summary"
        okText="Done"
        desc={date}
        onCancel={() => setDialog(false)}
      /> */}
      {/* <EditDialog title="Update entry" open={dialog} okText="Update" onChange="" onCancel={()=>setDialog(false)}/> */}
      <ComboDialog loading={loading} combo={<SiteCombo onChange={setSite}/>} title="Update site" inputPlaceholder="Site Name" open={sitedialog} okText="Update" onCancel={()=>setSiteDialog(false)} onConfirm={()=>handleSite(doc_id)}/>

      <ComboDialog loading={loading} combo={<WorkCombo onChange={setWork}/>} title="Update work" inputPlaceholder="Select Work" open={workdialog} okText="Update" onCancel={()=>setWorkDialog(false)} onConfirm={()=>handleWork(doc_id)}/>

      <ComboDialog loading={loading} combo={<div style={{display:"flex", gap:"0.5rem"}}>
        <TimeComboBox placeholder="Select Time" items onChange={setTime}/>
        <AMPMCombo items placeholder="AM/PM" onChange={(value:any)=>{setStart(time+" "+value);console.log(time+value)}}/>
      </div>} title="Update Start time" open={startdialog} okText="Update" onCancel={()=>setStartDialog(false)} onConfirm={()=>handleStart(doc_id)}/>

      <ComboDialog loading={loading} combo={<div style={{display:"flex", gap:"0.5rem"}}>
        <TimeComboBox placeholder="Select Time" items onChange={setTime}/>
        <AMPMCombo items placeholder="AM/PM" onChange={(value:any)=>{setEnd(time+" "+value);console.log(time+value)}}/>
      </div>} title="Update End time" open={enddialog} okText="Update" onCancel={()=>setEndDialog(false)} onConfirm={()=>handleEnd(doc_id)} />

      <DefaultDialog title={ename} open={deletedialog} okText="Delete Entry" desc={sitepreview} desc2={date} onCancel={()=>setDeleteDialog(false)} onConfirm={()=>{setDeleteDialog(false);setDeleteConfirm(true)}}/>

      <ConfirmDialog title="Confirm Delete?" open={deleteconfirm} okText="Confirm" onCancel={()=>setDeleteConfirm(false)} onConfirm={handleDeleteDoc} loading={loading} desc="This record will be permanently deleted from the servers."/>
    </>
  );
}
