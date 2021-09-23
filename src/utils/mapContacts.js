const mapContacts = (data) => {
  return {
    ...data,
    contacts: data.contacts.reduce((acc, { type, value }) => ({
      ...acc,
      [type.toLowerCase()]: value
    }), {})
  };
}

export default mapContacts;