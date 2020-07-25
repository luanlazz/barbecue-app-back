# Login:

### Success

1. ✅ post in route /api/login;
2. ✅ validate fields required (email and password);
3. ✅ validate if email is valid;
4. ✅ load user from DB by email;
5. ✅ generate accessToken and update field in DB;
6. ✅ return 200 with account;

### Exceptions

1. ✅ 400 badRequest: email or password is not provide;
2. ✅ 400 badRequest: email is invalid;
3. ✅ 401 unauthorized: invalid email or password;
4. ✅ 401 unauthorized: password incorrect;
5. ✅ 404 notFound: route doesn't exists;
6. ✅ 500 serverError: hasher error;
7. ✅ 500 serverError: update access token in DB;
