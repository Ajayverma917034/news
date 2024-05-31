
import MostReadNews from './MostRead'
import CategoryRead from './Categories'
import LatestNews from './Latest'
import { useContext } from 'react'
import { UserContext } from '../App'
import { Navigate } from 'react-router-dom'

const Das = () => {
    const {userAuth: {refreshToken}} = useContext(UserContext)
  return (
    !refreshToken ? <Navigate to='/sign-in'/> :
    <div className= ''>
        <div className='flex flex-col sm:flex-row justify-center gap-16  my-8'>
            <div className=' shadow-dark-shadow px-8 py-6 rounded-3xl'>
                <p className='date-md text-2xl text-right'>Reset at 12:00 AM</p>
                <div className='flex justify-around gap-8 items-center'>
                    <h2 className='text-5xl font-medium text-right'>
                        Today Total News Views
                    </h2>
                    <h2 className='text-4xl font-semibold'>
                        245K
                    </h2>
                </div>
            </div>
            <div className=' shadow-dark-shadow px-8 py-6 rounded-3xl'>
                <p className='date-md text-2xl text-right'>Reset at 12:00 AM</p>
                <div className='flex justify-around gap-8 items-center'>
                    <h2 className='text-5xl font-medium text-right'>
                        Today Total News Views
                    </h2>
                    <h2 className='text-4xl font-semibold'>
                        245K
                    </h2>
                </div>
            </div>
        </div>
        <div className='flex flex-col sm:flex-row justify-center gap-16  my-8 mx-12 '>
            <MostReadNews/>
            <MostReadNews/>
        </div>
        <div className='flex flex-col sm:flex-row justify-center gap-16  my-8 mx-12 '>
            <LatestNews/>
            <LatestNews/>
        </div>
        <div className='my-8 mx-12 shadow-dark-shadow p-4'>
            <CategoryRead/>
        </div>
    </div>
  )
}

export default Das