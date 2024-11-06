import React from 'react'
import { useAuth } from '../../Context/UseAuth';
import { Link } from 'react-router-dom';
import welcomeImage from './alley.jpg'

interface Props {}

const WelcomePage = (props: Props) => {
    const { isLoggedIn } = useAuth();
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center p-8 lg:p-16">
          {/* Sekcja z obrazem */}
          <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
            <img src={welcomeImage} alt="Bowling" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
    
          {/* Sekcja z tekstem */}
          <div className="w-full lg:w-1/2 flex flex-col items-start lg:items-start space-y-6 px-4">
            <h1 className="text-4xl font-bold text-darkBlue">Welcome to LaneControll</h1>
            <p className="text-lg text-gray-700">
              Book your lane effortlessly and enjoy the best bowling experience! We offer easy and convenient lane reservations for you and your friends.
            </p>
            <p className="text-md text-gray-600">
              Place your orders in advance, so everything is ready when you arrive. From snacks to drinks, we've got you covered to make your time on the lanes enjoyable.
            </p>

            {isLoggedIn() ? (
                <Link to="/home">
                <button className="px-8 py-3 mt-4 text-white font-bold bg-lightGreen rounded-lg hover:opacity-80">
                  Get started
                </button>
              </Link>
            ) : (
                <Link to="/login">
              <button className="px-8 py-3 mt-4 text-white font-bold bg-lightGreen rounded-lg hover:opacity-80">
                Get started
              </button>
            </Link>
            )}

            {/* Przycisk "Get started" */}
            
          </div>
        </div>
      );
}

export default WelcomePage