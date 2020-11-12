import React from 'react'

const PersonForm = ({ handleChange, input , submitPerson}) => {
    return (
        <form onSubmit={submitPerson} className="mb-4">
            <div>
                Name: <input name="name" type="text" onChange={handleChange} value={input.name} />
            </div>
            <div>
                Number: <input name="number" type="number" onChange={handleChange} value={input.number} />
            </div>

            <div>
                <button type="submit" className="btn btn-info">Add</button>
            </div>
        </form>
    )
}

export default PersonForm
