import React from 'react'
import "../assets/sass/style.scss";
function MainContent({children}) {
  return (
    <>
        <main className="main-container">
          {children}
      </main>
    </>
  )
}

export default MainContent