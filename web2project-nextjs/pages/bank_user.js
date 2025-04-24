import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios";
export default function App({ Component, pageProps }) 
{
const [transactions,setTransactions]=useState([])
const [user,setUser]=useState({})
const router = useRouter();
let useremail = '';
useEffect(()=>{

    let login=JSON.parse(localStorage.getItem("user"))

        
    if(!login||login.type!="general")
      router.push('/bank_login')

      axios.post('/api/get_user_transaction',{email:login.email}).then(res=>{

        setTransactions(res.data)
    })

      useremail = login.email;
      console.log(useremail);
      setTransactions([{to:"ab@gmail.com",from:"cc@gmail.com",amount:-10,time:"12/9/12"}])
    setUser(JSON.parse(localStorage.getItem("user")) )
},[])    
return(<div>
  <div class="flex h-screen">
    <div class="info bg-gray-900 text-white w-1/4 flex flex-col justify-between">
      <div>
        <h1 class="text-2xl font-bold p-4">User Dashboard</h1>
        <div class="p-4 user-info">
          <h2 class="text-lg font-bold mb-4">User Information</h2>
          <div class="mb-4">
            <label class="block text-gray-100 text-sm font-bold mb-2" for="name">Name</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" value={user.name} disabled />
          </div>
          <div class="mb-4">
            <label class="block text-gray-100 text-sm font-bold mb-2" for="email">Email</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" value={user.email} disabled />
          </div>
          <div class="mb-4">
            <label class="block text-gray-100 text-sm font-bold mb-2" for="balance">Account Balance(Taka)</label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-100 leading-tight focus:outline-none focus:shadow-outline highlight-balance" id="balance" type="text" value={user.balance} disabled />
          </div>
        </div>
      </div>
      <div class="my-8 mx-auto" >
        <button class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"  onClick={e=>{localStorage.removeItem("user");router.push('/bank_login');}}>Logout</button>
      </div>
    </div>

    <div class="tableman btn bg-gray-100 flex-grow p-4">
      <h2 class="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div class="bg-white p-4 rounded-lg shadow btn">
        <h3 class="text-lg font-bold mb-4">Transactions</h3>
        <table class="table btn">
          <thead class="btn">
            <tr class="btn">
              <th class="py-2 btn px-4 border-b">From</th>
              <th class="py-2 px-4 btn border-b">To</th>
              <th class="py-2 px-4 border-b btn">Amount (Taka)</th>
              <th class="py-2 px-4 border-b btn">Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction=>(
            <tr>

              <td class={transaction.from!=user.email?"rowcolor-green btn py-2 px-4 border-b w-1/4 overflow-auto":"rowcolor-red btn py-2 px-4 border-b w-1/4 overflow-auto"}>{transaction.from}</td>
              <td class={transaction.from!=user.email?"rowcolor-green btn py-2 px-4 border-b w-1/4 overflow-auto":"rowcolor-red btn py-2 px-4 border-b w-1/4 overflow-auto"}>{transaction.to}</td>
              <td class={transaction.from!=user.email?"rowcolor-green btn py-2 px-4 border-b w-1/4 overflow-auto":"rowcolor-red btn py-2 px-4 border-b w-1/4 overflow-auto"}>{transaction.amount}</td>
              <td class={transaction.from!=user.email?"rowcolor-green btn py-2 px-4 border-b w-1/4 overflow-auto":"rowcolor-red btn py-2 px-4 border-b w-1/4 overflow-auto"}>{transaction.time}</td>
            </tr>
            
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>)}
