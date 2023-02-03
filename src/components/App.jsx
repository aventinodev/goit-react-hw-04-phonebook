import React from 'react';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { useLocalStorage } from 'hooks/useLocalStorage';

import FormContact from 'components/FormContact/FormContact';
import Contacts from 'components/Contacts/Contacts';
import Filter from 'components/Filter/Filter';
import { Wrapper, Title } from './App.styled';

const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);

  const [filter, setFilter] = useState('');

  const formSubmit = data => {
    const normalizedName = data.name.toLowerCase();

    const checkName = contacts.find(
      contact => contact.name.toLowerCase() === normalizedName
    );

    if (checkName) {
      return alert(` ${data.name} is alredy in contacts`);
    }
    const checkNumber = contacts.find(
      contact => contact.number === data.number
    );
    if (checkNumber) {
      return alert(`${data.number} is already  in contacts`);
    }

    const id = nanoid();
    const contact = { id, ...data };

    setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const deleteContacts = contactId => {
    setContacts(prevContacts => {
      return prevContacts.filter(contact => contact.id !== contactId);
    });
  };

  const handleFilter = e => setFilter(e.currentTarget.value);

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return filteredContacts;
  };

  return (
    <div>
      <Wrapper>
        <Title>Phonebook</Title>
        <FormContact onSubmit={formSubmit} />

        <Title>Contacts</Title>
        <Filter filter={filter} onChange={handleFilter} />
        <Contacts contacts={getFilteredContacts()} onChange={deleteContacts} />
      </Wrapper>
    </div>
  );
};

export default App;
