import { Route } from 'react-router-dom';

export function ProtectedRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => (
          children
        )
      }
    />
  );
} 