import React from 'react';
import axios from 'axios';
class App extends React.Component{
  state={
    title: '',
    body : '',
    posts: []
  };

  componentDidMount = () => {
    this.getBlogPost();
  }
  getBlogPost = () => {
    axios.get('/api')
          .then((response)=>{
            const data = response.data;
            this.setState({ posts:data });
            console.log('Data Received..!!!');
          })
          .catch(()=>{
            alert('Error retrieving data..!!!');
          });
  }

  handleChange = ({ target }) =>{
    const { name, value } = target;
    
    this.setState({ [name]: value });
  }

  submit=(event)=>{
    event.preventDefault();

    const payload = {
      title: this.state.title,
      body: this.state.body
    }

    axios({
      url:'/api/save',
      method:'POST',
      data: payload
    })
    .then(()=>{
      console.log('Data has been send to the Server');
      this.resetUserInputs();
      this.getBlogPost();
    })
    .catch((error)=>{
      console.log('Internal server error');
    });
  };

  resetUserInputs = () => {
    this.setState({
      title: '',
      body: ''
    });
  };

  // displayBlogPost = (posts) => {
  //   if(!posts.length) return null;

  //   posts.map((post,index) => {
  //     <div key = {index}>
  //       <h3>{post.title}</h3>
  //       <p>{post.body}</p>
  //     </div>
  //   });
  // };

  render(){
    console.log("State",this.state);
    return(
      <div>
      <h2>Welcome to my App</h2>
      <form onSubmit={this.submit}>
          <div className="form-input">
          <input
              type="text"
              name="title"
              placeholder="Title"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-input">
            <textarea
              placeholder="body" 
              name="body" 
              cols="30" 
              rows="10"
              value={this.state.body}
              onChange={this.handleChange}>
             </textarea>
          </div>
          <button>Submit</button>
        </form>
        
        
      </div>
    );
  }
}

export default App;