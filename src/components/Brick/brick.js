import React from "react";

export default function Brick({style}){

    return (
        <div
        style={{
        position: "absolute",
        width: "100px",
        height: "25px",
        background: "lime",
        borderRadius: "4px",
        ...style
        }}
        />
    )

}