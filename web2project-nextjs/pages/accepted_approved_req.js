import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router"


export default function () {
  const[orders1,setOrders1]=useState([])
  const[orders2,setOrders2]=useState([])
  const [user,setUser]=useState({})
  const router=useRouter()
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("shop_user")) === null || (JSON.parse(localStorage.getItem("shop_user")).type !== "seller" && JSON.parse(localStorage.getItem("shop_user")).type !== "admin")) {
      router.push("/shop_login");
    }

    const fetchOrders = async () => {
      axios.get("/api/get_accepted_requests").then(res=>{
        setOrders1(res.data)
      });

      axios.get("/api/get_pending_requests").then(res=>{
        setOrders2(res.data)
      });
    };

    setUser(JSON.parse(localStorage.getItem("shop_user")));
    fetchOrders();
  }, []);


    let handleLogout=(e)=>{
      localStorage.setItem("shop_user",null)
      router.push("/shop_login")
      }
  return (
    <div>
        <div class="header">
            <h1 class="text-3xl font-semibold">Online Shopping Site</h1>
            <nav>
            <ul class="flex space-x-4">
                <li class="dropdown">
                <a href={user.type==="admin"?"/owner_dashboard":"/seller_dashboard"} class="dropdown-toggle">{user.type==="admin"?"Not Approved":"Pendings"}</a>
                </li>
                <li class="dropdown">
                <a href="#" class="dropdown-toggle" onClick={handleLogout}>Logout</a>
                </li>
            </ul>
            </nav>
        </div>
    <div class="btn bg-gray-100 flex-grow p-4 mb-16 mx-16 mt-8">
        <div class="bg-white p-4 rounded-lg shadow btn">
        <h3 class="text-lg font-bold mb-4 btn">Delivered orders</h3>
        <table class="table">
          <thead>
            <tr>
              <th class="py-2 px-4 border-b btn">ID</th>
              <th class="py-2 px-4 border-b btn">Name</th>
              <th class="py-2 px-4 border-b btn">Adress</th>
              <th class="py-2 px-4 border-b btn">Phone no.</th>
              <th class="py-2 px-4 border-b btn">Product 1</th>
              <th class="py-2 px-4 border-b btn">Product 2</th>
              <th class="py-2 px-4 border-b btn">Product 3</th>
              <th class="py-2 px-4 border-b btn">Time</th>
             </tr>
          </thead>
          <tbody>
            {orders1.map(order1=><tr>
              <td class="border-b py-2 px-2 w-1/4">{order1._id}</td>
              <td class="border-b py-2 px-2 ">{order1.name}</td>
              <td class="border-b py-2 px-2 ">{order1.address}</td>
              <td class="border-b py-2 px-2 ">{order1.phone}</td>
              <td class="border-b py-2 px-2 ">{order1.cproduct1}</td>
              <td class="border-b py-2 px-2 ">{order1.cproduct2}</td>
              <td class="border-b py-2 px-2 ">{order1.cproduct3}</td>
              <td class="border-b py-2 px-2 ">{order1.time}</td>

            </tr>)}
          </tbody>
        </table>
      </div>
      </div>

{user.type === "admin" && (
  <div class="btn bg-gray-100 flex-grow p-4 mb-16 mx-16 mt-8">
    <div class="bg-white p-4 rounded-lg shadow btn">
      <h3 class="text-lg font-bold mb-4 btn">Pending orders</h3>
      <table class="table">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b btn">ID</th>
            <th class="py-2 px-4 border-b btn">Name</th>
            <th class="py-2 px-4 border-b btn">Address</th>
            <th class="py-2 px-4 border-b btn">Phone no.</th>
            <th class="py-2 px-4 border-b btn">Product 1</th>
            <th class="py-2 px-4 border-b btn">Product 2</th>
            <th class="py-2 px-4 border-b btn">Product 3</th>
            <th class="py-2 px-4 border-b btn">Time</th>
          </tr>
        </thead>
        <tbody>
          {orders2.map(order2 => <tr>
              <td class="border-b py-2 px-2 w-1/4">{order2._id}</td>
              <td class="border-b py-2 px-2">{order2.name}</td>
              <td class="border-b py-2 px-2">{order2.address}</td>
              <td class="border-b py-2 px-2">{order2.phone}</td>
              <td class="border-b py-2 px-2">{order2.cproduct1}</td>
              <td class="border-b py-2 px-2">{order2.cproduct2}</td>
              <td class="border-b py-2 px-2">{order2.cproduct3}</td>
              <td class="border-b py-2 px-2">{order2.time}</td>
            </tr>)}
        </tbody>
      </table>
    </div>
  </div>
)}


        <div class="footer fixed bottom-0 w-full">
            &copy; 2023 Online Shopping Site. All rights reserved.
        </div>
    </div>
  )
}
