import React, { useEffect, useState } from 'react';
import { reservationGetAdminAPI } from '../../Services/ReservationServices';
import AdminReservationList from '../AdminReservationList/AdminReservationList';
import { useAuth } from '../../Context/UseAuth';
import { ReservationAdminGet } from '../../Models/Reservation';

type Props = {};

const AdminReservation = (props: Props) => {
  const [reservations, setReservations] = useState<ReservationAdminGet[] | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const [day, setDay] = useState('');
  const [alleyName, setAlleyName] = useState('');
  const [laneNumber, setLaneNumber] = useState('');
  const [city, setCity] = useState('');
  const [userName, setUserName] = useState('');
  const { isAdmin } = useAuth();

  useEffect(() => {
    getReservations();
  }, []);

  const handleSearch = () => {
    getReservations();
  };

  const getReservations = () => {
    reservationGetAdminAPI(isExpired, day, alleyName, laneNumber, city, userName)
      .then((res) => {
        setReservations(res?.data!);
      });
  };

  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Alley Name"
          value={alleyName}
          onChange={(e) => setAlleyName(e.target.value)}
          className="px-4 py-2 border-2 border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 border-2 border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Lane Number"
          value={laneNumber}
          onChange={(e) => setLaneNumber(e.target.value)}
          className="px-4 py-2 border-2 border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="px-4 py-2 border-2 border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
        />
        <input
          type="date"
          placeholder="Day"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="px-4 py-2 border-2 border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isExpired}
            onChange={() => setIsExpired(!isExpired)}
            className="mr-2"
          />
          <label>Expired</label>
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      {reservations ? (
        <AdminReservationList reservations={reservations!} />
      ) : (
        <p>No reservations found</p>
      )}
    </div>
  );
};

export default AdminReservation;
