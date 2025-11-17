#code improvement(now)
1)use custom global error midlleware/global error middleware.
2)API-
a)an endpoint show number of question in category and difficulty
3)add router.param for id
4)time for quiz -each question or whole quiz
5)dont send whole quiz once send question one by one
6)csv and pdf result in quiz result
7)pagianted quiz history
8)quiz status complete mark when click on result
9)validate id req.param

#Tech improvement(later)
1)use zod for data validation in backend
2)Login with google
3)signed cookies
4)email when login

app.js

1. No 404 handler
   Any unknown route returns HTML garbage instead of JSON.

Models
1)use ref whereeber required

user controller
1)Delete otp after creatinga account
2)create - Reactivate the old user instead of creating a new one
3)logot route - should i put check auth or not


profile route
1)sending all user data i should send selected fields
otp
in frontend check if input number field is number otstring .in backend i am accepting otp as number

avatar

1. not checking the file size
2. send default avatar




<!-- "$2b$12$92rkSkC4m3C6QeLjUqi8EeKbtuWfl.tdpBnPB626MkJtfD/T/RaE2" -->