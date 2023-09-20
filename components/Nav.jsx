import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';



export const Nav = () => {
  return (
    <section className='nav-section'>
      <div className="flex justify-around items-center ml-5 gap-3 mt-3">
        <div className='flex gap-2 '>
        <h1 className='text-4xl font-normal'>Booklib</h1>
        <FontAwesomeIcon className='logo-icon w-10' icon={faBook} />
        </div>
        <div>
          <ul className='nav-items flex gap-6'> 
            <li> <Link href='/support'> Support </Link></li>
            <li> <Link href={'/contact'}> Contact </Link></li>
            <li> <Link href={'/about'}> About </Link></li>
          </ul>
        </div>
       
      </div>
    </section>
  )
}
