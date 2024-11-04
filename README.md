To run the development server:

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

Libraries/Frameworks I mostly used (besides the ones required):
- bcryptjs
- shadcn 
- jsonwebtoken
- node-postgres

Be sure to use a React Version <= 19 (react compiler can get finnicky) and node version that supports nextjs (I use node 21).