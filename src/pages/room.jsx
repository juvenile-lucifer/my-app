import React from "react";

// interface RoomProps {
//     id: string;
// }

function Chat() {
    console.log("hello chat")
    return <div>Hello Chat</div>
}

export function Room(props) {

    const chat = <Chat />;
    console.log(chat)

    return <div>Hello Room</div>
}