export interface DataContextType{
    id?:number,
    type:string,
    setData:(id: number, type: string) => void
}