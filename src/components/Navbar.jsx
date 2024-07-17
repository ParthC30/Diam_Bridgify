import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {

  const navigate = useNavigate();


  return (
    <div>
        <div className="pr-4">
          <Link to='/account' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create Account
          </Link>
        </div>
    </div>
  );
}

export default Navbar;
