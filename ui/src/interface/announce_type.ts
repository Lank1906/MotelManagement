export default interface AnnounceType{
    id:number,
    user_id?:number,
    for_id?:number,
    message:string,
    viewed:boolean,
    username:string
}