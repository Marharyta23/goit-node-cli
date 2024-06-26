import { program } from "commander";
import Contact from "./contacts.js";
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await Contact.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await Contact.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const addedContact = await Contact.addContact(name, email, phone);
      console.log(addedContact);
      break;

    case "remove":
      const removedContact = await Contact.removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
