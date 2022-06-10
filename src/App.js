import './index.css'
import './styles.css'
import { useState, useEffect } from 'react'
import { supabase } from './Components/supabaseClient'
import Auth from './Components/Auth'
import Account from './Components/Account'
import Render from './Components/Render'
import Todo from './Components/Todo'

function App() {
  const [session, setSession] = useState(null)
  const [tasks1, setTasks1State] = useState([])
  const [tasks2, setTasks2State] = useState([])
  const [tasks3, setTasks3State] = useState([])

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  function setTasks1(newTasks) {
    setTasks1State(newTasks);
    // localStorage can only store strings, so for us to store objects
    // we must first stringify the object into a JSON string
    window.localStorage.setItem("tasks1", JSON.stringify(newTasks));
  }

  function setTasks2(newTasks) {
    setTasks2State(newTasks);
    // localStorage can only store strings, so for us to store objects
    // we must first stringify the object into a JSON string
    window.localStorage.setItem("tasks2", JSON.stringify(newTasks));
  }

  function setTasks3(newTasks) {
    setTasks3State(newTasks);
    // localStorage can only store strings, so for us to store objects
    // we must first stringify the object into a JSON string
    window.localStorage.setItem("tasks3", JSON.stringify(newTasks));
  }

  useEffect(() => {
    // localStorage can only store strings, so we store our array of tasks
    // as a JSON string, and decode the JSON string into an array when we read it
    const savedTasks1 = JSON.parse(window.localStorage.getItem("tasks1"));
    const savedTasks2 = JSON.parse(window.localStorage.getItem("tasks2"));
    const savedTasks3 = JSON.parse(window.localStorage.getItem("tasks3"));
    setTasks1State(savedTasks1 ?? []);
    setTasks2State(savedTasks2 ?? []);
    setTasks3State(savedTasks3 ?? []);
  }, []);

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {/* {!session ? <Auth /> : <Render />}
      This line has been replaced due to inactive supabase project.
      Reuse when reactivating Supabase project.*/}
      {<Todo tasks1={tasks1} tasks2={tasks2} tasks3={tasks3} setTasks1={setTasks1} setTasks2={setTasks2} setTasks3={setTasks3} />}
    </div>
  )
}

export default App;
