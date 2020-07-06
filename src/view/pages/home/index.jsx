import React from 'react';
import {Link} from 'react-router-dom';

const electron = window.require("electron")
console.log(electron.remote.dialog.showMessageBox({type: 'info', title: 'Welcome', message: 'welcom to electron'}))

const Home = props => {
  return (
    <div>
      <h1>Hello World!</h1>
      We are using node <script>document.write(process.versions.node)</script>,
      Chrome <script>document.write(process.versions.chrome)</script>,
      and Electron <script>document.write(process.versions.electron)</script>.

      <Link to='/about-us'>About Us</Link>
    </div>
  )
}

export default Home
