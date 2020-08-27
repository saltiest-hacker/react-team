import React, {useState} from  'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {INorOUT} from '../state/actions'

export default () =>{
    const dispatch = useDispatch()
    const authorized = useSelector(state=> state.authorized)
    const {push} = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [signUsername, setSignUserName ] = useState('')
    const [signPassword, setSignPassword] = useState('')
    const [logAtemptSuccess, setLogAtemptSucess] = useState(true)

    const onClickLogin = (e) => {
        e.preventDefault()
        axios.post(`https://saltiest-server.herokuapp.com/api/login`, 
        {
            username: username,
            password : password
        },
        {
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(res => {
            localStorage.setItem('token' , res.data.token)
            dispatch(INorOUT(!authorized))
            push('/')
        })
        .catch(res=> {
            setLogAtemptSucess(!logAtemptSuccess)
        })
    }
    
    const onClickSignUp = (e)=> {
        e.preventDefault()
        axios.post('https://saltiest-server.herokuapp.com/api/register', 
        {username: signUsername, 
        password: signPassword },
        {
            headers: {
              "Content-Type": "application/json",
            },
          })
        .then(res=> {
            localStorage.setItem('token', res.data.token)
            push('/')
        })
        .catch(err=> console.log(err, 'error'))
    }

    return (
        <div className="ui placeholder segment">
        <div className="ui two column very relaxed stackable grid">
        <div className="column">
        <div className="ui form">
        <div className="field">
        <label htmlFor="username">Username: </label>
        <div className="ui left icon input">
        <input name="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
        <i className="user icon"></i>
        </div>
        </div>
        <div className="field">
        <label htmlFor="password">Password:</label>
        <div className="ui left icon input">
        <input type="password" name="password" value ={password} onChange={e=> setPassword(e.target.value)}/>
        <i className="lock icon"></i>
        </div>
        </div>
        <div onClick={(e)=>{onClickLogin(e)}} className="ui blue submit button">Login</div>
        </div>
        </div>
        <div className="middle aligned column">
        <div className="column">
        <div className="ui form">
        <div className="field">
        <label htmlFor="username">Username: </label>
        <div className="ui left icon input">
        <input name="username" value={signUsername} onChange= {e=> {setSignUserName(e.target.value)}}/>
        <i className="user icon"></i>
        </div>
        </div>
        <div className="field">
        <label htmlFor="password">Password:</label>
        <div className="ui left icon input">
        <input name="password" value ={signPassword} onChange={e=>{setSignPassword(e.target.value)}}/>
        <i className="lock icon"></i>
        </div>
        </div>
        <div onClick={(e)=>{onClickSignUp(e)}} className="ui red submit button">Sign Up</div>
        </div>
        </div>
        </div>
        </div>
        <div class="ui vertical divider">
        <h3>Or</h3>
         </div>
         <div id='verify' style={{marginBottom: '15%'}}>
            {logAtemptSuccess? '' : <p style={{paddingLeft:'17%', paddingTop: '1%', color: 'red'}}>Username or Password Incorect Please try Again</p>}
         </div>
        </div>

    )
}