'use client'

// Import React and necessary hooks
import React, { useState, useEffect } from 'react';

// Define the prop types for the component
interface ClientOnlyProps {
  children: React.ReactNode;
}

// Define the component
const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  // Define state for whether the component has mounted or not
  const [hasMounted, setHasMounted] = useState(false);

  // Run effect when the component mounts to update state
  useEffect(() => {
    setHasMounted(true);
  }, [])

  // If the component has not yet mounted, do not render children
  if (!hasMounted) return null;

  // If the component has mounted, render children
  return (
    <>
      {children}
    </>
  );
};

// Export the component as the default export
export default ClientOnly;
