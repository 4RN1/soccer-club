import { useEffect, useState } from 'react'
import client from '../sanity.Client'
import { urlFor } from '../sanityImage'
import '../css/news.css'
import Navbar from '../components/Navbar'
import FooterComp from '../components/FooterComp'
import { PortableText } from "@portabletext/react"
import AOS from "aos";

function News() {
  const [articles, setArticles] = useState([])
  const [expanded, setExpanded] = useState(null)


    useEffect(() => {
      AOS.init({ duration: 1000, once: true }); // once = animate only on first scroll
    }, []);

  useEffect(() => {
    client.fetch(`*[_type == "news"]{
      _id,
      title,
      slug,
      publishedAt,
      body,
      mainImage
    }`)
    .then(setArticles)
    .catch(err => console.error(err))
  }, [])

  return (
    
        <div>
          <Navbar/>
      <div className="news">
        
        <div className="news-heading">
          <h1 data-aos="fade-up" data-aos-delay="200">ახალი ამბები</h1>
        </div>
<div className="news-info-wrapper">
   <h2 data-aos="fade-up" data-aos-delay="200">უახლესი ამბები</h2>
   
    <div className="news-list " data-aos="fade-up" data-aos-delay="200">

     
      {articles.map((article) => {
       
        const isExpanded = expanded === article._id
        const previewText = article.body?.[0]?.children?.[0]?.text.slice(0, 100) + '...'

        return (
          <div
            key={article._id}
            className="news-card"
            onClick={() => setExpanded(isExpanded ? null : article._id)}
          >
            {article.mainImage && (
              
              <img
                src={urlFor(article.mainImage).width(600).url()}
                alt={article.title}
              />
            )}
            
            <h2>{article.title}</h2>
            {isExpanded ? (
  <PortableText value={article.body} />
) : (
  <p>{previewText}</p>
)}

            <p className="news-date">{new Date(article.publishedAt).toLocaleDateString()}</p>
          </div>
        )
      })}
    </div>
    </div>
  
    </div>
      <FooterComp/>
    </div>
  )
}

export default News
