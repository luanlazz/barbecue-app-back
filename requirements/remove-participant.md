# Remove participant

### Success

1. ✅ validate access token and barbecue id;
2. ✅ remove participant;
3. ✅ return 204 on success;

### Exceptions

1. ✅ 403 forbidden: if access token or barbecue id are invalid;
2. ✅ 404 notFound: if route doesn't exists;
3. ✅ 500 serverError;
