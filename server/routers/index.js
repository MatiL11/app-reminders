import {
  getReminderByID,
  getUserByEmail,
  createReminder,
  deleteReminder,
  reminderCompleted,
} from "../database.js";

const router = (app) => {
  //Obtener recordatorios por id
  app.get("/reminder/:id", async (req, res) => {
    const reminder = await getReminderByID(req.params.id);
    res.status(200).send(reminder);
  });

  //Crear recordatorio
  app.post("/reminder", async (req, res) => {
    const { user_id, title } = req.body;
    const reminder = await createReminder(user_id, title);
    res.status(201).send(reminder);
  });

  //Recordatorio completado
  app.put("/reminder/:id", async (req, res) => {
    const { value } = req.body;
    const reminder = await reminderCompleted(req.params.id, value);
    res.status(200).send(reminder);
  });

  //Eliminar recordatorio
  app.delete("/reminder/:id", async (req, res) => {
    await deleteReminder(req.params.id);
    res.status(204).send({ message: "Reminder deleted" });
  });

  //Obtener usuario por email
  app.get("/user/:email", async (req, res) => {
    const user = await getUserByEmail(req.params.email);
    res.status(200).send(user);
  });

  //Error 404
  app.use((req, res) => {
    res.status(404).send({ error: "Not found" });
  });

  //Error 500
  app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).send({ error: "Something went wrong" });
  });
};

export default router;
