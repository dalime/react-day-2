const Title = React.createClass({
  render: function() {
    return (
      <div>
      <h1>Welcome to React</h1>
      </div>
    );
  }
})

const Counter = React.createClass({
  // can do inline setState like button onClick = {() => {this.setState({counter: this.state.counter + 1})}}
  render: function() {
    let {counter, addCount, minusCount} = this.props; // uses spread operator
    //let {counter, addCount, minusCount} = this.props.allProps; //allProps is object from Root component below, uses destructuring object

    return ( //parenthesis are here so we can split the JSX into multiple lines
      <div>
        <h3>Counter: {counter}</h3>
        <button onClick={addCount}>+</button>
        <button onClick={minusCount}>-</button>
      </div>
    )
  }
})

const NewMessageForm = React.createClass({
  addMessage: function() {
    this.props.addMessage('hiya!');
  },
  render: function() {
    return(
      <div>
        <input type="text"/>
        <button onClick={this.addMessage}>Add</button>
      </div>
    )
  }
});

const MessageList = React.createClass({
  render: function() {
    let messages = this.props.messages.map(message => {
      return <li key={message.id}>{message.text}</li>
    });

    return (
      <ul>
        {messages}
      </ul>
    )
  }
})

const MessageBoard = React.createClass({
  getInitialState: function() {
    return {
      messages: []
  };
  },
  addMessage: function(text) { //takes message text as argument
    //need to create message object
    let message = {
      text,
      id: uuid()
    };
    console.log('message: ', message);
    // need to add to messages array

    this.setState({
      messages: this.state.messages.concat(message)
    })

  },
  render: function() {
    return (
      <div>
        <h1>MessageBoard</h1>
        <NewMessageForm addMessage={this.addMessage}/>
        <MessageList messages={this.state.messages}/>
      </div>
    )
  }
})

// props is way to give a child component a way to interact with parent's state (in this case Root)
const Root = React.createClass({ //createClass creates a new component
  getInitialState: function() { //get initial states of states
    return { // object with state in it
      counter: 0
    }
  },
  addCount: function() {
    this.setState({counter: this.state.counter + 1}) //This is now talking about the root
  },
  minusCount: function() {
    this.setState({counter: this.state.counter - 1})
  },
  render: function() {
    let propObj = {
      addCount: this.addCount,
      minusCount: this.minusCount,
      counter: this.state.counter
    }

    return ( // Title below is Title class from above
      <div>
        <Title />
        <Counter {... propObj} />
        {/*<Counter addCount={this.addCount} minusCount={this.minusCount} counter={this.state.counter} />*/}
        <hr/>
        <MessageBoard />
      </div>
    )
  }
});
//<Counter allProps = {this.propObj} /> // To use destructuring
ReactDOM.render(
  <Root />, //what to render
  document.getElementById('root') //where to render
);
