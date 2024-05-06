import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const contactsPath = path.resolve("db", "contacts.json");

async function readFile() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });

  return JSON.parse(data);
}

async function writeFile(contact) {
  await fs.writeFile(contactsPath, JSON.stringify(contact));
}

async function listContacts() {
  const data = await readFile();
  return data;
}

async function getContactById(contactId) {
  const contacts = await readFile();

  const contact = contacts.find((contact) => contact.id === contactId);

  if (typeof contact === "undefined") {
    return null;
  }

  return contact;
}

async function removeContact(contactId) {
  const contacts = await readFile();

  const idx = contacts.findIndex((contact) => contact.id === contactId);

  if (idx === -1) {
    return null;
  }

  const removedContact = contacts[idx];

  contacts.splice(idx, 1);

  await writeFile(contacts);

  return removedContact;
}

async function addContact(name, email, phone) {
  const contacts = await readFile();

  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);

  await writeFile(contacts);

  return newContact;
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
