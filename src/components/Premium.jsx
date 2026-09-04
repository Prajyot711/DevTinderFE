

const Premium = () => {
  
  const handlePayment = async() => {

  }
  
    return (
    <div className="flex w-full flex-col lg:flex-row my-20">
        <div className="card bg-base-300 rounded-box grid h-80 grow place-items-center">
            <h1 className="text-3xl font-bold">Silver Membership</h1>
            <ul>
                <li>- Chat with members</li>
                <li>- 100 Connectgion requests/day</li>
                <li>- Blue Tick</li>
                <li>- 3 months plan</li>
            </ul>
            <button className="btn btn-primary" onClick={() => handlePayment()}>Buy Silver</button>
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
            <button className="btn btn-secondary" onClick={() => handlePayment()}>Buy Gold</button>
        </div>
    </div>
  )
}

export default Premium