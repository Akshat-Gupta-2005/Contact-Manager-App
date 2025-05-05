//@desc GET all contacts
//@route GET /api/contacts
//@access Public

const getContacts = (req, res) => {
  res.status(200).json({ message: 'Get All Contacts!' });
}

//@desc Create new contacts
//@route POST /api/contacts
//@access Public

const createContacts = (req, res) => {
  res.status(201).json({ message: 'Create Contact!' });
}

//@desc get a contact
//@route GET /api/contacts/:id
//@access Public

const getContact = (req, res) => {
  res.status(200).json({ message: `Get Contact for ${req.params.id}!` });
}

//@desc update a contact
//@route UPDATE /api/contacts/:id
//@access Public

const updateContact = (req, res) => {
  res.status(200).json({ message: `Update Contact for ${req.params.id}!` });
}

//@desc delete a contact
//@route DELETE /api/contacts/:id
//@access Public

const deleteContact = (req, res) => {
  res.status(200).json({ message: `Delete Contact for ${req.params.id}!` });
}

module.exports = {
  getContacts,
  createContacts,
  getContact,
  updateContact,
  deleteContact
}