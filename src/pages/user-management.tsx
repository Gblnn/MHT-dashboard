import AddButton from "@/components/add-button";
import Back from "@/components/back";
import InputDialog from "@/components/input-dialog";
import UserItem from "@/components/user-item";
import { LoadingOutlined } from '@ant-design/icons';
import { File, Package } from "lucide-react";
import { useEffect, useState } from "react";

export default function UserManagement(){

  const [posts, setPosts] = useState<any>([])

  const [addDialog, setAddDialog] = useState(false)

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const status = false
  let count = 0

  const [loading,  setLoading] = useState(false)
  const [pageload, setPageLoad] = useState(false)

  const [onUpdate, setOnUpdate] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchData()
  }, [onUpdate])

  const fetchData = async () => {
    setPageLoad(true)
    await fetch("https://65d73a6d27d9a3bc1d7a7e03.mockapi.io/users")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        // console.log(data.length)
        count = data.length
      })
    setPageLoad(false)
  }

  const AddEmployee = async () => {
    setLoading(true)
    const obj = {username:name, password:password, status}
    await fetch("https://65d73a6d27d9a3bc1d7a7e03.mockapi.io/users",
          {
                method:"POST",
                headers:{'content-type':'application/json'},
                body:JSON.stringify(obj)
          }
          )
    setLoading(false)
    setAddDialog(false)
    setOnUpdate(!onUpdate)
    
  }

  return(
    <>
    <div className="page">
      <Back/>
      <div className="page-content">
        
      <div className={count>8?"snap-top":"snap-center"} style={{display:"flex", width:"100%", height:"100svh", flexFlow:"column", overflowY:"scroll", gap:"1rem", alignItems:"center",paddingBottom:"4rem", marginTop:"4rem"}}>

      
        {
          posts.map((post:any)=>(
            <UserItem id={post.id} to="" icon={<File color="var(--clr-accent)" width="1rem"/>} key={post.id} title={post.username} tag={post.access=="admin"?"admin":""||post.access=="supervisor"?"supervisor":""} password={post.password} clickable={post.username=="admin"?false:true} onConfirm={()=>setOnUpdate(!onUpdate)}/>
          ))
        }
        {posts.length<1?
              <div style={{ width:"100%",height:"90%", background:"", display:"flex", justifyContent:"center",alignItems:"center",fontSize:"1rem", position:"absolute"}}>
                {pageload?<LoadingOutlined style={{fontSize:"2rem", color:"var(--clr-accent)"}}/>
                :<p style={{background:"var(--clr-opacity)", padding:"0.5rem", borderRadius:"1rem", paddingLeft:"1rem", paddingRight:"1rem",display:"flex", gap:"0.4rem", alignItems:"center", opacity:0.75, userSelect:"none" }}><Package width="1.1rem"/> Record Empty</p>}
              
              </div>
              :null
              }
      </div>
      </div>
      
    </div>


    <AddButton onClick={()=>setAddDialog(true)}/>
    
    <InputDialog title="Add User" inputPlaceholder="Enter Username" input2Placeholder="Create Password" inputOnChange={(e:any)=>setName(e.target.value)} input2OnChange={(e:any)=>setPassword(e.target.value)} open={addDialog} okText="Add" onCancel={()=>setAddDialog(false)} onConfirm={AddEmployee} loading={loading}/>

    
    </>
  )
}