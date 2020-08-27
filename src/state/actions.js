import axios from 'axios';

export const fetchCommentsRequest = () =>{
    return {
        type: 'FETCHTHEGODDAMMDATA'
    }
}

export const fetchCommentsSuccess = (users) => {
    return {
        type: 'WEFUCKINGOTIT',
        payload: {
            users: users
        }
    }
}

export const fetchCommentsFailure = (error) =>{
return{
    type: 'DKL;DASFNERLKFEWNLK',
    payload: {
        error: error
    }
}
}


export const addFavoriteComment = (data) => {
return { 
    type: 'ADD A FAVORITE',
    payload: {
        data 
    }
}
}

export const INorOUT = (data) => {
    return {
        type : 'hfaefkmda', 
        payload: {
            data
        }
    }
}


export const nextPage = () => {
return {
    type: 'ADDONE',
    payload: {
        pageNumber: 1
    }
}
}


export const prevPage = () => {
return {
    type: 'Substract-One',
    payload: {
        pageNumber: 1
    }
}
}



export const fetchComments = (page = 1) =>{
    const pageNumber = page
     return (dispatch) =>{
         dispatch(fetchCommentsRequest)
     axios.get(`https://saltiest-hacker-api.herokuapp.com/salty/${pageNumber}`)
     .then(res =>{
         const users = res.data
         dispatch(fetchCommentsSuccess(users))
     })
     .catch(err=>{
     const errorMsg = err.message
     dispatch(fetchCommentsFailure(errorMsg))
     })
     }
}


export const favortiteSuccess = (data) => ({type: 'data recieved', payload: {data}})
export const favoriteFailed = (data) => ({type: 'data failed', paylaod: {data}})

export const getFavorites = () => {
return (dispatch) => {
  axios.get(`https://saltiest-server.herokuapp.com/api/comments`, {
       headers : 
        {Authorization: localStorage.getItem("token")}
        })
         .then(res=>{
             console.log(res.data)
             dispatch(favortiteSuccess(res.data))
         })
         .catch(err=> {
             console.log(err)
            dispatch(favoriteFailed(err))
                 })
}
}


