import Back from "@/components/back";
import { motion } from "framer-motion";
import { DollarSign, FileMinus, FilePen, Glasses, HandCoins } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DirItem from "../components/dir-item";

export default function AccountingIndex() {

    const usenavigate = useNavigate()
    const user = localStorage.getItem("username")

    useEffect(()=>{
        if(user!="admin"){
            usenavigate("/login")
        }
    },[])
  return (
    <div className="page">
      <div style={{}}>
        <Back/>
          <motion.div initial={{opacity:0}} whileInView={{opacity:1}}>
        <div className="page-content" style={{ padding: "1.75rem" }}>

        <DirItem
            to="/income-sheet"
            icon={<FilePen width="1.1rem" color="var(--clr-accent)" />}
            title="Income Sheet"
          />

        <DirItem
            to="/expenses"
            icon={<FileMinus width="1.1rem" color="var(--clr-accent)" />}
            title="Expense Sheet"
          />

        <DirItem
            to="/md-account"
            icon={<Glasses width="1.1rem" color="var(--clr-accent)" />}
            title="MD Account"
          />

          <DirItem
            to="/petty-cash-index"
            icon={<DollarSign width="1.1rem" color="var(--clr-accent)" />}
            title="Petty Cash"
          />

          <DirItem
            to=""
            icon={<HandCoins width="1.1rem" color="var(--clr-accent)" />}
            title="Borrowed Funds"
          />

          

          {/* <DirItem
            to=""
            icon={<ClipboardList width="1.1rem" color="var(--clr-accent)" />}
            title="Reports"
          />   */}
            

          {/* <DirItem
            to=""
            classname="disabled"
            icon={<Globe width="1rem" color="#6a6a6a" />}
            title="Unavailable"
          /> */}
        </div>
        </motion.div>
      </div>
    </div>
  );
}
