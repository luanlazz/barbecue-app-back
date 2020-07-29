# Remove participant

### Success

1. ❌ validate access token and barbecue id;
3. ✅ remove participant;
2. ❌ return 204 if doesn't exists participants;
4. ❌ return 200 with participants and respective values;

### Exceptions

1. ❌ 400 badRequest: invalid barbecue;
2. ❌ 403 forbidden: if access token is invalid;
3. ❌ 404 notFound: if route doesn't exists;
4. ❌ 500 serverError: any error in data or infra layer;
