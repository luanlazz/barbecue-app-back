# SignUp:

### Success

❌ post in route /api/signup;
❌ validate fields required (name, email, password and confirm password);
❌ compare if password and confirmationPassword is equal;
❌ validate if email is valid;
❌ validate if email is in use;
❌ generate hasher password;
❌ add new User in DB with hasher password;
❌ return 200 with account;

### Exceptions

❌ 400 badRequest: name, email, password and confirm password is not provide;
❌ 400 badRequest: password and confirm password is not equal;
❌ 400 badRequest: email is invalid;
❌ 403 forbidden: email in use;
❌ 404: notFound: route doesn't exists;
❌ 500 serverError: hasher error;
❌ 500 serverError: add account in DB;
❌ 500 serverError: generate access token;
❌ 500 serverError: update access token in DB;
