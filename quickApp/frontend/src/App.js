import React from 'react';
import AccountCreation from './AccountCreation';
import Login from './Login';
import PasswordRecovery from './PasswordRecovery';
import TaskCreation from './TaskCreation';
import TaskList from './TaskList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to the Task Manager</h1>
      </header>
      <main>
        <AccountCreation />
        <Login />
        <PasswordRecovery />
        <TaskCreation />
        <TaskList />
      </main>
      <footer>
        <p>© 2023 Task Manager. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
