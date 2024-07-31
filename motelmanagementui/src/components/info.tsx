interface infoProps {
  widthE:string;
}

export default function Info(props:infoProps) {
    return <div className="info" style={{width:props.widthE,padding:props.widthE=='350px'?"0px 20px":0}}>Info</div>;
  }
  