'use server'

import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { z } from "zod";
import { revalidatePath } from 'next/cache'
import { redirect } from "next/navigation";

const MAX_FILE_SIZE = 500000
const ACCEPTED_IMAGE_TYPE = [
 'image/jpeg',
 'image/png',
 'image/jpg',
 'image/webp'

]
export async function SellYourItemsActions(prevState: any, formData: FormData) {
 const uploadSchema = z.object({
  name: z.string().min(4),
  description: z.string().min(5),
  contactEmail: z.string().min(1).email("This is not a valid Email"),
  price: z.string().min(1),
  imageUrl: z.any().refine((file)=>file?.size<= MAX_FILE_SIZE,`Max file size is 5MB`).
  refine((file)=>ACCEPTED_IMAGE_TYPE. includes(file?.type),`only .jpeg, .png, .jpg and webp are formats are supported`)
 })

 const validProduct = uploadSchema.safeParse({
  name: formData.get("name"),
  description: formData.get("description"),
  contactEmail: formData.get("contactEmail"),
  price: formData.get("price"),
  imageUrl: formData.get("imageUrl"),

 });
 if (!validProduct.success) {
return {
 type:"error",
 errors:validProduct.error.flatten().fieldErrors,
 message:"Missing fileds to create product"

}
 } 

 try {
  const {name,description,contactEmail,imageUrl,price}= validProduct.data
  const imageFile = `${Math.random()}-${imageUrl.name}`
  const supabase  = createServerActionClient({cookies})
  debugger
  const { data,error}=await supabase.storage.from('imgstorage').upload(imageFile,imageUrl
   ,{
   cacheControl:"3600",
   // upsert:false
  }
   )
   console.log(data,error);
   
  if(error){
   return {
    type:"error",
    message:"Databse error: failed to upload Image"
   }
  }
  if(data){
   
  const path = data.path
  const {error:productError}= await supabase.from('easysell-products').insert( {name,imageUrl:path,contactEmail,description,price})
  }
 } catch (error) {
  console.log('File upload error',error);
  return {
   type:'error',
   message:"Database error failed to create product "
  }
  
 }
 revalidatePath('/')
 redirect('/')
 
}