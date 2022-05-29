import './index.css'
import { useState, useEffect } from 'react'
import { supabase } from './Components/supabaseClient'
import Auth from './Components/Auth'
//import Account from './Components/Account'
import Todo from './Components/Todo'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Auth /> : <Todo />}
    </div>
  )
}

export default App;
