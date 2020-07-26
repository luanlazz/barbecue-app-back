# Add/Update barbecue

### Success

1. ❌ validate required fields (date and description);
2. ❌ validate date;
3. ❌ optional fields (observation, cost drink, cost food);
4. ❌ validate user id;
5. ❌ validate barbecue id;
6. ❌ create the barbecue or update if exists;
7. ❌ return 200 with barbecue create;

### Exceptions

1. ❌ 400 badRequest: validate fields fails;
2. ❌ 401 unauthorized: if not receive a valid user id;
3. ❌ 403 forbidden: if not receive a valid barbecue id;
4. ❌ 404 notFound: if route doesn't exists;
5. ❌ 500 serverError: if create/update fails;
