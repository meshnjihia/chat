// 'use client'
// import { signOut } from "next-auth/react";

import EmptyState from "@app/components/EmptyState";

const Users = () => {
    return ( 
        // <button onClick={() => signOut()}>
        //     logout
        // </button>
        <div className="hidden lg:block lg:pl-80 h-full">
            <EmptyState/>
        </div>
    );
}

export default Users;