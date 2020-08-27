import * as act from './actions'

const DATA = {
comments: [],
favorites: [],
token: '',
authorized: false,
page: 1,
error: ''
}

const reducer = (state = DATA, action) => {
switch(action.type){
case act.fetchCommentsRequest().type:
    return state
case act.fetchCommentsSuccess().type:
    return {...state, comments: action.payload.users}
case act.fetchCommentsFailure().type:
    return {...state, error: action.payload.data}
case act.addFavoriteComment().type: 
    return {...state, favorites: [...state.favorites, action.payload.data]}
case act.INorOUT().type: 
    return {...state, authorized : action.payload.data}
case act.nextPage().type: 
    return {...state, page: state.page + action.payload.pageNumber}
case act.prevPage().type: 
    return {...state, page: state.page - action.payload.pageNumber}
case act.favortiteSuccess().type: 
return {...state, favorites : action.payload.data}
case act.favoriteFailed().type:
    return {...state, error: action.payload.data}
default:
    return state 
}

}

export default reducer