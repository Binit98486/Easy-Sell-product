export const getCannonicalUrl=()=>{
 return process.env.NODE_ENV!== "production"?"http://localhost:3000":""
}

export const getImageUrl=(imgUrl:string)=>{
 return  process.env.NEXT_PUBLIC_SUPABASE_URL+"/storage/v1/object/public/imgstorage/"+imgUrl
}