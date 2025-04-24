import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import { Toaster,toast } from "react-hot-toast"

export default function App({ Component, pageProps }) {
  const [message,setMessage]=useState({})
  let route=useRouter()
  const Submit=(e=>{
      e.preventDefault()
      let name=e.target.name.value
      let password=e.target.password.value
      let email=e.target.email.value
      let type="general"
      axios.post("/api/shop_register",{user:{email,password,type,name}}).then(res=>{
          let user=res.data
          localStorage.setItem("shop_user",JSON.stringify(user))
          if(user.type==="buyer"){
              route.push("/shop")
          }
      }).catch(e=>{
          toast.error("Email already exists!")
          //showMessage({head:"Sorry! ",body:"Email already exists"})
          
      })    
  })


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
  
return(
<dvi>
<div class="header">
    <h1 class="text-3xl font-semibold text-center">Registration Page</h1>
  </div>

  <div class="content">
    <img src="zoro.jpeg" alt="Vector Zoro - One Piece Zoro Chibi@seekpng.com" class="zoro-image"/>

    <div class="bg-white p-8 rounded shadow-lg registration-form">
      <h2 class="text-2xl font-semibold mb-6">Register</h2>
      <form id="registrationForm" class="space-y-6" onSubmit={Submit}>
        <div>
          <label for="name" class="block font-medium text-lg">Name</label>
          <input type="text" id="name" name="name" placeholder="your name" class="form-input mt-2 block w-full px-4 py-3 text-lg text-green-600 rounded rounded border border-gray-300" required/>
          <p id="nameError" class="form-error"></p>
        </div>
        <div>
          <label for="email" class="block font-medium text-lg">Email</label>
          <input type="email" id="email" name="email" placeholder="you email" class="form-input mt-2 block w-full px-4 py-3 text-lg text-green-600 rounded rounded border border-gray-300" required/>
          <p id="emailError" class="form-error"></p>
        </div>
        <div>
          <label for="password" class="block font-medium text-lg">Password</label>
          <input type="text" id="password" name="password" placeholder="your password" class="form-input mt-2 block w-full px-4 py-3 text-lg text-green-600 rounded rounded border border-gray-300" required/>
          <p id="passwordError" class="form-error"></p>
        </div>
        <div>
          <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 text-lg rounded">Register</button>
        	<a href="/shop_login" class="text-gray-400 hover:text-red-600 pl-32">Login</a>
        </div>
      </form>
    </div>
  </div>
  <div class="bg-blue-200 border border-blue-400 text-blue-700  rounded fixed bottom-0 left-0 " id="message" role="alert">
                <strong class="font-bold">{message.head} </strong>
                <span class="block sm:inline">{message.body}</span>
  </div>
        
  <Toaster
			position="top-center"
			reverseOrder={false}
			/>

  <div class="footer">
    <p>&copy; 2023 Your Company. All rights reserved.</p>
  </div>
</dvi>
)}