import React, { useState } from 'react';
import './App.css';

function App() {
  // 1. STATE MANAGEMENT (Variables that React watches for changes)
  const [students, setStudents] = useState([]); // Array to store all added student cards
  const [name, setName] = useState('');         // Tracks what is typed in the Name input
  const [email, setEmail] = useState('');       // Tracks what is typed in the Email input

  // 2. FORM SUBMISSION HANDLER
  const handleSubmit = (e) => {
    e.preventDefault(); // Interview tip: Stops the browser from refreshing the page!
    
    if (!name.trim() || !email.trim()) return; // Validation check

    // Create a new single student object
    const newStudent = {
      id: Date.now(), // Uses current timestamp as a unique ID for React loops
      name: name,
      email: email,
    };

    // Update state immutably using the ES6 spread operator [...]
    setStudents([...students, newStudent]); 
    
    // Clear out the input fields after adding
    setName(''); 
    setEmail(''); 
  };

  // 3. DELETE HANDLER
  const handleDelete = (id) => {
    // Keeps every student EXCEPT the one with the matching ID
    const filteredStudents = students.filter((student) => student.id !== id);
    setStudents(filteredStudents);
  };

  return (
    <div className="app-container">
      {/* REQUIREMENT 1: RESPONSIVE NAVBAR */}
      <nav className="navbar">
        <div className="navbar-logo">StudentPortal</div>
        <ul className="navbar-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#dashboard">Dashboard</a></li>
        </ul>
      </nav>

      <main className="main-content">
        {/* REQUIREMENT 2: STUDENT FORM */}
        <section className="form-section">
          <h2>Register Student</h2>
          <form onSubmit={handleSubmit} className="student-form">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={name} // State Binding
                onChange={(e) => setName(e.target.value)} // Updates state on keystroke
                placeholder="Enter full name"
                required
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email} // State Binding
                onChange={(e) => setEmail(e.target.value)} // Updates state on keystroke
                placeholder="Enter email address"
                required
              />
            </div>
            <button type="submit" className="submit-btn">Add Student</button>
          </form>
        </section>

        {/* REQUIREMENT 3 & 4: DISPLAY DYNAMIC CARDS WITH DELETE BUTTON */}
        <section className="cards-section">
          <h2>Registered Students</h2>
          {students.length === 0 ? (
            <p className="no-data">No students registered yet.</p>
          ) : (
            <div className="card-grid">
              {students.map((student) => (
                <div key={student.id} className="student-card">
                  <div>
                    <h3>{student.name}</h3>
                    <p>{student.email}</p>
                  </div>
                  {/* Delete button triggers state change on click */}
                  <button 
                    onClick={() => handleDelete(student.id)} 
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;