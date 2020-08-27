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

    render(){
    return (
            
            <div style={this.styleAplication()}>
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


