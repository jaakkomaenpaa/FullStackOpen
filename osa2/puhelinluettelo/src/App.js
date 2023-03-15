import { useState, useEffect } from "react";
import service from "./services/Phonebook";

const Person = ({ name, number, del }) => (
  <div>
    {name} {number} {del}
  </div>
);

const Persons = ({ persons, filter, remove }) => {
  return persons
    .filter((person) =>
      person.name.toUpperCase().includes(filter.toUpperCase())
    )
    .map((person) => {
      return (
        <Person
          key={person.name}
          name={person.name}
          number={person.number}
          del={
            <button
              key={person.id}
              onClick={() => remove(person.id, person.name)}
            >
              delete
            </button>
          }
        />
      );
    });
};

const Filter = ({ filter }) => (
  <div>
    filter shown with <input onChange={filter} />
  </div>
);

const Form = ({ submit, changeName, changeNumber }) => {
  return (
    <form onSubmit={submit}>
      <div>
        name: <input onChange={changeName} />
      </div>
      <div>
        number: <input onChange={changeNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="notification">{message}</div>;
};

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="error">{message}</div>;
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    service.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const updatePerson = (newPerson) => {
    const newPersonId = persons.find(
      (person) => person.name === newPerson.name
    ).id;
    service
      .update(newPersonId, newPerson)
      .then((response) => {
        console.log(response);
        setPersons(
          persons.map((person) =>
            person.id === response.id ? response : person
          )
        );
        showNotification(`Updated ${newPerson.name}'s number`);
      })
      .catch((error) => {
        console.log(error);
        setPersons(persons.filter((person) => person !== newPerson));
        showError(
          `Information of ${newPerson.name} has already 
          been removed from server`
        );
      });
  };

  const addPerson = (newPerson) => {
    setPersons([...persons, newPerson]);
    service
      .create(newPerson)
      .then((response) => {
        console.log("response:", response);
        setPersons([...persons, response]);
        showNotification(`Added ${newPerson.name}`);
      })
      .catch((error) => {
        console.log("error:", error);
        showNotification("Failed to add person to phonebook");
        setPersons(persons.filter((person) => person !== newPerson));
        console.log("arrayaftererror?", Array.isArray(persons));
      });
  };

  const submitForm = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (persons.some((person) => person.name === newName)) {
      console.log("name already exists");
      if (
        window.confirm(`${newName} is already added to phonebook, 
      replace the old number with a new one?`)
      ) {
        updatePerson(newPerson);
      }
    } else {
      addPerson(newPerson);
    }
  };

  const removePerson = (id, name) => {
    console.log(id);
    if (window.confirm(`Delete ${name}?`)) {
      service
        .remove(id)
        .then((response) => {
          console.log(response);
          setPersons(persons.filter((person) => person.id !== id));
          showNotification(`Removed ${name}`);
        })
        .catch((error) => {
          console.log(error)
          showError(
            `Information of ${name} has already 
            been removed from server`
          );
        });
    }
  };

  const changeNewName = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const changeNewNumber = (event) => {
    event.preventDefault();
    setNewNumber(event.target.value);
  };

  const setFilter = (event) => {
    event.preventDefault();
    setNewFilter(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <ErrorMessage message={error} />
      <Filter filter={setFilter} />
      <h3>add a new</h3>
      <Form
        submit={submitForm}
        changeName={changeNewName}
        changeNumber={changeNewNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={newFilter} remove={removePerson} />
    </div>
  );
};

export default App;
