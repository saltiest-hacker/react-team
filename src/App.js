import React from 'react'
import {connect} from 'react-redux'
import {fetchComments} from './state/actions'
import Comments from './components/Comments'
import {NavBar} from './components/NavBar'
import Private from './helpers/Private'
import Favorites from './components/Favorites'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AcountManger from './components/AcountManager'
import axios from 'axios'

class App extends React.Component {
    componentDidMount(){
        this.props.fetchComments(this.props.data.page)
    }
    
    styleAplication(){
        return {
            maxWidth:'90%',
            marginTop: '1%',
            marginLeft: '5%',
            backgroundColor: 'white',
            border: 'solid 1px grey',
            boxShadow: '-2px 2px 18px -6px #000000'
        }
    }

    example(e){
        e.preventDefault()
        axios.post('https://saltiest-server.herokuapp.com/api/comments', 
        {
            username: 'string',
            comment_toxicity: 45,
            comment: 'this is where the comment is',
            users_id: '1'
        }, 
        {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }
        )
        .then(res=>console.log(res))
        .catch(err=> console.log(err))
    }
    getme(e){
        e.preventDefault()
        axios.get(`https://saltiest-server.herokuapp.com/api/comments`, {
            headers : 
            {Authorization: localStorage.getItem("token")}
        })
        .then(res=>console.log(res.data))
        .catch(err=> console.log(err))
    }

    render(){
    return (
            
            <div style={this.styleAplication()}>
            <h1 onClick={this.example}>click me </h1>
            <h2 onClick={this.getme}>get me</h2>
             <Router>
            <NavBar />
             <Switch>
              <Private path="/favorites" component={Favorites} />
                <Route
                path='/acountmanger'
                render={(props) => (
                <AcountManger {...props}  />
                )}
                />
                <Private path='/' component={Comments} />
                </Switch>
            </Router>
            </div>
        )
        }
}

const MapStateToProps = state => ({data: state})
const mapDispatchToProps = dispatch =>({fetchComments : (page) => dispatch( fetchComments(page) )    })

export default connect(MapStateToProps, mapDispatchToProps)(App)


