import '../css/Gallery.css';
import Navbar from '../components/Navbar';
import FooterComp from '../components/FooterComp';
import { useEffect, useState } from 'react';
import client from '../sanity.Client';
import AOS from "aos";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function Gallery() {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  // AOS Init
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Fetch Photos
  useEffect(() => {
    client.fetch(`*[_type=="photo"]{
      _id,
      title,
      caption,
      image{asset->{_id, url}}
    }`)
      .then(data => setImages(data))
      .catch(err => console.error(err));
  }, []);

  // Fetch Videos
  useEffect(() => {
    client.fetch(`*[_type == "videogallery"]{
      _id,
      title,
      video[]{
        file{asset->{url}},
        embedUrl,
        description
      }
    }`)
      .then(data => setVideos(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="gallery">
      <Navbar />

      {/* Hero Section */}
      <div className='images'>
        <h1 data-aos="fade-up" data-aos-delay="200">გალერეა</h1>
      </div>

      {/* ---------------------- PHOTO SLIDER ---------------------- */}
      <h2 className='photos-heading' data-aos="fade-up">ფოტოები</h2>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        className="photo-slider"
      >
        {images.length > 0 ? images.map(photo => (
          <SwiperSlide key={photo._id}>
            <div className="slider-photo" data-aos="fade-up">
              <img
                src={photo.image?.asset?.url || '/placeholder.jpg'}
                alt={photo.caption || photo.title}
              />
              {photo.caption && <p>{photo.caption}</p>}
            </div>
          </SwiperSlide>
        )) : <p style={{ textAlign: "center" }}>სურათები ვერ მოიძებნა</p>}
      </Swiper>


      {/* ---------------------- VIDEO SLIDER ---------------------- */}
      <h2 className='videos-heading' data-aos="fade-up">ვარჯიშის ვიდეოები</h2>

      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={20}
        slidesPerView={1}
        className="video-slider"
      >
        {videos.map(item =>
          item.video?.map((v, idx) => (
            <SwiperSlide key={idx}>
              <div className="slider-video" data-aos="fade-up">

                {/* Local uploaded video */}
                {v.file?.asset?.url && (
                  <video controls>
                    <source src={v.file.asset.url} type="video/mp4" />
                  </video>
                )}

                {/* YouTube/Vimeo embed */}
                {v.embedUrl && (
                  <iframe
                    src={v.embedUrl.replace("watch?v=", "embed/")}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}

                {v.description && <p>{v.description}</p>}
              </div>
            </SwiperSlide>
          ))
        )}
      </Swiper>

      <FooterComp />
    </div>
  );
}

export default Gallery;
