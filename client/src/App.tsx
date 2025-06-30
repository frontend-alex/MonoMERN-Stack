import type { User } from "@shared/types/user";

const App = () => {

  const user: User = {
    id: "1",
    email: "alice@example.com",
    name: "Alice",
    age: 30
  };

  return (
    <div>
      <h1>User Information</h1>
      <p>ID: {user.id}</p>
      <p>Email: {user.email}</p>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  )
}

export default App
