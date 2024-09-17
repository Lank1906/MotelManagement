export interface ToastifyContextType{
    message:string,
    setMessage:React.Dispatch<React.SetStateAction<string>>,
    close:boolean,
    setClose:React.Dispatch<React.SetStateAction<boolean>>,
    result:boolean,
    setResult:React.Dispatch<React.SetStateAction<boolean>>,
    confirmResult:(message:string)=>Promise<boolean>,
}