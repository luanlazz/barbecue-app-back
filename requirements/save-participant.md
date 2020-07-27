# Add/Update participant

### Success

1. ✅ put in route /api/barbecue/:barbecueId/participants/:participantId?;
2. ✅ validate required field name;
3. ✅ optional fields drink or food consume;
4. ✅ validate user id and barbecue id;
5. ✅ return 200 with participants;

### Exceptions

1. ✅ 400 badRequest: validate field fails or invalid barbecue id;
2. ✅ 401 unauthorized: if not receive a valid user id;
3. ✅ 404 notFound: if route doesn't exists;
4. ✅ 500 serverError: any error in data or infra layer;
