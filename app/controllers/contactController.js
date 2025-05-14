const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//@desc GET all contacts
//@route GET /api/contacts
//@access Private

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json(contacts);
})

//@desc Create new contacts
//@route POST /api/contacts
//@access Private

const createContacts = asyncHandler(async (req, res) => {
  console.log("The request body: ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    // return res.status(400).json({ message: 'All fields are required!' });
    res.status(400); 
    throw new Error('All fields are required!');
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id
  })

  res.status(201).json(contact); 
  // res.status(201).json({ message: 'Create Contact!' });
})

//@desc get a contact
//@route GET /api/contacts/:id
//@access Private

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) { 
    res.status(404);
    throw new Error('Contact not found!');
  }
  res.status(200).json(contact);
})

//@desc update a contact
//@route UPDATE /api/contacts/:id
//@access Private

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) { 
    res.status(404);
    throw new Error('Contact not found!');
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized!');
  }

  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
  res.status(200).json(updatedContact);
})

//@desc delete a contact
//@route DELETE /api/contacts/:id
//@access Private

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) { 
    res.status(404);
    throw new Error('Contact not found!');
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized!');
  }
  
  await contact.deleteOne();

  res.status(200).json(contact);
})

module.exports = {
  getContacts,
  createContacts,
  getContact,
  updateContact,
  deleteContact
}