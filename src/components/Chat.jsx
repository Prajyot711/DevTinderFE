import { useEffect, useState } from "react";
import { useParams} from "react-router-dom"
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {

    const {targetUserId} = useParams();
    const[messages,setMessages] = useState([])
    const user = useSelector((store) => store.user)
    const userId = user?._id;
    const[newMessage, setNewMessage] = useState("")

    

    const fetchChatMessages = async() => {
        const chat = await axios.get(BASE_URL+"/chat/" + targetUserId, {withCredentials:true});
        console.log(chat.data.messages);

        const chatMessages = chat?.data?.messages.map( (msg) => {
            return{
                firstName : msg?.senderId?.firstName,
                lastName : msg?.senderId?.lastName,
                newMessage: msg.text,

            }
        })
        setMessages(chatMessages);
    }

    useEffect(() => {
        fetchChatMessages();
    },[])

    useEffect(() => {
        if(!userId) return;   
        const socket = createSocketConnection();
        socket.emit("joinChat", 
            {firstName:user.firstName,
            userId,
            targetUserId});

        socket.on("messageReceived", ({firstName,lastName,newMessage}) => {
            console.log(firstName + ":" + newMessage)
            setMessages(messages => [...messages, {firstName, lastName, newMessage}])
            console.log(messages)
        })

        return () => socket.disconnect();
    }, [userId, targetUserId])

    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", {
            firstName: user.firstName,
            lastName: user.lastName,
            userId,
            targetUserId,
            newMessage
        })
        setNewMessage("")
    }

    return (
        <div className="w-3/4 mx-auto border border-green-300 bg-gray-100 m-5 h-[70vh] flex flex-col">
            <h1 className="p-5 border-b border-gray-300">Chat</h1>
            
            <div className="flex-1 overflow-scroll p-5 ">
                {messages.map((msg,index) => {
                    return( 
                        <div key={index} className={"chat" + 
                        (user.firstName == msg.firstName ? "chat-end" : "chat-start")}>
                            <div className="chat-header">
                                {msg.firstName + " " + msg.lastName}
                                <time className="text-xs opacity-50">2 hours ago</time>
                            </div>
                            <div className="chat-bubble">{msg.newMessage}</div>
                            <div className="chat-footer opacity-50">Seen</div>
                        </div>
                )})}

            </div>
            
            <div className="p-5 border-t border-gray-300 flex tems-center gap-2">
                <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="flex-1 border bg-white border-gray-300 text-black rounded p-2"/>
                <button onClick={sendMessage} className="btn btn-secondary ">Send</button>
            </div>
            
        </div>
    )
}

export default Chat