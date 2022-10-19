import React from 'react'

const NewsItem = (props) => { 
      let {tittle,description,urlToImage,newsUrl,author,date,source} = props;
    return (
      <div className='my-3'>
        <div className="card" >
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%',zIndex:'1'}}>
    {source}</span>
        <img src={urlToImage} className="card-img-top" alt="..."/>
        <div className="card-body">
        <h5 className="card-title">{tittle}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text"><small className="text-muted">
          By {!author? "Unknown" : author} on {new Date(date).toUTCString()}</small></p>
        <a href={newsUrl} className="btn btn-sm btn-primary">Go somewhere</a>
        </div>
        </div>
      </div>
    )
}

export default NewsItem