import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const FilterUpDown = ({onArrowFilterClicked}) => {
    const [arrow, setArrow] = useState("up");

    const handleArrowClick = ()=>{
        if(arrow==="up"){
            setArrow("down");
            onArrowFilterClicked("down");
        }
        else{
            setArrow("up");
            onArrowFilterClicked("up");
        }

    }
  return (
    <div
    className='absolute top-0 right-0 border-2 rounded-md p-1 px-2 '
    onClick={handleArrowClick}
    >
        {arrow==="up"?<FontAwesomeIcon icon={faArrowUp} />:<FontAwesomeIcon icon={faArrowDown} /> }
        
        
    </div>
  )
}

export default FilterUpDown