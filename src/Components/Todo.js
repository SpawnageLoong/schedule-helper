import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Account from './Account'

const List = ({ session }) => {
    const [loading, setLoading] = useState(true)
    const [list, setList] = useState(null)
  
    useEffect(() => {
      getList()
    }, [session])
  
    const getList = async () => {
      try {
        setLoading(true)
        const user = supabase.auth.user()
  
        let { data, error, status } = await supabase
          .from('todo')
          .select(`list`)
          .eq('id', user.id)
          .single()
  
        if (error && status !== 406) {
          throw error
        }
  
        if (data) {
          setList(data.list)
        }
      } catch (error) {
        alert(error.message)
      } finally {
        setLoading(false)
      }
    }
  
    const updateList = async (e) => {
      e.preventDefault()
  
      try {
        setLoading(true)
        const user = supabase.auth.user()
  
        const updates = {
          id: user.id,
          list,
          updated: new Date(),
        }
  
        let { error } = await supabase.from('profiles').upsert(updates, {
          returning: 'minimal', // Don't return the value after inserting
        })
  
        if (error) {
          throw error
        }
      } catch (error) {
        alert(error.message)
      } finally {
        setLoading(false)
      }
    }
}

function Todo() {
    const [tasks, setTasks] = useState([]);
    const [newTaskText, setNewTaskText] = useState("");
  
    function handleAddTask(event) {
      // React honours default browser behavior and the
      // default behaviour for a form submission is to
      // submit AND refresh the page. So we override the
      // default behaviour here as we don't want to refresh
      event.preventDefault();
      addTask(newTaskText);
    }
  
    function addTask(description) {
      const newTasks = [
        // the ... operator is called the spread operator
        // what we are doing is creating a brand new array of
        // tasks, that is different from the previous array
        // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        ...tasks,
        {
          description: description,
          isComplete: false
        }
      ];
      setTasks(newTasks);
      console.log(newTasks);
    }
  
    return (
    <>
        <div>
          <h2>Add Tasks</h2>
          <form onSubmit={handleAddTask}>
            <label>
              Task:
              <input
                style={{ margin: "0 1rem" }}
                type="text"
                value={newTaskText}
                // how do you know it's event.target.value? it just is.
                // search it up on MDN, and view react code samples
                // See: https://reactjs.org/docs/forms.html
                onChange={(event) => setNewTaskText(event.target.value)}
              />
            </label>
            <input type="submit" value="Add" />
          </form>
        </div>
  
        <div>
          <h2>Task List</h2>
          {tasks.length > 0 ? (
          <TaskList tasks={tasks} />
        ) : (
          <p>No tasks! Go out and touch some grass!</p>
        )}
      </div>

      <div>
        <button type="button" className="button block" onClick={() => sendtoAccount()}>
        Profile Settings
      </button>

        <button type="button" className="button block" onClick={() => supabase.auth.signOut()}>
        Sign Out
      </button>
      </div>
    </>
  );
}

function sendtoAccount() {
    return (
        <Account />
    )
}

function TaskList(props) {
    const { tasks, setTasks } = props;

  function handleTaskCompletionToggled(toToggleTask, toToggleTaskIndex) {
    const newTasks = [
      // Once again, this is the spread operator
      ...tasks.slice(0, toToggleTaskIndex),
      {
        description: toToggleTask.description,
        isComplete: !toToggleTask.isComplete
      },
      ...tasks.slice(toToggleTaskIndex + 1)
    ];
    // We set new tasks in such a complex way so that we maintain immutability
    // Read this article to find out more:
    // https://blog.logrocket.com/immutability-in-react-ebe55253a1cc/

    setTasks(newTasks);
  }

    return (
      <table style={{ margin: "0 auto", width: "100%" }}>
        <thead>
          <tr>
            <th>No.</th>
            <th>Task</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            // We should specify key here to help react identify
            // what has updated
            // https://reactjs.org/docs/lists-and-keys.html#keys
            <tr key={task.description}>
              <td>{index + 1}</td>
              <td>{task.description}</td>
              <td>
                <input
                    type="checkbox"
                    checked={task.isComplete}
                    onChange={() => handleTaskCompletionToggled(task, index)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
export default Todo;