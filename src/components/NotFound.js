import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <div className='not-found'>
        <h2>Sorry</h2>
        <p> That page cannot be found </p>
        <Link to='/registration'>Sign up</Link>
    </div>
  )
}
