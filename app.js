const express=require("express");
const bodyParser = require("body-parser");
const request=require("request");
const client = require("@mailchimp/mailchimp_marketing");
const app=express();

client.setConfig({apiKey: "c6ab2d3f735cfee409399f8276a8d017-us21",  server: "us21",});

app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(process.env.PORT || 3000, function(){
  console.log("Server running at port 3000");
});

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res){
  var firstName = req.body.fname;
  var lastName = req.body.lname;
  var email = req.body.email;
  listId ="003f691dda";

  const subscribingUser = {
    firstName: firstName,
    lastName: lastName,
    email: email}

  async function run() {
  const response = await client.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName
      }
    });
    //If all goes well logging the contact's id
     res.sendFile(__dirname + "/success.html")
     console.log(
    `Successfully added contact as an audience member. The contact's id is ${
     response.id
     }.`
    );
    }

  //   fetch ("https://api.monday.com/v2", {
  // method: 'post',
  // headers: {
  //   'Content-Type': 'application/json',
  //   'Authorization' : 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3OTcyNzE0OCwidWlkIjozMDM3MDczOCwiaWFkIjoiMjAyMi0wOS0wN1QyMDozMzowNS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTIxMTI5OTQsInJnbiI6InVzZTEifQ.kUmLRGRbFxqYmKrTLeCCDAYSkW78P0E6chgGZQ0gKqY'
  //  },
  //  body: JSON.stringify({
  //    'query' : '{ boards {id name} }'
  //  })
  //  console.log(query);
  // });

    //Running the function and catching the errors (if any)
    // ************************THIS IS THE CODE THAT NEEDS TO BE ADDED FOR THE NEXT LECTURE*************************
    // So the catch statement is executed when there is an error so if anything goes wrong the code in the catch code is executed. In the catch block we're sending back the failure page. This means if anything goes wrong send the faliure page
     run().catch(e => res.sendFile(__dirname + "/failure.html"));
    });

// mondayAPIKEY
// eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjE3OTcyNzE0OCwidWlkIjozMDM3MDczOCwiaWFkIjoiMjAyMi0wOS0wN1QyMDozMzowNS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTIxMTI5OTQsInJnbiI6InVzZTEifQ.kUmLRGRbFxqYmKrTLeCCDAYSkW78P0E6chgGZQ0gKqY


// c6ab2d3f735cfee409399f8276a8d017-us21
