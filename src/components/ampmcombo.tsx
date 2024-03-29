import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "./ui/select";
  
  interface Props {
    placeholder?: string;
    items: any
    onChange?:any
  }
  
  export default function AMPMCombo(props: Props) {
    return (
      <Select required onValueChange={props.onChange}>
        <SelectTrigger
          style={{
            background: "var(--clr-bg)",
            border: "1px solid rgba(100 100 100/ 50%)",
            fontSize: "1rem",
            flex:0.5
          }}
        >
          <SelectValue placeholder={props.placeholder} />
        </SelectTrigger>
        <SelectContent defaultChecked style={{ background: "#1a1a1a", color: "white", border:"2px solid rgba(100 100 100/ 50%)"}}>
          <SelectItem style={{fontSize:"1rem"}} value="AM">AM</SelectItem>
          <SelectItem style={{fontSize:"1rem"}} value="PM">PM</SelectItem>
          
          
        </SelectContent>
      </Select>
    );
  }
  