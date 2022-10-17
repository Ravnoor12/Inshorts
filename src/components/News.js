import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pagesize: 8,
        category: 'general',
    }
    static propTypes = {
        country : PropTypes.string,
        pagesize: PropTypes.number,
        category: PropTypes.string
    }
    constructor(props) {
        super(props);
        //console.log("Hello I am a constructor from news component");  
        this.state = {
            articles: [],
            loading: true,
            page: 1,
        }
    }

    async componentDidMount() {
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pagesize}`);
        this.setState({loading:true})
        let parsedData = await data.json();
        //console.log(data);
        //console.log(parsedData);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults,loading:false })
    }
    handlePrevclick = async () => {
        console.log("Prev");
        this.setState({loading:true})
        let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pagesize}`);
        this.setState({loading:true})
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            page: this.state.page - 1,
            loading:false
        })
    }
    handleNextclick = async () => {
        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize))) {
            this.setState({loading:true})
            let data = await fetch(`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pagesize}`);
            let parsedData = await data.json();
            this.setState({
                articles: parsedData.articles,
                      page: this.state.page + 1,
                loading:false
            })
            //console.log("next");
        }
    }
    render() {
        return this.state.loading ? (<Spinner/>) : (
            <div className="container my-3">
                
                <h1 className="text-center" style={{margin:'40px 0px'}}>{(this.props.category).toUpperCase()} - Top Headlines</h1>
                {this.state.loading && <Spinner/>}
                <div className="row">
                    {this.state.articles.map((element) => {
                        // console.log(element);
                        return <div className="col-md-4" key={element.url}>
                            <NewsItem tittle={element.title} description={element.description} urlToImage={element.urlToImage} 
                            newsUrl={element.newsUrl} author={element.author} date={element.publishedAt} source={element.source.name}/>
                        </div>
                    })}
                </div>
                <div className="container">
                    <div className="d-flex justify-content-between">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-success" onClick={this.handlePrevclick}>&larr; Previous</button>
                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pagesize)} type="button" className="btn btn-success" onClick={this.handleNextclick}>Next &rarr;</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default News