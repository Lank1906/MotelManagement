import { useContext } from "react";
import { DataContext } from "../libs/data_handling_context";

interface infoProps {
  widthE: string,
}

export default function Info(props: infoProps) {
  const dataContext=useContext(DataContext)
  return (
    <div className="info" style={{ width: props.widthE }}>
      <div className="info-content">
          {dataContext?.id +" "+dataContext?.type+'oooo'}
      </div>
    </div>
  );
}
