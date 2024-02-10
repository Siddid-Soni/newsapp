import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {

    static propTypes = {
        pageSize: PropTypes.number
    }

    cpaitalise = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1)
    }
    
    constructor(props) {
        super(props)
        this.state={
            articles: [],
            loading: false,
            page: 1,
            totalPages: 1,
            status: 'ok',
            totalResults: 0,
        }
        document.title = `${this.cpaitalise(this.props.category)} - NewsApp`
    }

    // async updateNews (pageDirec) {
    //     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.apiKey}&page=${this.state.page + pageDirec}&pageSize=${this.props.pageSize}`
    //     this.setState({loading: true})
    //     let data = await fetch(url)
    //     let parsedData = await data.json()
    //     this.setState({
    //         articles: parsedData.articles,
    //         page: this.state.page + pageDirec,
    //         loading: false
    //     })
    // }

    async componentDidMount(){
        this.props.setProgress(10)
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`
        this.setState({loading: true})
        let data = await fetch(url)
        this.props.setProgress(40)
        let parsedData = await data.json()
        this.props.setProgress(70)
        let totalPages = Math.ceil(parsedData.totalResults/20)
        console.log(parsedData.status)
        if (parsedData.status === 'ok') {
            this.setState({
                articles: !parsedData.articles?[]:parsedData.articles,
                totalPages: totalPages,
                loading: false,
                status: parsedData.status,
                totalResults: parsedData.totalResults
            })
        }
        else {
            this.setState({status: parsedData.status})
        }
        this.props.setProgress(100)
        
    }

    // handlePrev = async ()=>{

    //     this.updateNews(-1)

    // }

    // handleNext = async ()=>{
    //      if (this.state.totalPages>=this.state.page) {

    //      }
    //     this.updateNews(+1)
        
    // }

    fetchMoreData = async ()=>{
        this.setState({page: this.state.page + 1})
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
        })
    }
    
    render() {
        let {mode} = this.props

        return (
            <div className={`my-3 text-${mode==='dark'?'light':'dark'}`}>
                <div className="text-center my-5"><h2>News - Top Headlines - {this.cpaitalise(this.props.category)}</h2></div>
                {this.state.loading && <Spinner />}
                {!this.state.status==='ok'?<div className='mb-3 fw-bold'>Error</div>:''}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >   
                <div className="container">
                     <div className='row'>
                    {this.state.articles.map((element)=>{
                        return <div key={element.url} className="col-md-3">
                            <NewsItem title={element.title} description={!element.description?'For description read more....':element.description} imgUrl={!element.urlToImage?'https://demo.sirv.com/made-up-image-name.jpg?profile=imaginary':element.urlToImage} newsUrl={element.url} mode={mode} author={element.author} date={element.publishedAt} source={element.source.name} />
                        </div>
                    })}
                    </div>
                </div>
                </InfiniteScroll>
            </div>
        )
    }
}

export default News

