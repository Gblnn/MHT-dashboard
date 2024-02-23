import { motion } from "framer-motion";
import { ChevronLeft, Eye, File, User } from "lucide-react";
import { Link } from "react-router-dom";
import DirItem from "../components/dir-item";

export default function SupervisionIndex() {
  return (
    <div className="page">
      <div style={{}}>

      

      <Link
            style={{
              display: "flex",
              alignItems: "center",
              color: "crimson",
              fontWeight: 500,
              paddingLeft: "0.5rem",
              paddingRight:"0.5rem",
              width: "fit-content",
              margin: "1rem",
              position: "fixed",
              marginTop: "5rem",
              background:"#1a1a1a",
              borderRadius:"0.5rem",
              boxShadow:"1px 1px 20px rgba(0 0 0/ 70%)"
            }}
            to="/index"
          >
            <ChevronLeft width="1rem" /> Back

          </Link>
          <motion.div initial={{opacity:0}} whileInView={{opacity:1}}>
        <div className="page-content" style={{ padding: "1.75rem" }}>

          <DirItem
            to="/supervision"
            icon={<User width="1rem" color="salmon" />}
            title="Employees"
          />

            <DirItem
            to=""
            icon={<File width="1rem" color="salmon" />}
            title="Records"
            tag="Not Ready"
          />

            <DirItem
            to="/overview"
            icon={<Eye width="1rem" color="salmon" />}
            title="Overview"
          />

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
