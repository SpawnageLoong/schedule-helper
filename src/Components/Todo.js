import React, { useState } from "react";
import './../styles.css'

function Todo(props) {
  // Our tasks and setTasks is now passed down from App
  const { tasks1, setTasks1 } = props;

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
      ...tasks1,
      {
        description: description,
        isComplete: false
      }
    ];
    setTasks1(newTasks);
    console.log(newTasks);
  }

  return (
    <>

      <div>
        <h2>Task Lists</h2>
        <p>Move the mouse over the button to open the dropdown menu.</p>

        <div class="dropdown">
            <button class="dropbtn">Dropdown</button>
            <div class="dropdown-content">
                <a href="#">List 1</a>
                <a href="#">List 2</a>
                <a href="#">List 3</a>
            </div>
        </div>
      </div>
      
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
        {tasks1.length > 0 ? (
          <TaskList tasks1={tasks1} setTasks1={setTasks1} />
        ) : (
          <p>No tasks yet! Add one above!</p>
        )}
      </div>
    </>
  );
}

function TaskList(props) {
  const { tasks1, setTasks1 } = props;

  function handleTaskCompletionToggled(toToggleTask, toToggleTaskIndex) {
    const newTasks = [
      // Once again, this is the spread operator
      ...tasks1.slice(0, toToggleTaskIndex),
      {
        description: toToggleTask.description,
        isComplete: !toToggleTask.isComplete
      },
      ...tasks1.slice(toToggleTaskIndex + 1)
    ];
    // We set new tasks in such a complex way so that we maintain immutability
    // Read this article to find out more:
    // https://blog.logrocket.com/immutability-in-react-ebe55253a1cc/

    setTasks1(newTasks);
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
        {tasks1.map((task, index) => (
          // We should specify key here to help react identify
          // what has updated
          // https://reactjs.org/docs/lists-and-keys.html#keys
          <tr key={index}>
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

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function listSelect() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Close the dropdown if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }

export default Todo;