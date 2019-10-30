const jsonServer = require("json-server");
const app = jsonServer.create();
const fakeDb = require("../data/fakeDb");
const router = jsonServer.router(fakeDb());
const bodyParser = require("body-parser");
const usersDb = require("../data/usersDb");

const { errorHandler } = require("../handlers/errorHandler");
const { checkToken, isAuthorized } = require("../handlers/authorize");
const { login, createUser } = require("../handlers/methods")(usersDb);
const { validateUserSchema } = require("../schema/validateSchema");

app.use(bodyParser.json());

app.post("/users", validateUserSchema, createUser);
app.post("/login", login);
app.use(checkToken, isAuthorized, router);
app.use(errorHandler);

app.use("*", (req, res) => {
  res.send("404 not found").end();
});

module.exports = app;
