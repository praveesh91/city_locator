import React from 'react'
import { Link } from 'react-router-dom'
import './Home.scss'

function Home() {
    return (
        <div className="site-wrapper">

        <div className="site-wrapper-inner">
  
          <div className="container">
  
            <div className="inner cover">
              <h1 className="cover-heading">Statewise City Location Lister</h1>
              <p className="lead">Interface to view the cities on google map on selecting the state</p>
              <p className="lead">
                <Link to="/users" class="btn btn-lg btn-default">See all cities</Link>
              </p>
            </div>
  
          </div>
  
        </div>
  
      </div>
    )
}

export default Home
