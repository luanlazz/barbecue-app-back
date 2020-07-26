# Add/Update barbecue

### Success

1. ✅ put in route /api/barbecue/:barbecueId?;
2. ✅ validate required fields (date and description);
3. ❌ validate date;
4. ✅ optional fields (observation, cost drink, cost food);
5. ✅ validate access token;
6. ✅ validate barbecue id;
7. ✅ create the barbecue or update if exists;
8. ✅ return 200 with barbecue create;

### Exceptions

1. ✅ 400 badRequest: validate fields fails;
2. ✅ 403 forbidden: if not receive a invalid access token;
3. ❌ 403 forbidden: if not receive a valid barbecue id;
4. ✅ 404 notFound: if route doesn't exists;
5. ✅ 500 serverError: if create/update fails;
