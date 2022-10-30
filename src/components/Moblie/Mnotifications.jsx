import { useState, useEffect } from "react";
import axios from "axios";
import Mheader from "./Mheader";
import Mnavbar from "./Mnavbar";
import jwtDecode from "jwt-decode";

const Mnotifications = (props)=>{
    let [commentUsersList, setCommentUsersList] = useState(null);
    let [likeUserList, setLikeUserList] = useState(null);
    let [username , setUsername] = useState(null);

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            const user = jwtDecode(token);
            if(!user){
                localStorage.removeItem('token');
            }else{
                setUsername(user.username);
            }
        }
        axios.post('/likes-list', {username: username}).then((res)=>{
            if(res.data){
                setLikeUserList(res.data.likeUsers);
                axios.post('/comments-list', {username: username}).then((res)=>{
                    if(res.data){
                        setCommentUsersList(res.data.commentUsers);
                    }
                });
            }
        });
    });

    return (
        <div>
            <Mheader />
            <div className="w-[90%] mx-auto my-32 min-h-[200px] h-auto bg-slate-200 rounded-lg">
                <h1 className="text-center font-semibold my-3 text-2xl">Notifications</h1>
                {commentUsersList && commentUsersList.reverse().map((c)=>{
                    return (
                        <div key={`${c.postId}${c.username}${Math.random()*1000}`} className="border-b-[1px] w-[90%] mx-auto border-slate-600 px-3 py-2 text-xl text-center">
                            {c.username} commented on your quote.
                        </div>
                    )
                })}
                {likeUserList && likeUserList.reverse().map((l)=>{
                    return (
                    <div key={`${l.postId}${l.username}${Math.random()*1000}`} className="border-b-[1px] w-[90%] mx-auto border-slate-600 px-3 py-2 text-xl text-center">
                        {l.username} likes your quote.
                    </div>
                    )
                })}
            </div>
            <Mnavbar />
        </div>
    )
}

export default Mnotifications;