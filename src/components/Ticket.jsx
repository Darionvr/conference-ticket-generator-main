import React, { useContext, useEffect, useState } from 'react'
import { FormContext } from '../context/FormContext'
import { useNavigate } from 'react-router'
import { Navigate } from 'react-router'


const Ticket = () => {

  const { data, setData, avatar, setAvatar } = useContext(FormContext)
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [ticketNumber, setTicketNumber] = useState('');
  const navigate = useNavigate()

  useEffect(() => {

    const currentDate = new Date().toLocaleDateString();
    setDate(currentDate);

    const randomTicketNumber = Math.floor(Math.random() * 10000);
    setTicketNumber(randomTicketNumber);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(response => response.json())
            .then(data => {
              setLocation(`${data.address.city}, ${data.address.country}`);
            })
            .catch(error => {
              console.error('Error fetching location data:', error);
              setLocation('Unknown Location');
            });
        },
        (error) => {
          console.error('Error getting geolocation:', error);
          setLocation('Unknown Location');
        }
      );
    } else {
      setLocation('Geolocation not supported');
    }
  }, []);

const resetTicket = (e) =>{
setData([])
setAvatar([])
navigate('/')
}

  return (

    <>
      <header>
        <img onClick={resetTicket} className='logo-reset' src="/images/logo-full.svg" alt="logo" />
        <h1>Congrats, <span className='name-gradient'> {data[0].name}</span>! <br /> Your ticket is ready.</h1>
        <p>   We've emailed your ticket to <br /> <span className='email-ticket'> {data[0].email}</span> and will send updates in <br /> the run up to the event.</p>

      </header>

      <section>

        <div className="ticket-container">
          <img className='ticket' src="/images/pattern-ticket.svg" alt="" />

          <img className='logo-ticket' src="images/logo-full.svg" alt="Logo" />
          <p className='date-ticket' >{date} / {location}</p>

          <div className="user-data">
            {avatar.map((file, index) => (
              <img className='avatar-ticket' key={index} src={URL.createObjectURL(file)} alt='Avatar Preview' />))}
            <div>
              <p className='name-ticket' >{data[0].name}</p>
              <p className='github-ticket' > <object data="/images/icon-github.svg" type="image/svg+xml"></object> {data[0].github}</p>
            </div>
           

          </div>
          <p className='number'> #{ticketNumber}</p>


        </div>


        <p> </p>


      </section>


    </>
  )
}

export default Ticket