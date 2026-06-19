import { ViewTransition } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * PageTransition – wraps page content in React's <ViewTransition>
 * to enable the "brick-build" CSS animation during route changes.
 * 
 * IMPORTANT: This is a Server Component. ViewTransition requires
 * Next.js' internal React experimental build which is only available
 * in server components when experimental.viewTransition is enabled.
 */
export function PageTransition({ children }: PageTransitionProps) {
  return (
    <ViewTransition
      name="page-content"
      enter="brick-build"
      exit="brick-build"
      default="brick-build"
    >
      {children}
    </ViewTransition>
  );
}
