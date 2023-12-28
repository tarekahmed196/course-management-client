import React from 'react';

const LogOut = () => {
    localStorage.removeItem('token');
    return (
        <div>
            Log Out successfully
        </div>
    );
};

export default LogOut;