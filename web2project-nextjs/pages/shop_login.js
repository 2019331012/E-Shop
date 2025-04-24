import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import { Toaster,toast } from "react-hot-toast"

export default function App({ Component, pageProps }) {

        const SubmitReg=(e=>{
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



    const [isFlipped, setIsFlipped] = useState(false);

    const flipCard = () => {
        setIsFlipped(!isFlipped);
    };

    const [message,setMessage]=useState({})
    let route=useRouter()
    const Submit=(e=>{
        e.preventDefault()
        let password=e.target.password.value
        let email=e.target.email.value
        axios.post("/api/shop_login",{email,password}).then(res=>{
            let user=res.data
            if(user.type==="buyer"){
                localStorage.setItem("shop_user",JSON.stringify(user))
                route.push("/shop")
            }
            else if(user.type==="seller")
            {
                localStorage.setItem("shop_user",JSON.stringify(user))
                route.push("/seller_dashboard")
            }
            else if(user.type === "admin"){
                localStorage.setItem("shop_user",JSON.stringify(user))
                route.push("/owner_dashboard")
            }
            else{
                //showMessage({head:"Sorry! ",body:"Incorrect email password"})
                toast.error("Incorrect email password!")
            }

        }).catch(e=>{
            toast.error("Incorrect email password!")
            //showMessage({head:"Sorry! ",body:"Incorrect email password"})

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

<div class="bg-gray-100 h-screen flex flex-col peropero">

    <div class="header bg-gray-800 py-4">
        <h1 class="text-3xl font-semibold text-center text-white">Login Page</h1>
    </div>

    <div class="flex-1 flex">

        <div class="w-4/5 bg-gray-800 peropero">
        {/*<div class="content">*/}
            <div className ="flex h-screen bg-cover bg-center" >
                <div class="flex-1 flex items-center">





            <div className={`flip-card ${isFlipped ? "is-flipped" : ""}`} >
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <div class="bg-white p-8 btn rounded shadow-lg login-form bg-white bg-opacity-80">
                        <h2 class="text-2xl font-semibold mb-6">Login</h2>

                        <form id="loginForm" class="space-y-6" onSubmit={Submit}>
                            <div>
                                <label for="email" class="block font-medium text-lg">Email</label>
                                <input type="email" id="email" name="email" class="form-input btn  mt-2 block w-full px-4 py-3 text-lg rounded rounded border border-gray-300" placeholder="Your email" required/>
                                <p id="emailError" class="form-error"></p>
                            </div>
                            <div>
                                <label for="password" class="block font-medium text-lg">Password</label>
                                <input type="password" id="password" name="password" class="form-input btn  mt-2 block w-full px-4 py-3 text-lg rounded border border-gray-300" placeholder="Your password" required/>
                                <p id="passwordError" class="form-error"></p>
                            </div>
                            <div>
                                <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 text-lg rounded">Login</button>

                                <a onClick={flipCard} class="text-gray-400 hover:text-green-600 pl-32	">Register</a>
                            </div>
                        </form>
                        </div>
                    </div>
                    <div className="flip-card-back">
                        <div class="bg-white p-8 btn rounded shadow-lg registration-form">
                            <h2 class="text-2xl font-semibold mb-6">Register</h2>
                            <form id="registrationForm" class="space-y-6" onSubmit={SubmitReg}>
                                <div>
                                <label for="name" class="block font-medium text-lg">Name</label>
                                <input type="text" id="name" name="name" placeholder="your name" class="form-input btn  mt-2 block w-full px-4 py-3 text-lg text-green-600 rounded rounded border border-gray-300" required/>
                                <p id="nameError" class="form-error"></p>
                                </div>
                                <div>
                                <label for="email" class="block font-medium text-lg">Email</label>
                                <input type="email" id="email" name="email" placeholder="you email" class="form-input btn  mt-2 block w-full px-4 py-3 text-lg text-green-600 rounded rounded border border-gray-300" required/>
                                <p id="emailError" class="form-error"></p>
                                </div>
                                <div>
                                <label for="password" class="block font-medium text-lg">Password</label>
                                <input type="text" id="password" name="password" placeholder="your password" class="form-input btn  mt-2 block w-full px-4 py-3 text-lg text-green-600 rounded rounded border border-gray-300" required/>
                                <p id="passwordError" class="form-error"></p>
                                </div>
                                <div>
                                <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 text-lg rounded">Register</button>
                                    <a onClick={flipCard} class="text-gray-400 hover:text-red-600 pl-32">Login</a>
                                </div>
                            </form>
                            </div>

                    </div>
                </div>
            </div>



                </div>
                <div className="flex-1 flex items-center justify-center"></div>

            </div>
            {/*</div>*/}
        </div>

        <div class="w-1/5 bg-blue-200 border-blue-400 text-blue-700 rounded">
            <div id="message" role="alert" class="px-4 py-2">
                <strong class="font-bold">{message.head}</strong>
                <span class="block sm:inline">{message.body}</span>
            </div>

            <Toaster position="top-center" reverseOrder={false} />

            <div class="flex flex-col justify-center items-center p-4">
                <h2 class="text-xl font-semibold mb-2">Contact Us</h2>
                <p class="text-gray-700 text-sm text-center mb-4">Have any questions? Feel free to contact us at <a href="mailto:example@example.com" class="text-blue-600 hover:underline">example@example.com</a>.</p>

                <h2 class="text-xl font-semibold mb-2">Language</h2>
                <div class="flex space-x-2">
                    <button class="bg-blue-700 text-white px-3 py-1 rounded-lg text-sm">US</button>
                    <button class="bg-blue-700 text-white px-3 py-1 rounded-lg text-sm">UK</button>
                </div>

                <div class="mt-4">
                    <h2 class="text-xl font-semibold mb-2">Support Us</h2>
                    <p class="text-gray-700 text-sm text-center">If you like our services, consider supporting us by donating 1k US dollar... </p>
                    <button class="bg-blue-700 text-white px-3 py-1 rounded-lg mt-2 text-sm">Donate Now</button>
                </div>
            </div>
        </div>
    </div>

    <div class="footer bg-gray-800 py-4">
        <p class="text-white text-center">&copy; 2023 Your Company. All rights reserved.</p>
    </div>
</div>



    )
}
