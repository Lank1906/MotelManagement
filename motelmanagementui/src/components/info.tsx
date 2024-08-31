interface infoProps {
  widthE: string,
}

export default function Info(props: infoProps) {
  return (
    <div className="info" style={{ width: props.widthE }}>Info</div>
  );
}
