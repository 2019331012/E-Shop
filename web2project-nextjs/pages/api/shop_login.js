import ShopUser from "@/models/ShopUser"

export default function handler(req, res) {
    if(req.method=="POST")
        {
            console.log(req.body)
            let user=req.body

            if(user.email === "ecommerce@ecommerce.com" && user.password === "ecommerce++sr++fz" ){
                res.status(200).json({email:"ecommerce@ecommerce.com",password:"ecommerce++sr++fz",type:"admin"});
            }

            else{
                ShopUser.find({email:user.email,password:user.password}).then(result=>{
                    console.log(result)
                    if(result[0]!==null)
                        {
                        res.status(200).json(result[0])}
                    else
                        res.status(404).json({error:"error"})
                })
            }
    
        }
    

  }
  
