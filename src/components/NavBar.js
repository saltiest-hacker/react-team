import React from 'react'
import {Menu} from 'semantic-ui-react'
import {useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'


export const NavBar = () => {
const authorized = useSelector(state=> state.authorized)
const auth = authorized ? 'LogOut' : ''

const history = useHistory()
const handleItemClick = (e) => {
history.push(`/${e.target.id}`)
}
const handleLogOut = (e) => {
localStorage.clear()
history.push('/')
window.location.reload(false)
}
    return (
        <div>
        <Menu>
          <Menu.Item
            name='home'
            id ="home"
            onClick={(e)=>handleItemClick(e)}
          />
          <Menu.Item
            name='favorites'
            id = 'favorites'
            onClick={(e)=>handleItemClick(e)}
          />
          <Menu.Menu position='right'>
            <Menu.Item
              name= {auth}
              onClick={(e)=>handleLogOut(e)}
            />
          </Menu.Menu>
        </Menu>
        </div>
    )
}
