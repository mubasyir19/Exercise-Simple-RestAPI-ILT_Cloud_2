const express = require("express");
const contacts = require("./contacts");

const app = express();
const port = 3000;

app.use(express.json());

app.get("/contacts", (req, res) => {
  //   res.send(
  //     JSON.stringify({
  //       message: "Succes post data",
  //       data: contacts,
  //     })
  //   );
  try {
    res.json(contacts);
  } catch (error) {
    console.log("Error Occured");
  }
});

// let myArray = [];

app.post("/contacts", (req, res) => {
  const { name, email, phone } = req.body;
  const id = contacts[contacts.length - 1].id + 1;
  contacts.push({
    id,
    name,
    email,
    phone,
  });
  res.json({
    message: "Succes post data",
    // data: contacts,
  });
});

app.delete("/contacts/:id", (req, res) => {
  try {
    const { id } = req.params;
    const index = contacts.findIndex((contact) => contact.id === Number(id));

    if (index === -1) {
      const response = h.response({ message: "Contact not found" });
      response.code(404);
      res.json(response);
    }

    contacts.splice(index, 1);

    res.json({
      message: "Contact deleted successfully",
    });
  } catch (error) {
    req.json({
      message: "Failed to delete contacts",
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
