import React, { useState, useEffect } from 'react';
import Photo from './Photo';

const mainUrl = `https://api.unsplash.com/photos/`;
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);

  const fetchImages = async () => {
    setLoading(true);
    const url = `${mainUrl}${clientID}&page=${page}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((oldPhotos) => {
        return [...oldPhotos, ...data];
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      const innerHeight = window.innerHeight;
      const scrollY = window.scrollY;
      const bodyHeight = document.body.scrollHeight;

      if (!loading && innerHeight + scrollY >= bodyHeight - 10) {
        setPage((oldPage) => oldPage + 1);
      }
    });

    return () => window.removeEventListener('scroll', event);
    // eslint-disable-next-line
  }, []);

  return (
    <main>
      <section className='photos'>
        <div className='photos-center'>
          {photos.map((photo) => {
            return <Photo key={photo.id} {...photo} />;
          })}
        </div>
        {loading && <h2 className='loading'>loading...</h2>}
      </section>
    </main>
  );
}

export default App;
