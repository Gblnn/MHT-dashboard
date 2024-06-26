import Back from "@/components/back";
import DefaultDialog from "@/components/default-dialog";
import IncomeSheetDialog from "@/components/income-sheet-dialog";
import { db } from "@/firebase";
import { LoadingOutlined } from '@ant-design/icons';
import { format } from "date-fns";
import { addDoc, collection, deleteDoc, doc, getAggregateFromServer, getDocs, query, sum } from "firebase/firestore";
import { motion } from 'framer-motion';
import { Package } from "lucide-react";
import { useEffect, useState } from "react";

type Record = {
  id:string,
  date:string,
  name:string,
  added:number,
  expense:number,
  balance:number
}

export default function PettyCash() {

  const [records, setRecords] = useState<Array<Record>>([])
  const firestore = db
  const [id, setId] = useState("")
  const date = format(new Date(), "dd-MM-yyyy");
  const [company, setCompany] = useState("")
  const [payment, setPayment] = useState("")
  const [amount, setAmount] = useState(0)

  const [loading, setLoading] = useState(false)
  const [dialog, setDialog] = useState(false)
  const [deleteDialog, setdeleteDialog] = useState(false)

  const [uploading, setUploading] = useState(false)

  const RecordCollection = collection(firestore, "petty-cash")

  const [added, setAdded] = useState(0)
  const [expense, setExpense] = useState(0)
  const [table, setTable] = useState(false)
  const [update, setUpdate] = useState(false)
  const [tableData, setTableData] = useState(false)

  useEffect(()=>{
    fetchData()
  },[])

  useEffect(()=>{
    fetchData()
  },[update])

  async function fetchData(){
    calculation()
    setLoading(true)
    const recordQuery = query(RecordCollection)
    const querySnapshot = await getDocs(recordQuery)
    const fetchedData:any = [];

    querySnapshot.forEach((doc)=>{
      fetchedData.push({id: doc.id, ...doc.data()})
    })
    setLoading(false)
    setRecords(fetchedData)
    setTableData(true)
    
  }

  const calculation = async () => {
    const snapshot = await getAggregateFromServer(RecordCollection, {
      added: sum('added'),
      expense: sum('expense')
    });
    
    console.log('total => ', snapshot.data().added);
    setAdded(snapshot.data().added)
    setExpense(snapshot.data().expense)
    setTable(true)

  }

  const addIncome = async () => {
    const obj = {date, company, payment, amount}
    setUploading(true)
    await addDoc(collection(db, "income"), obj)
    setUploading(false)
    setDialog(false)
    setTimeout(()=>{
      window.location.reload()
    },100)
  }

  const deleteEntry = async () => {
    setUploading(true)
    await deleteDoc(doc(db, "petty-cash", id))
    setUploading(false)
    setdeleteDialog(false)
    setUpdate(!update)
  }

  

  return (
    <>
      <div className="page">
        <div style={{}}>
          <Back/>
          <motion.div initial={{opacity:0, scale:0.99}} whileInView={{opacity:1,scale:1}}>
          <div className="page-content">
          <div style={{display:"flex", width:"100%", height:"100svh", flexFlow:"column", overflowY:"auto", gap:"1rem", alignItems:"center", justifyContent:"flex-start", marginTop:"", padding:"0.85rem", paddingTop:"3.5rem",}}>
          {/* {records.map((posts) => (
              <DirItem
                onclick={handleClick}
                key={posts.id}
                to=""
                icon={<File width="1rem" color="salmon" />}
                title={posts.date}
                
              />
            ))} */}
            <h1 style={{fontWeight:600, fontSize:"1.25rem", padding:"0.05rem", background:"var(--clr-opacity)", borderRadius:"1rem", paddingLeft:"1rem", paddingRight:"1rem", marginTop:"1.5rem"}}>Petty Cash</h1>
            
              <table style={{tableLayout:"fixed", width:"100%", textAlign:"center", border:""}} className="">
                <thead>
                  <tr >
                    
                  
                    <th style={{border:"1px solid"}}>Date</th>
                    <th style={{border:"1px solid"}}>Name</th>
                    <th style={{border:"1px solid"}}>Added</th>
                    <th style={{border:"1px solid"}}>Expenses</th>
                
                    
                    
            
                    {/* <th>Hours</th> */}
                  </tr>
                </thead>
                <tbody>
                  {
                    records.map((record)=>(
              
                      <tr onClick={()=>{setdeleteDialog(true);setId(record.id)}} key={record.id} >
                       
                        <td >{record.date}</td>
                        <td>{record.name==""?"--":record.name}</td>
                        <td>{record.added==0?"--":record.added}</td>
                        <td>{record.expense==0?"--":record.expense}</td>
                      
                        
                        {/* <td>{record.end==""?"-":String(
                          
                          moment.duration(moment(record.end, "h:mm A").diff(moment(record.start, "h:mm A"))).get("hours")
                          
                      )}
                      </td> */}
                      </tr>
                    ))
                  }
                </tbody>
                
                {tableData?
                <tfoot>
                <tr style={{background:"rgba(100 100 100/ 25%)"}}>
                  <td colSpan={2} style={{fontWeight:800}}>Total</td>
                  <td style={{fontWeight:800}}>{table?added:<LoadingOutlined/>}</td>
                  <td style={{fontWeight:800}}>{table?expense:<LoadingOutlined/>}</td>
                </tr>
                <tr>
                  <th colSpan={2}>Balance Amount</th>
                  <th colSpan={2}>{added-expense}</th>
                
                </tr>
                
              </tfoot>
              :null
                }
                

                
                
                
              {/* {
                tableData?
                <tfoot>
                  <tr style={{background:"rgba(100 100 100/ 20%)"}}>
                    <td style={{fontWeight:"bold"}}>Total</td>
                    <td></td>
                    <td></td>
                    {
                      table?
                      <td style={{fontWeight:"bold"}}>{total}</td>
                      :<td><LoadingOutlined/></td>
                    }
                    
                  </tr>
                </tfoot>
                :null
              } */}
                
                
              
                
              </table>
              {records.length<1?
              <div style={{ width:"100%",height:"90%", background:"", display:"flex", justifyContent:"center",alignItems:"center",fontSize:"1rem", position:"absolute"}}>
                {loading?<LoadingOutlined style={{fontSize:"2rem", color:"var(--clr-accent)"}}/>
                :<p style={{background:"var(--clr-opacity)", padding:"0.5rem", borderRadius:"1rem", paddingLeft:"1rem", paddingRight:"1rem",display:"flex", gap:"0.4rem", alignItems:"center", opacity:0.75, userSelect:"none" }}><Package width="1.1rem"/> Record Empty</p>}
              
              </div>
              :null
              }
            
          </div>
            
          </div>
          </motion.div>
        </div>
      </div>
    

      <IncomeSheetDialog postable={true} title="Add Petty Expense" open={dialog} okText="Confirm" onCancel={()=>setDialog(false)} company={setCompany} payment={setPayment} amount={(e:any)=>setAmount(Number(e.target.value))} onConfirm={addIncome} loading={uploading}/>

      <DefaultDialog title="Delete Entry?" open={deleteDialog} okText="Delete" onCancel={()=>setdeleteDialog(false)} onConfirm={deleteEntry} desc={id} loading={uploading}/>
      

      {/* <DefaultDialog
        open={dialog}
        title="Summary"
        okText="Done"
        desc={date}
        onCancel={() => setDialog(false)}
      /> */}
      {/* <EditDialog title="Update entry" open={dialog} okText="Update" onChange="" onCancel={()=>setDialog(false)}/> */}
      {/* <ComboDialog loading={loading} combo={<SiteComboBox items placeholder="Select Site" onChange={setSite}/>} title="Update site" inputPlaceholder="Site Name" open={sitedialog} okText="Update" onCancel={()=>setSiteDialog(false)} onConfirm={()=>handleSite(doc_id)}/>

      <ComboDialog loading={loading} combo={<WorkComboBox items placeholder="Select work" onChange={setWork}/>} title="Update work" inputPlaceholder="Select Work" open={workdialog} okText="Update" onCancel={()=>setWorkDialog(false)} onConfirm={()=>handleWork(doc_id)}/>

      <ComboDialog loading={loading} combo={<div style={{display:"flex", gap:"0.5rem"}}>
        <TimeComboBox placeholder="Select Time" items onChange={setTime}/>
        <AMPMCombo items placeholder="AM/PM" onChange={(value:any)=>{setStart(time+" "+value);console.log(time+value)}}/>
      </div>} title="Update Start time" open={startdialog} okText="Update" onCancel={()=>setStartDialog(false)} onConfirm={()=>handleStart(doc_id)}/>

      <ComboDialog loading={loading} combo={<div style={{display:"flex", gap:"0.5rem"}}>
        <TimeComboBox placeholder="Select Time" items onChange={setTime}/>
        <AMPMCombo items placeholder="AM/PM" onChange={(value:any)=>{setEnd(time+" "+value);console.log(time+value)}}/>
      </div>} title="Update End time" open={enddialog} okText="Update" onCancel={()=>setEndDialog(false)} onConfirm={()=>handleEnd(doc_id)} /> */}
      
    </>
  );
}
