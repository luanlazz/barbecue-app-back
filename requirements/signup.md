# SignUp:

### Success

1. ✅ post in route /api/signup;
2. ✅ validate fields required (name, email, password and confirm password);
3. ✅ compare if password and confirmationPassword is equal;
4. ✅ validate if email is valid;
5. ✅ validate if email is in use;
6. ✅ generate hasher password;
7. ✅ add new User in DB with hasher password;
8. ✅ return 200 with account;

### Exceptions

1. ✅ 400 badRequest: name, email, password and confirm password is not provide;
2. ✅ 400 badRequest: password and confirm password is not equal;
3. ✅ 400 badRequest: email is invalid;
4. ✅ 403 forbidden: email in use;
5. ✅ 404 notFound: route doesn't exists;
6. ✅ 500 serverError: hasher error;
7. ✅ 500 serverError: add account in DB;
8. ✅ 500 serverError: generate access token;
9. ✅ 500 serverError: update access token in DB;
