import { db } from "@/firebase"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import {LoadingOutlined} from '@ant-design/icons'

interface Props{
  onChange?:any
  disabled?:boolean
}

type Record = {
  id:string,
  sitename:string
}

export default function WorkCombo(props:Props){
    const [sites, setSites] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    useEffect(()=>{
      getSites()
    },[])

    const getSites = async () => {
      setLoading(true)
        const RecordCollection = collection(db, "work")
        const recordQuery = query(RecordCollection, orderBy("work"))
        const querySnapshot = await getDocs(recordQuery)
        const fetchedData: Array<Record> = [];

        querySnapshot.forEach((doc)=>{
          fetchedData.push({id: doc.id, ...doc.data()} as Record)
        })
        setLoading(false)
        setSites(fetchedData)
    }
    return(
        <>
    
            <Select required onValueChange={props.onChange}>
            <SelectTrigger disabled={loading||props.disabled}
              style={{
                background: "var(--clr-bg)",
                border: "1px solid rgba(100 100 100/ 50%)",
                fontSize: "1.1rem",
                zIndex:"15"
              }}
            >
              <SelectValue placeholder={loading?<LoadingOutlined/>:"Select Work"} />
            </SelectTrigger>
            <SelectContent style={{ background: "#1a1a1a", color: "white", border:"2px solid rgba(100 100 100/ 50%)", height:"25ch" }}>
                {sites.map((site)=>(
                    <SelectItem style={{fontSize:"1.1rem"}} key={site.id} value={site.work}>{site.work}</SelectItem>
                ))}
              
              
              
            </SelectContent>
          </Select>

          
        

        </>
    )
}