import Link from 'next/link'
import React from 'react'

const SwitchAccount = ({text,src,linkText}) => {
  return (
    
    <p>{text} Have An Account? &nbsp;
        <Link href={src} className='switch-acc-link'>
            {linkText}
        </Link>
    </p>
    
  )
}

export default SwitchAccount