import React from 'react';
import {Link} from 'react-router-dom';

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
