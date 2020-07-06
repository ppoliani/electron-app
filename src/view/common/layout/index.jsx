import React from 'react';

const Layout = props => {
  return (
    <div>
      <header>Header</header>
      <main>
        <section>
          {props.children}
        </section>
      </main>
      <footer>Footer</footer>
    </div>
  )
}

export default Layout
