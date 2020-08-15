# List participants

### Success

1. ✅ validate access token and barbecue id;
2. ✅ return 204 if doesn't exists guests;
3. ✅ return 200 with participants;

### Exceptions

1. ✅ 403 forbidden: if access token is invalid;
2. ✅ 404 notFound: if route doesn't exists;
3. ✅ 500 serverError;
