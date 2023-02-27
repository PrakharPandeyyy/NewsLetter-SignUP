const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp=require("@mailchimp/mailchimp_marketing ");

const app = express();

app.use(express.static("public"));
app.use(bodyparser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});
mailchimp.setConfig({

     apiKey: "bcf1b3b85b8fa11af39e16db23d345bc-us21",

     server: "us21"
    });
app.post("/", function (req, res) {

    const firstName = req.body.firstName;
    const secondName = req.body.secondName;
    const email = req.body.email;

    const listId = "85ada85499";
    const subscribingUser = {
        firstName: firstName,
        lastName: secondName,
        email: email
    };

    async function run() {
        const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
                FNAME: subscribingUser.firstName,
                LNAME: subscribingUser.lastName
            }
        });

        res.sendFile(__dirname + "/success.html")
        console.log(
            `Successfully added contact as an audience member. The contact's id is ${response.id
            }.`
        );
    }

    run().catch(e => res.sendFile(__dirname + "/failure.html"));
});
app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port:3000");
});


//api key bcf1b3b85b8fa11af39e16db23d345bc-us21
//list id 85ada85499