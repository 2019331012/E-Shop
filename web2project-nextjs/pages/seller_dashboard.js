import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router"


export default function () {
  const[orders,setOrders]=useState([])
  const [message,setMessage]=useState({})  
  const router=useRouter()
  const [user,setUser]=useState({})

  useEffect(()=>{

    if(JSON.parse(localStorage.getItem("shop_user"))===null||JSON.parse(localStorage.getItem("shop_user")).type!="seller")
        router.push("/shop_login")
    setUser(JSON.parse(localStorage.getItem("shop_user")))

    axios.get("/api/get_pending_requests").then(res=>{
      setOrders(res.data)
    })
    },[])

  let accept=(order)=>{
    axios.post("/api/accept_request",order).then(res=>{
      let neworders=[]
      orders.forEach(o=>{
        if(o._id!=res.data._id)
          neworders.push(o)
  
      })
      
      setOrders(neworders)
      showMessage({head:"Succesful! ",body:"request accepted"})

    })
  }
  let handleLogout=(e)=>{
		localStorage.setItem("shop_user",null)
		router.push("/shop_login")
	  }

  let showMessage=(message)=>{
    setMessage(message)
    let alert=document.querySelector("#message")
    alert.classList.add("px-2")
    alert.classList.add("py-2")
    setTimeout(()=>{
    setMessage({})
    alert.classList.remove("px-2")
    alert.classList.remove("py-2")
    },2000)
}  
  return (
    <div>
        <div class="header">
            <h1 class="text-3xl font-semibold">Online Shopping Site</h1>
            <nav>
            <ul class="flex space-x-4">
                <li class="dropdown">
                <a href="/accepted_approved_req" class="dropdown-toggle">History</a>
                </li>
                <li class="dropdown">
                <a href="#" class="dropdown-toggle" onClick={handleLogout}>Logout</a>
                </li>
            </ul>
            </nav>
        </div>
        <div class="bg-gray-100 flex-grow p-4 btn mb-16 mx-16 mt-8">
        <div class="bg-white p-4 rounded-lg btn shadow">
        <h3 class="text-lg font-bold btn mb-4">Pending orders</h3>
        <table class="table btn">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b btn">ID</th>
              <th class="py-2 px-4 border-b btn">Name</th>
              <th class="py-2 px-4 border-b btn">Adress</th>
              <th class="py-2 px-4 border-b btn">Phone no.</th>
              <th class="py-2 px-4 border-b btn">Product 1</th>
              <th class="py-2 px-4 border-b btn">Product 2</th>
              <th class="py-2 px-4 border-b btn">Product 3</th>

              <th class="py-2 px-4 border-b btn">Action</th>
             </tr>
          </thead>
          <tbody>
            {orders.map(order=><tr>
              <td class="border-b py-2 px-2 w-1/4">{order._id}</td>
              <td class="border-b py-2 px-2 ">{order.name}</td>
              <td class="border-b py-2 px-2 ">{order.address}</td>
              <td class="border-b py-2 px-2 ">{order.phone}</td>
              <td class="border-b py-2 px-2 ">{order.cproduct1}</td>
              <td class="border-b py-2 px-2 ">{order.cproduct2}</td>
              <td class="border-b py-2 px-2 ">{order.cproduct3}</td>
              <td class="border-b py-2 px-2 "><button class="accept-button" onClick={e=>accept(order)}>Deliver</button></td>
            </tr>)}
          </tbody>
        </table>
      </div>
      </div>

        <div class="footer fixed bottom-0 w-full">
            &copy; 2023 Online Shopping Site. All rights reserved.
        </div>

      <div class="bg-blue-200 border border-blue-400 text-blue-700  rounded fixed bottom-0 left-0 " id="message" role="alert">
                    <strong class="font-bold">{message.head} </strong>
                    <span class="block sm:inline">{message.body}</span>
      </div>
    </div>
  )
}
