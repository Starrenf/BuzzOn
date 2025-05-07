import React from 'react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Events</Link>
        </li>
      </ul>
    </nav>
  );
};
