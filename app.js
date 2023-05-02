const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./Routes/userRoute");
const locationRoute = require("./Routes/location");
const resourceRoute = require("./Routes/resource");
const resourceTypeRoute = require("./Routes/resourceType");
const userBookingRoute = require("./Routes/userBookingRoute");
const errorHandler = require("./middleware/errorHandler");
// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI =
  "mongodb+srv://sajid:RY9zWqeMNSQwbfCH@cluster0.1owdxkf.mongodb.net/AuthLocation?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("db connected and server runnig at port 3000");
    app.listen(3000);
  })
  .catch((err) => console.log(err));

app.use(express.json()); // express.json() is a built in middleware function in Express starting from v4.16.0. It parses incoming JSON requests and puts the parsed data in req.body.
app.use("/uploads", express.static("upload"));

app.param("/location", function (req, res, next, id) {
  console.log("CALLED ONLY ONCE");
  next();
});

//   Routes.........
app.use(userRouter);
app.use("/location", locationRoute);
app.use("/resource_type", resourceTypeRoute);
app.use("/resource", resourceRoute);
app.use(userBookingRoute);
app.use(errorHandler);
