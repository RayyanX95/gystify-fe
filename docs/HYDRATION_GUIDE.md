// Hydration best practices for this Next.js project

/\*\*

- Components that should be client-only to prevent hydration issues:
- 1.  Framer Motion animations (AppAnimator, Header animations, Toaster animations)
- 2.  Zustand stores with persistence (authStore)
- 3.  Components that depend on browser APIs
- 4.  Components with random/time-based content
      \*/

/\*\*

- Solutions implemented:
-
- 1.  useEffect + useState pattern for client-only content
- - Used in AppAnimator, Header, and Toaster
- - Renders non-animated version on server, animated on client
-
- 2.  suppressHydrationWarning on html/body
- - Allows minor differences between server and client
- - Only use when absolutely necessary
-
- 3.  Dynamic imports with ssr: false
- - Used for complex client-only components
- - Provides loading states to prevent layout shift
-
- 4.  Proper auth store hydration
- - Uses onRehydrateStorage to set hasHydrated flag
- - Renders skeleton until hydration complete
    \*/

/\*\*

- Future considerations:
- - Consider using next-themes for dark mode to avoid hydration issues
- - Use cookies for initial auth state to match server/client
- - Avoid Math.random() or Date.now() in render functions
- - Test all animations work properly after hydration
    \*/

export {};
