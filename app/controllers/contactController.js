//@desc GET all contacts
//@route GET /api/contacts
//@access Public

const getContacts = async (req, res) => {
  res.status(200).json({ message: 'Get All Contacts!' });
}

//@desc Create new contacts
//@route POST /api/contacts
//@access Public

const createContacts = async (req, res) => {
  console.log("The request body: ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    // return res.status(400).json({ message: 'All fields are required!' });
    res.status(400); 
    throw new Error('All fields are required!');
  }
  res.status(201).json({ "Name": name, "Email": email, "Phone": phone }); 
  // res.status(201).json({ message: 'Create Contact!' });
}

//@desc get a contact
//@route GET /api/contacts/:id
//@access Public

const getContact = async (req, res) => {
  res.status(200).json({ message: `Get Contact for ${req.params.id}!` });

}

//@desc update a contact
//@route UPDATE /api/contacts/:id
//@access Public

const updateContact = async (req, res) => {
  res.status(200).json({ message: `Update Contact for ${req.params.id}!` });
}

//@desc delete a contact
//@route DELETE /api/contacts/:id
//@access Public

const deleteContact = async (req, res) => {
  res.status(200).json({ message: `Delete Contact for ${req.params.id}!` });
}

module.exports = {
  getContacts,
  createContacts,
  getContact,
  updateContact,
  deleteContact
}