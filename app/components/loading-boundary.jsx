import { Suspense } from 'react';
import { Text } from './text';
import { Loader } from './loader';

export function LoadingBoundary({ children, fallback }) {
  return (
    <Suspense fallback={fallback || <LoadingFallback />}>
      {children}
    </Suspense>
  );
}

function LoadingFallback() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: '2rem',
      minHeight: '200px'
    }}>
      <Loader />
      <Text size="s" style={{ marginLeft: '1rem' }}>
        Loading...
      </Text>
    </div>
  );
} 