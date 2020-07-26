# List barbecues

### Success

1. ✅ get in route /api/barbecue;
2. ✅ validate access token;
3. ✅ return 204 if doesn't exists barbecues;
4. ✅ return 200 with barbecues list;
5. ❌ important infos: date, description, observation, total peoples, value total;

### Exceptions

1. ✅ 401 unauthorized: if not receive a valid access token;
2. ✅ 404 notFound: if route doesn't exists;
3. ✅ 500 serverError: any error in data or infra layer;
