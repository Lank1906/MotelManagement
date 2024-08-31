export interface AnnounceContextType{
    message:string;
    setMessage: React.Dispatch<React.SetStateAction<string>>,
    type?:string;
    setType: React.Dispatch<React.SetStateAction<string>>,
    close:boolean,
    setClose:React.Dispatch<React.SetStateAction<boolean>>,
}