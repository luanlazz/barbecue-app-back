# List barbecue by id

### Success

1. ✅ get in route /api/barbecue/{barbecueId};
2. ✅ validate access token;
4. ✅ return 200 with barbecue;
5. ✅ important infos: date, description, observation, total participants, total collected and suggest values;

### Exceptions

1. ✅ 403 forbidden: if not receive a valid access token or barbecue id;
2. ✅ 404 notFound: if route doesn't exists;
3. ✅ 500 serverError;
