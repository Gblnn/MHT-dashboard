import Back from "@/components/back";
import EditDialog from "@/components/edit-dialog";
import { db } from "@/firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
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

export default function Supervision() {

  const [dialog, setDialog] = useState(false);

  const [records, setRecords] = useState<Array<Record>>([])
  const firestore = db

  useEffect(()=>{
    async function fetchData(){

      const RecordCollection = collection(firestore, "records")
      const recordQuery = query(RecordCollection, orderBy("rid", "asc"))
      const querySnapshot = await getDocs(recordQuery)
      const fetchedData: Array<Record> = [];

      querySnapshot.forEach((doc)=>{
        fetchedData.push({id: doc.id, ...doc.data()} as Record)
      })
      setRecords(fetchedData)
    }
    fetchData();
  },[])

  // const [date, setDate] = useState("")

  // const [posts, setPosts] = useState<any[]>([]);


  // useEffect(() => {
  //   fetch("https://65d73a6d27d9a3bc1d7a7e03.mockapi.io/records")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPosts(data)
  //       data.map((data:any)=>{
  //         setDate(data.date)
  //       })
  //     });
  // }, [setPosts]);

  useEffect(()=>{

  })

  // const handleClick = () => {
  //   setDialog(true);
  // };
  return (
    <>
      <div className="page">
        <div style={{}}>
          <Back/>
          <div className="page-content">
          <div style={{display:"flex", width:"100%", height:"100svh", flexFlow:"column", overflowY:"auto", gap:"1rem", alignItems:"center", justifyContent:"flex-start", marginTop:"6rem", padding:"1.5rem"}}>
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
                    <th>Total Work</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    records.map((record)=>(
                      <tr key={record.id} onClick={()=>setDialog(true)}>
                        <td>{record.date}</td>
                        <td>{record.ename}</td>
                        <td>{record.site}</td>
                        <td>{record.work}</td>
                        <td>{record.start}</td>
                        <td>{record.end}</td>
                        <td>{record.end==""?"-":parseInt(record.end)-parseInt(record.start)}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            
          </div>
            
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
      <EditDialog title="Update entry" open={dialog} okText="Update" onChange="" onCancel={()=>setDialog(false)}/>
      
    </>
  );
}
