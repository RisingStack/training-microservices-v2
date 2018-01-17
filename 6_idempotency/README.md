# Example Retry

## Goal

Client retry requests to succeed.

## Steps

1. `npm install` and `npm start`
2. Watch the output and observe exponential backoff and idempotency:
  1.1 First request succeeds
  1.2 Second request fails, succeeds on retry
  1.3 Second request is sent again with same idempotency key, side effect does not occur.

## Result

```
Client 1. Request started
Client 1. Making request, after 0ms, Runs for 1. time.
Server 1. Idempotency key not found for raiseCounter, counter: 0 idempotencyKey: 0913de91-fbbc-11e7-b50b-116b7d5fb53e
Server 1. Respond with: ok, counter: 1, idempotencyKey: 0913de91-fbbc-11e7-b50b-116b7d5fb53e
Client 1. Request finished with: success {"status":"ok"}
Client 2. Request started
Client 2. Making request, after 0ms, Runs for 1. time.
Server 2. Idempotency key not found for raiseCounter, counter: 1 idempotencyKey: 0913de90-fbbc-11e7-b50b-116b7d5fb53e
Server 2. Respond with: error, counter: 2, idempotencyKey: 0913de90-fbbc-11e7-b50b-116b7d5fb53e
Client 2. Request failed: retry, Will run for 2. time
Client 2. Making request, after 1016ms, Runs for 2. time.
Client 2. Retried after 1007ms
Server 2. Idempotency key found for raiseCounter, counter: 2 idempotencyKey: 0913de90-fbbc-11e7-b50b-116b7d5fb53e
Server 2. Respond with: ok, counter: 2, idempotencyKey: 0913de90-fbbc-11e7-b50b-116b7d5fb53e
Client 2. Request finished with: success {"status":"ok"}
Client 3. Request started
Client 3. Making request, after 0ms, Runs for 1. time.
Server 3. Idempotency key found for raiseCounter, counter: 2 idempotencyKey: 0913de90-fbbc-11e7-b50b-116b7d5fb53e
Server 3. Respond with: error, counter: 2, idempotencyKey: 0913de90-fbbc-11e7-b50b-116b7d5fb53e
Client 3. Request failed: retry, Will run for 2. time
Client 3. Making request, after 1008ms, Runs for 2. time.
Client 3. Retried after 1004ms
Server 3. Idempotency key found for raiseCounter, counter: 2 idempotencyKey: 0913de90-fbbc-11e7-b50b-116b7d5fb53e
Server 3. Respond with: ok, counter: 2, idempotencyKey: 0913de90-fbbc-11e7-b50b-116b7d5fb53e
Client 3. Request finished with: success {"status":"ok"}
```
