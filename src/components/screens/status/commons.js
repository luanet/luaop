import React from 'react';

export default ({ children, ...props }) => (
  <h2 className="ttu tracked f6 fw4 teal mt0 mb4" {...props}>{ children }</h2>
);
