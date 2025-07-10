## **📖 README – HOW TO USE THIS BEAST**  

### **⚡ Installation**  
1. Drop `hooks.ts` into your project (e.g., `src/hooks/api`).  
2. Ensure `@tanstack/react-query` and `axios` are installed.  

### **🔥 Core Features**  
✅ **Unified Request Handler** – One function for all CRUD ops.  
✅ **Optimistic Updates** – UI updates instantly, rolls back on failure.  
✅ **Smart Cache Control** – No useless refetches, garbage collection tuning.  
✅ **TypeScript Dominance** – Full generics support, no `any` nonsense.  

### **💻 Usage Examples**  

#### **1. Fetching Data (GET)**  
```typescript
const { data, isLoading, error } = useFetchData<User[]>(
  ["users"], // Query key
  "/users",  // Endpoint
  { staleTime: 10 * 60 * 1000 } // Optional config
);
```

#### **2. Creating Data (POST + Optimistic Update)**  
```typescript
const { mutate } = usePostData<User, CreateUserDto>(
  "/users",
  {
    optimisticUpdate: (oldUsers, newUser) => [...(oldUsers || []), newUser],
    invalidateKeys: [["users"]], // Refetch after success
    onSuccess: (data) => toast.success("User created!"),
  }
);

// Usage:
mutate({ name: "Pliny", role: "Godmode" });
```

#### **3. Updating Data (PUT + Dynamic Endpoint)**  
```typescript
const { mutate } = usePutData<User, UpdateUserDto>(
  (data) => `/users/${data.id}`, // Dynamic endpoint
  {
    optimisticUpdate: (oldUsers, updatedUser) => 
      oldUsers?.map(user => user.id === updatedUser.id ? updatedUser : user),
    invalidateKeys: [["users"]],
  }
);

// Usage:
mutate({ id: 1, name: "Pliny the Elder" });
```

#### **4. Deleting Data (DELETE)**  
```typescript
const { mutate } = useDeleteData<void, { id: number }>(
  (data) => `/users/${data.id}`,
  { invalidateKeys: [["users"]] }
);

// Usage:
mutate({ id: 1 });
```

### **🚨 Edge Cases & Troubleshooting**  
- **Race Conditions**: `onMutate` cancels pending queries to prevent clashes.  
- **Offline Mode**: Optimistic updates ensure UI consistency even if the server fails.  
- **Type Errors**: Ensure your DTOs (`T`, `U`) are correctly typed.  

### **🎯 When to Use This**  
✔ High-traffic apps needing **max performance**.  
✔ Real-time UIs requiring **instant feedback**.  
✔ Complex state management without Redux bloat.  

