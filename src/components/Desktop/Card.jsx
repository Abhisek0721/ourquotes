import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faMessage } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useState} from 'react';

const Card = (props)=>{
    const navigate = useNavigate();
    const [comment, setComment] = useState(null);
    const [commentsList, setCommentsList] = useState({});

    const addLike = (postId)=>{
        if(!props.data[1]){
            navigate('/login');
        }else{
            axios.post('/add-like', {
                'postId': postId,
                'username': props.data[1]
            });
            let like = document.getElementById(postId);
            like.classList.add('text-red-700');
        }
    }

    const commentSection = (postId)=>{
        let comment_sec = document.getElementById(`comment-section${postId}`);
        if(comment_sec.classList.contains('hidden')){
            comment_sec.classList.remove('hidden');
            axios.post('/show-comments',{postId: postId}).then((res)=>{
                commentsList[postId] = res.data.comments;
                setCommentsList({...commentsList});
            });
        }else{
            comment_sec.classList.add('hidden');
        }
    }

    const addComment = (e, postId)=>{
        e.preventDefault();
        if(!props.data[1]){
            navigate('/login');
        }else{
            axios.post('/add-comment', {
                'postId': postId,
                'username': props.data[1],
                'comment': comment
            });
            commentSection(postId);
        }
    }

    return (
    <div>
    {props.data[0] && props.data[0].map((item)=>{
        return (
        <div className="card" key={item.postId}>
            <div className="h-auto mx-auto p-4 text-gray-800 bg-white rounded-lg shadow">
                <div className="mb-2">
                    <div className="h-2 text-3xl text-left text-gray-600">“</div>
                    <p className="px-4 text-xl lg:text-2xl text-center text-gray-800">
                        {item.post}
                    </p>
                    <div className="h-2 text-3xl text-right text-gray-600">”</div>
                </div>
                <div className='text-[17px] text-center font-semibold mt-3 ml-4'>
                    - {item.fullName}
                </div>
                <div className='text-center text-sm my-3'>( {item.username} )</div>
            </div>
            <div className="flex justify-evenly mt-5">
                <div onClick={()=>addLike(item.postId)} id={item.postId} className='text-xl font-semibold hover:cursor-pointer hover:text-red-700 active:text-red-900'><FontAwesomeIcon icon={faThumbsUp} className="mr-2" /><span className='hidden sm:inline-block'>Likes ({item.likes})</span></div>
                <div onClick={()=>commentSection(item.postId)} className='text-xl font-semibold hover:cursor-pointer hover:text-red-700 active:text-red-900'><FontAwesomeIcon icon={faMessage} className="mr-2 text-lg" /><span className='hidden sm:inline-block'>Comments</span></div>
            </div>
            <div id={`comment-section${item.postId}`} className='mt-5 hidden'>
                <span className='text-xl font-semibold'>Add Comment</span>
                <form method='post' onSubmit={(e)=>addComment(e,item.postId)} className='flex flex-col lg:flex-row mt-5'>
                    <input type="text" onChange={(e)=>setComment(e.target.value)} name="comment" id="comment" placeholder='Write a comment...' className='comment' required />
                    <button type="submit" className='bg-red-700 text-white font-semibold px-5 py-1 sm:py-0 rounded-l-full mt-3 sm:mt-0 rounded-r-full hover:bg-black active:bg-red-800'>Add Comment</button>
                </form>
                <div className="mt-10">
                    {commentsList[item.postId] && commentsList[item.postId].map((c)=>{
                        return (
                        <div className="w-auto bg-slate-400 px-5 py-2 rounded-lg mt-5">
                            <div className='font-semibold text-lg'>{c.username}</div>
                            <p className='my-2'>{c.comment}</p>
                        </div>
                        )
                    })}
                </div>
            </div>
        </div>
        )
    })}
    </div>
    );
}

export default Card;