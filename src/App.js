import './index.css'
import { useState, useEffect } from 'react'
import { supabase } from './Components/supabaseClient'
import Auth from './Components/Auth'
import Account from './Components/Account'
import Render from './Components/Render'
import Todo from './Components/Todo'

function App() {
  const [session, setSession] = useState(null)
  const [tasks, setTasksState] = useState([])

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  function setTasks(newTasks) {
    setTasksState(newTasks);
    // localStorage can only store strings, so for us to store objects
    // we must first stringify the object into a JSON string
    window.localStorage.setItem("tasks", JSON.stringify(newTasks));
  }

  useEffect(() => {
    // localStorage can only store strings, so we store our array of tasks
    // as a JSON string, and decode the JSON string into an array when we read it
    const savedTasks = JSON.parse(window.localStorage.getItem("tasks"));
    setTasksState(savedTasks ?? []);
  }, []);

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {/* {!session ? <Auth /> : <Render />}
      This line has been replaced due to inactive supabase project.
      Reuse when reactivating Supabase project.*/}
      {<Todo tasks={tasks} setTasks={setTasks} />}
    </div>
  )
}

export default App;
