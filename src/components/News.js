import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

const News = (props) => {
    const [articles,setArticles] = useState([]);
    const [loading,setLoading] = useState(true);
    const [page,setPage] = useState(1);
    const [totalResults,setTotalResults] = useState(0);
    // constructor(props) {
    //     super(props);
    //     //console.log("Hello I am a constructor from news component");  
    //     this.state = {
    //         articles: [],
    //         loading: true,
    //         page: 1,
    //     }
    // }    

    const updateNews = async () => {
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pagesize}`);
        setLoading(false);
        //this.setState({loading:true})
        let parsedData = await data.json();
        //console.log(data);
        //console.log(parsedData);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        //this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults,loading:false })
    }

    useEffect(() => {
        updateNews()
          
      }, [])

    const handlePrevclick = async () => {
        console.log("Prev");
        setLoading(true)
        //this.setState({loading:true})
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page - 1}&pageSize=${props.pagesize}`);
        setLoading(true);
        //this.setState({loading:true})
        let parsedData = await data.json();

        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        setPage(page-1);
        // this.setState({
        //     articles: parsedData.articles,
        //     page: this.state.page - 1,
        //     loading:false
        // })
    }
    const handleNextclick = async () => {
        if (!(page + 1 > Math.ceil(totalResults / props.pagesize))) {
            setLoading(true)
            //this.setState({loading:true})
            let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pagesize}`);
            let parsedData = await data.json();
            setArticles(parsedData.articles);
            setLoading(false);
            setPage(page+1);
            // this.setState({
            //     articles: parsedData.articles,
            //           page: this.state.page + 1,
            //     loading:false
            // })
            //console.log("next");
        }
    }
        return loading ? (<Spinner/>) : (
            <div className="container my-3">
                
                <h1 className="text-center" style={{margin:'30px 0px',marginTop:'90px'}}>{(props.category).toUpperCase()} - Top Headlines</h1>
                {loading && <Spinner/>}
                <div className="row">
                    {articles.map((element) => {
                        // console.log(element);
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem tittle={element.title} description={element.description} urlToImage={element.urlToImage} 
                            newsUrl={element.newsUrl} author={element.author} date={element.publishedAt} source={element.source.name}/>
                        </div>
                    })}
                </div>
                <div className="container">
                    <div className="d-flex justify-content-between">
                        <button disabled={page <= 1} type="button" className="btn btn-success" onClick={handlePrevclick}>&larr; Previous</button>
                        <button disabled={page + 1 > Math.ceil(totalResults / props.pagesize)} type="button" className="btn btn-success" onClick={handleNextclick}>Next &rarr;</button>
                    </div>
                </div>
            </div>
        )
}

News.defaultProps = {
    country: 'in',
    pagesize: 8,
    category: 'general',
}
News.propTypes = {
    country : PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string
}

export default News