import { useEffect, useState } from "react"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./components/nav/NavBar"
import { getCurrentUser } from "./managers/UserManager"


export const Rare = () => {
  const [token, setTokenState] = useState(localStorage.getItem('auth_token'))
  const [currentUser, setCurrentUser] = useState({})

  const getAndSetCurrentUser = (userId) => {
    getCurrentUser(userId).then(user => setCurrentUser(user))
  }

  const setToken = (newToken) => {
    localStorage.setItem('auth_token', newToken)
    setTokenState(newToken)
  }
  

  return (<>
    <NavBar token={token} setToken={setToken} currentUser={currentUser} getAndSetCurrentUser={getAndSetCurrentUser} />
    <ApplicationViews token={token} setToken={setToken} currentUser={currentUser} getAndSetCurrentUser={getAndSetCurrentUser} />
  </>)
}
