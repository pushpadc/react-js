import React, { useState } from 'react';
import './App.css';

function App() {
  // State to store the list of students
  const [students, setStudents] = useState([]);
  
  // State for form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation: Ensure fields aren't empty
    if (!name.trim() || !email.trim()) return;

    // Create a new student object with a unique ID
    const newStudent = {
      id: Date.now(),
      name: name,
      email: email,
    };

    // Update state with the new student and clear inputs
    setStudents([...students, newStudent]);
    setName('');
    setEmail('');
  };

  // Handle deleting a student card
  const handleDelete = (id) => {
    const updatedStudents = students.filter((student) => student.id !== id);
    setStudents(updatedStudents);
  };

  return (
    <div className="app-container">
      {/* 1. Responsive Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">StudentPortal</div>
        <ul className="navbar-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#students">Students</a></li>
        </ul>
      </nav>

      <main className="main-content">
        {/* 2. Student Form */}
        <section className="form-section">
          <h2>Register Student</h2>
          <form onSubmit={handleSubmit} className="student-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter student name"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter student email"
                required
              />
            </div>
            <button type="submit" className="submit-btn">Add Student</button>
          </form>
        </section>

        {/* 3. Student Cards Display */}
        <section className="cards-section">
          <h2>Student Directory</h2>
          {students.length === 0 ? (
            <p className="no-data">No students registered yet.</p>
          ) : (
            <div className="card-grid">
              {students.map((student) => (
                <div key={student.id} className="student-card">
                  <h3>{student.name}</h3>
                  <p>{student.email}</p>
                  {/* 4. Delete Button */}
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