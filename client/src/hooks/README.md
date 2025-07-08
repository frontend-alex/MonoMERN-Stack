## **1. BASIC FETCH (READ)**  
```tsx
// Fetch all posts
const { data: posts, isLoading } = useApiQuery<Post[]>(
  ['posts'], 
  '/posts',
  {
    staleTime: 60 * 1000, // 1 minute
    onError: (error) => {
      console.error('Failed loading posts:', error.response?.data.message)
    }
  }
);

// Fetch single post with ID
const { data: post } = useApiQuery<Post>(
  ['post', postId], // Query key
  `/posts/${postId}`, // Endpoint
  { enabled: !!postId } // Only fetch when ID exists
);
```

## **2. CREATE OPERATION**  
```tsx
const { mutate: createPost } = useApiMutation<Post, CreatePostDto>(
  'POST',
  '/posts',
  {
    // Invalidate posts list to trigger refetch
    invalidateQueries: [['posts'], ['user-posts']],
    onSuccess: (newPost) => {
      toast.success(`Post "${newPost.title}" created!`);
      // OPTIONAL: Update cache manually
      queryClient.setQueryData(['post', newPost.id], newPost);
    },
    onError: (error) => {
      toast.error(error.response?.data.message || 'Failed creating post');
    }
  }
);

// Usage:
createPost({ title: 'New Post', content: '...' });
```

## **3. UPDATE OPERATION**  
```tsx
const { mutate: updatePost } = useApiMutation<Post, UpdatePostDto>(
  'PUT',
  (dto) => `/posts/${dto.id}`, // Dynamic endpoint
  {
    // Invalidate both the list and this specific post
    invalidateQueries: [['posts'], ['post', variables.id]],
    // Optimistic update example:
    onMutate: async (updatedPost) => {
      await queryClient.cancelQueries(['post', updatedPost.id]);
      const previous = queryClient.getQueryData<Post>(['post', updatedPost.id]);
      queryClient.setQueryData(['post', updatedPost.id], updatedPost);
      return { previous };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      queryClient.setQueryData(['post', variables.id], context?.previous);
    }
  }
);
```

## **4. DELETE OPERATION**  
```tsx
const { mutate: deletePost } = useApiMutation<void, string>(
  'DELETE',
  (postId) => `/posts/${postId}`,
  {
    // Invalidate multiple related queries
    invalidateQueries: [
      ['posts'], 
      ['user-posts'],
      ['post', postId] // Invalidate cached single post
    ],
    onSuccess: (_, postId) => {
      toast.success(`Post #${postId} deleted`);
      // Remove from cache immediately
      queryClient.removeQueries(['post', postId]);
    }
  }
);
```

## **5. ADVANCED INVALIDATION PATTERNS**  
```tsx
// Invalidate all posts starting with prefix
queryClient.invalidateQueries({
  predicate: (query) => 
    query.queryKey[0] === 'posts' && 
    (query.queryKey[1] as string)?.startsWith('draft-')
});

// Invalidate every query in app
queryClient.invalidateQueries();

// Invalidate with exact matching
queryClient.invalidateQueries({
  queryKey: ['posts'],
  exact: true // Won't invalidate ['posts', 1]
});

// Invalidate and refetch immediately
queryClient.invalidateQueries(['posts'], { refetchType: 'active' });
```

## **6. PAGINATED QUERIES**  
```tsx
const [page, setPage] = useState(1);

const { data } = useApiQuery<PaginatedResponse<Post>>(
  ['posts', page],
  `/posts?page=${page}`,
  {
    // Keep previous data while loading
    keepPreviousData: true,
    // Cache all pages separately
    cacheTime: 10 * 60 * 1000
  }
);

// Prefetch next page
useEffect(() => {
  if (data?.hasNextPage) {
    queryClient.prefetchQuery(
      ['posts', page + 1],
      () => fetcher(`/posts?page=${page + 1}`)
    );
  }
}, [page, data]);
```

## **7. DEPENDENT QUERIES**  
```tsx
// Fetch user -> then fetch their posts
const { data: user } = useApiQuery<User>(
  ['user', userId], 
  `/users/${userId}`
);

const { data: posts } = useApiQuery<Post[]>(
  ['user-posts', userId],
  `/users/${userId}/posts`,
  { enabled: !!user } // Only fetch when user exists
);
```

## **8. MUTATION WITH OPTIMISTIC UPDATES**  
```tsx
const { mutate: toggleLike } = useApiMutation<Post, string>(
  'PATCH',
  (postId) => `/posts/${postId}/like`,
  {
    onMutate: async (postId) => {
      await queryClient.cancelQueries(['post', postId]);
      const previous = queryClient.getQueryData<Post>(['post', postId]);
      
      // Optimistically update
      queryClient.setQueryData(['post', postId], (old) => ({
        ...old,
        likes: old.likes + 1,
        isLiked: true
      }));
      
      return { previous };
    },
    onError: (err, postId, context) => {
      queryClient.setQueryData(['post', postId], context.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['posts']);
    }
  }
);
```

## **INVALIDATION CHEATSHEET**  
| Scenario | Solution |
|----------|----------|
| After creating item | `['items']` (list) |
| After updating item | `['items'], ['item', id]` |
| After deleting item | `['items'], ['item', id]` + `removeQueries` |
| After bulk operation | `{ predicate: query => ... }` |
| After auth changes | `invalidateQueries()` (everything) |
| Silent background refresh | `invalidateQueries(..., { refetchType: 'inactive' })` |

