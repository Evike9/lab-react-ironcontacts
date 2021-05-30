import React from "react";
import "./App.css";
import contactsJSON from "./contacts.json";

// iteration #1:  Display 5 Contacts

class App extends React.Component {
  state = {
    fiveContacts: contactsJSON.slice(0, 5),
  };

  displayContacts() {
    return this.state.fiveContacts.map((eachContact, index) => {
      return (
        <tr key={index}>
          <td>
            <img
              className="img"
              src={eachContact.pictureUrl}
              alt={eachContact.name + " photo"}
            />
          </td>
          <td>{eachContact.name}</td>
          <td>{eachContact.popularity.toFixed(2)}</td>
          <td>
            <button className="btn" onClick={() => this.deleteContact(index)}>
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  // iteration #2:  Add New Random Contacts
  newRandomContacts() {
    const max = contactsJSON.length;
    const min = 5;
    let randomIndex = Math.floor(Math.random() * (max - min) + min);
    let randomContact = contactsJSON[randomIndex];

    this.setState({
      fiveContacts: [...this.state.fiveContacts, randomContact],
    });
  }

  // iteration #3: Sort Contacts By Name And Popularity
  sortContacts(field) {
    let compareFunction;
    if (field === "name") {
      compareFunction = (a, b) => (a.name > b.name ? 1 : -1);
    } else if (field === "popularity") {
      compareFunction = (a, b) => b.popularity - a.popularity;
    }

    this.setState({
      fiveContacts: this.state.fiveContacts.slice().sort(compareFunction),
    });
  }

  // iteration #4: Remove Contacts

  removeContacts(contactToRemove) {
    let contactsCopy = [...this.state.fiveContacts];
    contactsCopy.splice(contactToRemove, 1);

    this.setState({
      fiveContacts: contactsCopy,
    });
  }

  render() {
    return (
      <div className="contacts-container">
        <h1>Iron Contacts</h1>
        <button className="btn-New" onClick={() => this.newRandomContacts()}>
          {" "}
          Add Random Contact
        </button>

        <button
          className="btn-byName"
          onClick={() => this.sortContacts("name")}
        >
          {" "}
          Sort by name
        </button>

        <button
          className="btn-popularity"
          onClick={() => this.sortContacts("popularity")}
        >
          {" "}
          Sort by popularity
        </button>

        <table className="table">
          <thead>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.displayContacts()}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
