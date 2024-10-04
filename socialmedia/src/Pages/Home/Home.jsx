import React from 'react'
import { Topbar } from '../../Components/Topbar/Topbar'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Feed from '../../Components/feed/Feed'
import Rightbar from '../../Components/Rightbar/Rightbar'
import "./Home.css"

export function Home(props) {
    

    return (
        <>
            <Topbar/>
            <div className="homecontainer">
            <Sidebar/>
            <Feed/>
            <Rightbar/>
            </div>
           
        </>
    )
}
