# Remove participant

### Success

1. ❌ validate access token and barbecue id;
2. ✅ remove participant;
3. ❌ return 204  doesn't exists participants;

### Exceptions

1. ❌ 400 badRequest: invalid barbecue;
2. ✅ 403 forbidden: if access token is invalid;
3. ✅ 404 notFound: if route doesn't exists;
4. ✅ 500 serverError: any error in data or infra layer;
