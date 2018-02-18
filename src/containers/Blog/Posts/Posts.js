import React, {Component} from 'react'
import axios from '../../../axios'
import { Link } from 'react-router-dom'

import Post from '../../../components/Post/Post'
import './Posts.css'


class Posts extends Component {
    state = {
        posts: []
    }
    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                console.log(response)
                const posts = response.data.slice(0, 4)
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
                })
                this.setState({posts: updatedPosts});
                // console.log(resolve)
            }).catch( error => {
                //this.setState({error: error})
            })
    }
    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id})
    }

    render(){
        let posts = <p>Something went wrong...!</p>
        if(!this.state.error){
            posts = this.state.posts.map( post => {
                return (
                        <Link to={'/' + post.id} key={post.id}>
                        <Post  
                            title={post.title} 
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)}/>
                        </Link>)
            })
        }
        return (
            <section className="Posts">
                    {posts}
            </section>
        )
    }
}

export default Posts