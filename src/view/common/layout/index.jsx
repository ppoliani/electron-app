import React from 'react';

const Layout = props => {
  const {classes} = props;

  return (
    <div className={classes.root}>
      <header>Header</header>
      <main>
        <section>
          Main Body
        </section>
      </main>
      <footer>Footer</footer>
    </div>
  )
}

export default Layout
