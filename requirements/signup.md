# SignUp:

❌ validate fields required;
❌ compare password and confirmationPassword;
❌ validate valid email;
❌ validate if email is in use;
❌ generate encrypt password;
❌ add new User in DB;
❌ return 200 with accessToken and name;

Error return:

❌ 400 badRequest: invalid value in field or compare error;
❌ 403 forbidden: email in use;
❌ 404 notFound: route doesn't exists;
❌ 500 serverError: any error in DB or data layer;
