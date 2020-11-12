import React from 'react'

export const PopUpMessage = ({ message }) => {
    if(!message.display) return null

    return (
        <div className={`alert alert-${message.color}`} style={{position:'absolute', bottom:'0', width:'calc(100% - 30px)'}}>
            {message.message}
        </div>
    )
}
