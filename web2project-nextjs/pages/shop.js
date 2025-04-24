import axios from "axios"
import { useEffect, useState } from "react"
import Modal from "./Modal/BankModal"
import { useRouter } from "next/router"
import { Toaster,toast } from "react-hot-toast"

export default function App({ Component, pageProps }) {
    const [product1,setProduct1]=useState(0)
    const [product2,setProduct2]=useState(0)
    const [product3,setProduct3]=useState(0)
    const [cproduct1,setCProduct1]=useState(0)
    const [cproduct2,setCProduct2]=useState(0)
    const [cproduct3,setCProduct3]=useState(0)
    const [orders,setOrders]=useState([])
    const [message,setMessage]=useState({})
	const [user,setUser]=useState({})
	const router=useRouter()


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

    let increment=(i)=>{
        let x=0
        if(i===1){x=product1; setProduct1(x+1)}
        if(i===2){x=product2; setProduct2(x+1)}
        if(i===3){x=product3; setProduct3(x+1);}
    }
    let decrement=(i)=>{
        let x=0
        if(i===1 && product1>0){x=product1; setProduct1(x-1)}
        if(i===2 && product2>0){x=product2; setProduct2(x-1)}
        if(i===3 && product3>0){x=product3; setProduct3(x-1);}
    }

    let order=(e)=>{
        e.preventDefault();
        if(cproduct1===0&&cproduct2===0&&cproduct3===0)
            {
            //showMessage({head:"Sorry! ",body:"no items in the cart"})
			toast.error("Sorry no items in the cart!")
            return
            }
        let name=e.target.name.value
        let address=e.target.address.value
        let phone=e.target.phone.value
        let status="not approved"
        let time=new Date().toLocaleString('en-GB', {day: '2-digit',month: '2-digit',year: '2-digit',hour: '2-digit',minute: '2-digit',});
        let email=user.email
        axios.post("/api/placeorder",{name,address,phone,cproduct1,cproduct2,cproduct3,email,time,status,user}).then(res=>{
            setCProduct1(0)
            setCProduct2(0)
            setCProduct3(0)
            let neworders=[]
            orders.forEach(order=>{
                neworders.push(order)
            })
            neworders.push(res.data)
            setOrders(neworders)
            setCProduct1(0)
            setCProduct2(0)
            setCProduct3(0)
			e.target.address.value=""
			e.target.phone.value=""
			e.target.name.value=""
			document.querySelector('.sidebar').classList.remove("open")
            //showMessage({head:"Message! ",body:"order placed."})
			toast.success("Oreder Placed!")
        }).catch(error=>{
			//showMessage({head:"Sorry! ",body:"insufficient balance."})
			toast.error("Insufficient Balance!")
		})
    }

	let handleLogout=(e)=>{
		localStorage.setItem("shop_user",null)
		router.push("/shop_login")
	  }

    useEffect(()=>{
				if(JSON.parse(localStorage.getItem("shop_user"))===null||JSON.parse(localStorage.getItem("shop_user")).type!="buyer")
					router.push("/shop_login")
				setUser(JSON.parse(localStorage.getItem("shop_user")))
				const dropdown = document.querySelector('.dropdown');
				const sidebar = document.querySelector('.sidebar');
				const sidebarClose = document.querySelector('.sidebar-close');
				const leftpanel = document.querySelector('.content');
				const header = document.querySelector('.header');
				dropdown.addEventListener('click', () => {
				  sidebar.classList.add('open');
				  leftpanel.style.width = '80vw';
				  header.style.width = '80vw';
				});

				sidebarClose.addEventListener('click', () => {
				  sidebar.classList.remove('open');
				  leftpanel.style.width = '100vw';
				  header.style.width = '100vw';
				});

				const ordersdropdown = document.querySelector('.orders-dropdown');
				const orderssidebar = document.querySelector('.orders-sidebar');
				const orderssidebarClose = document.querySelector('.orders-sidebar-close');

				ordersdropdown.addEventListener('click', () => {
				  orderssidebar.classList.add('open');
				  leftpanel.style.width = '80vw';
				  header.style.width = '80vw';
				});

				orderssidebarClose.addEventListener('click', () => {
				  orderssidebar.classList.remove('open');
				  leftpanel.style.width = '100vw';
				  header.style.width = '100vw';
				});

				document.addEventListener('click', (event) => {
				  if (!orderssidebar.contains(event.target)&&!sidebar.contains(event.target) && !dropdown.contains(event.target)  && !ordersdropdown.contains(event.target)) {
				    sidebar.classList.remove('open');
					leftpanel.style.width = '100vw';
					header.style.width = '98vw';
				    orderssidebar.classList.remove('open');
				  }
				});

				// Increment and decrement quantity
				const decrementButtons = document.querySelectorAll('.decrement');
				const incrementButtons = document.querySelectorAll('.increment');
				const quantityInputs = document.querySelectorAll('.quantity input');
				axios.post("/api/get_customer_orders",{email:JSON.parse(localStorage.getItem("shop_user")).email}).then(res=>{
					setOrders(res.data.orders)	
				})
                
				  
                

    },[])
return(<div>
    
    <div class="header btn">
				<h1 class="text-3xl font-semibold">Online Shopping Site</h1>
				<nav>
				  <ul class="flex space-x-4">
				    <li class="dropdown">
				      <a href="#" class="dropdown-toggle">Cart</a>
				      <div class="">
				        <div class="sidebar">
				          <div class="sidebar-header">
				            <h2>Cart</h2>
				            <span class="sidebar-close">&times;</span>
				          </div>
				          <div class="sidebar-content  bg-black-50 text-gray-600">
								<div class="container mx-auto p-4 bg-black-50">


											<div class="cart-product">
												<img src="product1.jpg" alt="Product 1"/>
												<div class="cart-product-details">
													<h3 class="font-bold">One Piece Action Figures – Hot New 23-28CM Gear Fourth Luffy Bound Man Figure</h3>
													<p>Quantity: {cproduct1}</p>
													<p class="cart-product-price">{20000*1}Tk</p>
													<p>Total: {20000*cproduct1}Tk</p>
												</div>
											</div>

											<div class="cart-product">
												<img src="product2.jpg" alt="Product 2"/>
												<div class="cart-product-details">
													<h3 class="font-bold">One Piece Figures – Monkey D. Luffy 25cm PVC Action Figure</h3>
													<p>Quantity: {cproduct2}</p>
													<p class="cart-product-price">80000Tk</p>
													<p>Total: {80000*cproduct2}Tk</p>
												</div>
											</div>

											<div class="cart-product">
												<img src="product3.jpg" alt="Product 3"/>
												<div class="cart-product-details">
													<h3 class="font-bold">One Piece Action Figures – Hot New 23-28CM Gear Fourth Luffy Bound Man Figure</h3>
													<p>Quantity: {cproduct3}</p>
													<p class="cart-product-price">96000</p>
													<p>Total: {96000*cproduct3}Tk</p>
												</div>
											</div>

											<p class="total-price font-bold">Total Price: {20000*cproduct1+80000*cproduct2+96000*cproduct3}Tk</p>
											<form id="updateForm" onSubmit={order}>
											<div class="mb-4">
												<label for="name" class="block mb-2">Name:</label>
												<input type="text" id="editname" name="name" class="w-full border border-gray-300 rounded p-2" required/>
											</div>
											<div class="mb-4">
												<label for="adress" class="block mb-2">Adress:</label>
												<input type="text" id="editeadress" name="address" class="w-full border border-gray-300 rounded p-2" required/>
											</div>
											<div class="mb-4">
												<label for="phone" class="block mb-2">Phone Number:</label>
												<input type="text" id="editphone" name="phone" class="w-full border border-gray-300 rounded p-2" required/>
											</div>
											<button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Place Order</button>
										</form>
										</div>	
				          </div>
				        </div>
				      </div>
				      
				    </li>
				    <li class="orders-dropdown">
				      <a href="#" class="dropdown-toggle">Orders</a>
				      <div class="">
				        <div class="sidebar orders-sidebar">
				          <div class="sidebar-header">
				            <h2>Orders</h2>
				            <span class=" sidebar-close orders-sidebar-close">&times;</span>
				          </div>
				          <div class="sidebar-content text-gray-600">
				          <div class="container mx-auto">
                            {orders.map(order=>(
									<div class="order-container ">
										<div class="order-header">
											<h2 class="order-title">{order.address}</h2>
											<p class="order-timestamp">{order.name}</p>
											</div>
										<div class="order-header">
											<p class="order-timestamp">{order.phone}</p>
											<p class="order-timestamp">{order.time}</p>
										</div>{order.status==="delivered"?<p class="order-status text-green-500">{order.status}</p>:<p class="order-status text-red-500">{order.status}</p>}
										<ul class="product-list">
											<li class="product-item">
												<div class="product-details">
													<div class="product-info">
														<p class="product-name">One Piece Figures – Monkey D. Luffy 25cm PVC Action Figure</p>
														<p class="product-quantity">Qty: {order.cproduct1}</p>
													</div>
												</div>
											</li>
											<li class="product-item">
												<div class="product-details">
													<div class="product-info">
														<p class="product-name">Hot New 23-28CM Gear Fourth Luffy Bound Man Figure</p>
														<p class="product-quantity">Qty: {order.cproduct2}</p>
													</div>
												</div>
											</li>
											
											<li class="product-item">
												<div class="product-details">
													<div class="product-info">
														<p class="product-name">One Piece Figure – Ronoa Zoro Three-blade Sauron PVC</p>
														<p class="product-quantity">Qty: {order.cproduct3}</p>
													</div>
												</div>
											</li>
										</ul>
										<p class="order-total">Total: {20000*order.cproduct1+80000*order.cproduct2+96000*order.cproduct3}</p>
									</div>

                                ))}

								</div>
				          </div>
				        </div>
				      </div>
				    </li>
				    <li><a href="#" onClick={handleLogout}>Logout</a></li>
				  </ul>
				</nav>
			</div>

			<div class="content bg-red-100">
				<div class="product-card btn bg-black ">
				  <img class="image" src="product1.jpg" alt="Product 1"/>
				  <div class="details">
				  <h3>One Piece Figurenes – Monkey D. Luffy 25cm PVC Action Figure</h3>
				  <p>Size: about 25cm hight <br/>Material: High Quality PVC <br/>Function: Collection, Decorations, Gifts And Other<br/>
				  price:<b>20000 Tk</b>
				  </p>
				  <div class="quantity-container bg-gray">
				    <div class="quantity">
				      <button class="decrement bg-black text-white px-3 py-2 rounded-l" onClick={(e)=>decrement(1)}>-</button>
				      <input type="text" value={product1} min="0" class="border border-gray-300 px-3 py-2 text-center w-16"/>
				      <button class="increment bg-black text-white px-3 py-2 rounded-r" onClick={(e)=>increment(1)}>+</button>
				    </div>
				    <button class="add-to-cart ml-4" onClick={(e)=>{setCProduct1(product1);toast.success("Cart Updated!")}}>Add to Cart</button>
				  </div>
				</div>
				</div>

				<div class="product-card btn bg-gray-50">
				  <img class="image" src="product2.jpg" alt="Product 2"/>
				  <div class="details">
				  <h3>Hot New 23-28CM Gear Fourth Luffy Bound Man Figure	</h3>
				  <p>Material: PVC Package<br/> protection: bubble column protection<br/>price: <b>80000 Tk</b></p>
				  <div class="quantity-container">
				    <div class="quantity">
				      <button class="decrement bg-black text-white px-3 py-2 rounded-l" onClick={(e)=>decrement(2)}>-</button>
				      <input type="number" value={product2} min="0" class="border border-gray-300 px-3 py-2 text-center w-16"/>
				      <button class="increment bg-black text-white px-3 py-2 rounded-r" onClick={(e)=>increment(2)}>+</button>
				    </div>
				    <button class="add-to-cart ml-4" onClick={(e)=>{setCProduct2(product2);toast.success("Cart Updated!")}}>Add to Cart</button>
				  </div>
				</div>
				</div>

				<div class="product-card btn">
					<div class="image">
						<img class="image" src="product3.jpg" alt="Product 3"/>
					 </div>
				  <div class="details">
					<h3>One Piece Figure – Ronoa Zoro Three-blade Sauron PVC</h3>
					<p>
						Origin: CN(Origin) <br/>
						Model Sort: Remastered Model <br/>
						Theme: Film & TV <br/>
						Materials: PVC<br/>
						price:<b>96000 Tk</b>
					</p>
					<div class="quantity-container">
						<div class="quantity">
							<button class="decrement bg-black text-white px-3 py-2 rounded-l" onClick={(e)=>decrement(3)}>-</button>
							<input type="number" value={product3} min="0" class="border border-gray-300 px-3 py-2 text-center w-16"/>
							<button class="increment bg-black text-white px-3 py-2 rounded-r" onClick={(e)=>increment(3)}>+</button>
						</div>
						<button class="add-to-cart ml-4" onClick={(e)=>{setCProduct3(product3);toast.success("Cart Updated!")}}>Add to Cart</button>
					</div>
				</div>
					</div>
			</div>
			<Modal user={user} setUser={setUser}/>
            <div class="bg-blue-200 border border-blue-400 text-blue-700  rounded fixed bottom-0 left-0 " id="message" role="alert">
                <strong class="font-bold">{message.head} </strong>
                <span class="block sm:inline">{message.body}</span>
            </div>
			<Toaster
			position="top-center"
			reverseOrder={false}
			/>
			<div class="footer">
				<p>&copy; 2023 Online Shopping Site. All rights reserved.</p>
			</div>
</div>) 
}
