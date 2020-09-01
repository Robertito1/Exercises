import React from 'react';

const NewPersonForm = ({ addPerson, newName, inputName, inputPhone, newPhone }) => {


    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input
                    value={newName}
                    onChange={inputName} /> <br />
            phone-number:  <input
                    value={newPhone}
                    onChange={inputPhone} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default NewPersonForm;