import { authClient } from "./auth-client";

export const getTokenFromClient = async()=>{
     const {data} = await authClient.token();

   console.log(data,"tokne data");

   return data?.token;
}
