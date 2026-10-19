import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect, useState } from "react"


const Premium = () => {

    const[isUserPremium, setIsUserPremium] = useState(false)

    useEffect(() => {
        verifyPremiumUser();
    },[])
  

    const verifyPremiumUser = async() => {
        const res = await axios.get(BASE_URL + "/premium/verify",{withCredentials:true})

        if(res.data.isPremium){
            setIsUserPremium(true)
        }
    }
    
    
    const handlePayment = async(type) => {
    try{
        const order = await axios.post(BASE_URL + "/payment/create" , {
            membershipType:type,
        },{
            withCredentials:true
        });

        console.log(order)
        const{amount, currency, notes, orderId} = order.data.data
        const{ keyId } = order.data

        const options = {
            key: keyId, // Replace with your Razorpay key_id
            amount: amount, // Amount is in currency subunits.
            currency: currency,
            name: 'DevTinder',
            description: 'Test Transaction',
            order_id: orderId, // This is the order_id created in the backend
            callback_url: BASE_URL + '/premium', // Your success URL
            prefill: {
                name: notes.firstName + " " + notes.lastName,
                email: notes.emailId,
            },
            theme: {
                color: '#F37254'
            },
            handler : verifyPremiumUser,
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    }catch(err){
        console.log(err.message)
    }
    }
  
    return isUserPremium ? "You are Already Premium User" : (
        <div className="flex w-full flex-col lg:flex-row my-20">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
            <h1 className="text-3xl font-bold">Silver Membership</h1>
            <ul>
                <li>- Chat with members</li>
                <li>- 100 Connectgion requests/day</li>
                <li>- Blue Tick</li>
                <li>- 3 months plan</li>
            </ul>
            <button className="btn btn-primary" onClick={() => handlePayment("silver")}>Buy Silver</button>
        </div>
        <div className="divider lg:divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
            <h1 className="text-3xl font-bold">Gold Membership</h1>
            <ul>
                <li>- Chat with members</li>
                <li>- Infinite Connectgion requests/day</li>
                <li>- Blue Tick</li>
                <li>- 6 months plan</li>
            </ul>
            <button className="btn btn-secondary" onClick={() => handlePayment("gold")}>Buy Gold</button>
        </div>
    </div>
  )
}

export default Premium