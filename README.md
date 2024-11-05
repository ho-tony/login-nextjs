# Running the Development Server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To Run Postgres DB on Docker
```
docker-compose up -d
docker ps
docker exec -it [container-id] psql -U admin -d user
```

# Libraries/Frameworks Used (other than the ones specified):
- bcryptjs
- shadcn 
- jsonwebtoken
- node-postgres 
- cookies
- vitest (because jest had a lot of dependency conflicts with react version 18)

Be sure to use a React Version < 19 (react compiler can get finnicky) and node version that supports nextjs (I use node 21 and that's what the integration tests support for).


# Future Improvements:
- Better location tests (I'm honestly not sure if this works)
- More unit + integration tests
- More abstraction (use custom hooks, customizable components)
- Gallery calls external corgi api 


![Home Page Screenshot](/screenshots/homepage.png)
![Login Page Screenshot](/screenshots/login.png)
![Profile Page Screenshot](/screenshots/profile-page.png)
![Registration Screenshot](/screenshots/registration.png)