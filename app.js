const FingerprintJS = require("fingerprintjs2");
var Twig = require("twig"),
  express = require("express"),
  app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded({ extended: true }));
const axios = require("axios");
// const
const sha3_256 = require("js-sha3");
var Promise = require("promise");

async function generateUUID() {
  const fpPromise = FingerprintJS.load({ apiKey: "Y6kanN9pcYB0vP3ib4Yf" });
  fpPromise
    .then((fp) => fp.get())
    .then((result) => console.log(result.visitorId));
}

// This section is optional and used to configure twig.
app.set("twig options", {
  allowAsync: true, // Allow asynchronous compiling
  strict_variables: false,
});
app.set("view engine", "html");
app.engine("html", Twig.__express);

app.get("/", function (req, res) {
  res.render("login.html", {
  });
});

app.post("/login", async function (req, res) {
  const params = new URLSearchParams();
  params.append("device_uuid", "00000000000000000000000000000000");
  params.append("email", req.body.email);
  params.append("password", req.body.password);
  console.log(req.body);
  console.log(
    `https://internal-api5.infinitybit.io/v1/account/login?device_uuid=00000000000000000000000000000000&email=${encodeURIComponent(
      req.body.email
    )}&password=${encodeURIComponent(req.body.password)}`
  );
  axios
    .post(
      `https://internal-api5.infinitybit.io/v1/account/login?device_uuid=00000000000000000000000000000000&email=${encodeURIComponent(
        req.body.email
      )}&password=${encodeURIComponent(req.body.password)}`
      //   params
    )
    .then((response) => {
      result = response.data.result;
      let notify_message = "Login failed";
      let loggedIn = 0;
      if(result){
        notify_message = "Login success";
        loggedIn = 1;
      }
      res.render("login.html", {
        loggedin: loggedIn,
        notify: 1,
        notify_message: notify_message,
      });
    });
});

app.listen(9999);
