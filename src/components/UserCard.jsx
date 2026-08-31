

const UserCard = ({user}) => {

    const {firstName, lastName, photoUrl, age, gender, about} = user

    return (
        <div className='my-10 mx-10'>
            <div className="card bg-base-300 w-80 shadow-sm">
                <figure>
                    <img
                    src={photoUrl}
                    alt="photo" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    {age && gender && <p>{age + ", " + gender}</p>}
                    <p>{about}</p>
                    <div className="card-actions justify-center my-2">
                    <button className="btn btn-primary">ignore</button>
                    <button className="btn btn-secondary">interested</button>
                    </div>
                </div>
            </div>
        </div>
    )
    }

export default UserCard