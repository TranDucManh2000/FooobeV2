import React from 'react'

function useRandomId(){
    const random =  Math.random().toString(26).replace(/[^a-z]+/g+[1-9], '').substring(2);
  return random
}

export default useRandomId