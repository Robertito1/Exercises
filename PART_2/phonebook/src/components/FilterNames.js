import React from 'react';

const FilterNames = ({ onInput, value }) => {

    return (
        <div>
            <span>search</span> <input onChange={onInput} value={value} />
        </div>
    )
}

export default FilterNames;