# React 16 Frontend

This project currently hits a [.Net 8 Core API backend](https://github.com/recordstuff/bretts-services).

## Points of Interest

- [HttpClient.ts](https://github.com/recordstuff/bretts-app/blob/master/src/services/HttpClient.ts) Axios wrapper used to hit the backend api.
- [JwtUtil.ts](https://github.com/recordstuff/bretts-app/blob/master/src/services/JwtUtil.ts) for Jwt manipulation.
- [ErrorBoundary.tsx](https://github.com/recordstuff/bretts-app/blob/master/src/components/ErrorBoundary.tsx) is the only class component in the project since error boundaries use getDerivedStateFromError and ComponentDidCatch.  But it does global exception handling by using vanila JS handlers as well for catching what an error boundary alone can't. 
- [PrivateRoute.tsx](https://github.com/recordstuff/bretts-app/blob/master/src/components/PrivateRoute.tsx) for enforcing Auth.
- [Dockerfile](https://github.com/recordstuff/bretts-app/blob/master/Dockerfile) for serving the prod version of the site.