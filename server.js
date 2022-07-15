const { db } = require("./utils/db.utils");
const { app } = require("./app");

const { modelsRelations } = require("./models/relations");

db.authenticate()
  .then(() => console.log("db done"))
  .catch(error => console.log(error));

//init relations
modelsRelations();

db.sync()
  .then(() => console.log("sync done"))
  .catch(error => console.log(error));

app.listen(2000, () => {
  console.log("express listen at 2000");
});
