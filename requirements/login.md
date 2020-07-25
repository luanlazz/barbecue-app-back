# Login:

### Success

1. ❌ post in route /api/signin;
2. ❌ validate fields required (email and password);
3. ❌ validate if email is valid;
4. ❌ load user from DB by email;
5. ❌ generate accessToken and update field in DB;
6. ❌ return 200 with account;

### Exceptions

1. ❌ 400 badRequest: email or password is not provide;
2. ❌ 400 badRequest: invalid email or password;
3. ❌ 400 badRequest: email is invalid;
4. ❌ 401 unauthorized: not find the user with this values;
5. ❌ 403 forbidden: password incorrect;
6. ❌ 404: notFound: route doesn't exists;
7. ❌ 500 serverError: hasher error;
8. ❌ 500 serverError: update access token in DB;
