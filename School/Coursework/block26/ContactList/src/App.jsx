import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [contacts, setContact] = useState([])
  const [hash, setHash] = useState(window.location.hash.slice(1)*1)

  useEffect(() => {
    const fetchConts = async () => {
      const response = await fetch(`https://fsa-jsonplaceholder-69b5c48f1259.herokuapp.com/users`)
      const data = await response.json()

      setContact(data)
    }
    fetchConts()
  }, [])

  useEffect(() => {
    window.addEventListener("hashchange", () => {
      setHash(window.location.hash.slice(1)*1)
    })
  }, [])

  const contact = contacts.find((contact) => {
    return hash === contact.id 
  })
  console.log(contact)

  return (
  
    <div>
      <h1>Contact List ({contacts.length})</h1>
      <ul>
        {contacts.map((contact) => (
              <li key={contact.id} className={hash === contact.id ? "selected" : ""}>
                <a href={`#${contact.id === hash ? "" : contact.id}`}>{contact.name}</a>
              </li>
            ))}
      </ul>
    
    
      {contact ? (
        <div>
          <h2>Contact Details:</h2>
          <p>Name: {contact.name}</p>
          <p>Email: {contact.email}</p>
          <p>Phone: {contact.phone}</p>
        </div>
      ) : (
        <p>No contact found for the provided ID.</p>
      )}
    </div>
  
);

}

export default App
