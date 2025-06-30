import express from 'express'

import { User } from '@shared/types/user'; 

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const user: User = { id: '1', email: 'alice@example.com', name: 'john', age: 30 };
  res.json(user);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
