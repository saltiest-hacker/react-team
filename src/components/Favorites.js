import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {getFavorites} from '../state/actions'
import axios from 'axios'

const Favorites = ({favorites, getFavorites}) => {
 
    useEffect(()=>{
        getFavorites()
    },[])

    const onRemove = (e) => {
        e.preventDefault()
        const deleted = favorites.find(comment => comment.id === Number(e.target.id) )
        axios.delete(`https://saltiest-server.herokuapp.com/api/comments/${deleted.id}`,
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }
        )
        .then(res=> {console.log(res)
             getFavorites()})
        .catch(err=> console.log(err))
    }
    return (
        <div>
        {favorites.map(comment => {
            return <div key={comment.id}>
            <i id={comment.id} onClick={(e) => onRemove(e)} className="remove icon"></i>{comment.username}
            </div>
        })}
        </div>
    )
}
const MapStateToProps = state => ({favorites: state.favorites})
const mapDispatchToProps = (dispatch) => ({getFavorites: ()=>dispatch(getFavorites())})
export default connect(MapStateToProps, mapDispatchToProps)(Favorites)