import React from 'react'
import {useDispatch, connect} from 'react-redux'
import * as actions from '../state/actions'
import {fetchComments} from '../state/actions'
import axios from 'axios'
const Comments = ({state, page, fetchComments}) => {
    const dispatch = useDispatch()

    
    const nextPage = () => {
        dispatch(actions.nextPage())
        fetchComments(page)
    }

    const previousPage = () => {
        dispatch(actions.prevPage())
        fetchComments(page)
    }

 

    const clickHandler = (e) => {
        e.preventDefault()
        const allComments = state
        const favorite = allComments.find(comment => comment.id === Number(e.target.id))
        // dispatch(actions.addFavoriteComment(favorite))

        const {user_id, username, saltiness, comment_text} = favorite
        axios.post('https://saltiest-server.herokuapp.com/api/comments', 
          {
        username: username,
        comment_toxicity: saltiness,
        comment: comment_text,
        users_id: String(user_id)
    }, 
            {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            }
            )
            .then(res=>console.log(res.data))
            .catch(err=> console.log(err))

   }

    return (
       <>
        {state.map(comment => {
            return (
            <div key={comment.id} className="ui relaxed divided list">
            <div className="ui comments">
            <div className="comment">
            <div className="list">
            <div className="content">
            <h3>{comment.story_title}</h3>
            <h4>{comment.username}</h4>
            <p>saltiness: {comment.saltiness}</p>
             <p>Comment :{comment.comment_text}</p>
            <div className="actions">
                <a id={comment.id} onClick={(e)=>clickHandler(e)}>Add to Favorites</a>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
           )

        })}
        <h1 onClick={(e)=> nextPage(e)}>Next</h1>
        <h1 onClick={(e)=> previousPage(e)}>Previous</h1>
        </>
    )
}


const MapStateToProps = state => (
    {state: state.comments,
    page: state.page})

const mapDispatchToProps = dispatch =>({fetchComments : (page) => dispatch( fetchComments(page) )    })

export default connect(MapStateToProps, mapDispatchToProps)(Comments)
