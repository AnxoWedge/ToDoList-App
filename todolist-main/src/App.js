import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      task_array:[],
      task_add: "",
      task_state:"",
      saving_msg:"",
      task_edit:"",
    }
  this.submitHandler=this.submitHandler.bind(this);
  this.handleAddition=this.handleAddition.bind(this);
  
  
  }


submitHandler(e){
  e.preventDefault();
  if(this.state.task_add !==""){
    this.state.task_array.push({
      text:this.state.task_add,
      state:this.state.task_state ==="not_done" ? true : false,
    });
    this.setState({
      task_array: this.state.task_array, 
      task_add:""
    });
  }
  else{
    alert("to change");
  }
}

handleAddition(e){
  this.setState({
    [e.target.name]: [e.target.value]
  });
}




  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <div className="list">
        <ul>
        {this.state.task_array.map((item, index)=>{
          return( 
            <li key= {"task" + index}>{item.text}</li>
          
          
          )
        })}</ul>

        <div className="clicky_buttons">
        <form onSubmit={this.submitHandler}> 
          <input  type="text" name="task_add" value={this.state.task_add} onChange={this.handleAddition}/>
          <select name="task_state" value={this.state.task_state} onChange={this.handleAddition}>
          <option value="done">completo</option>
          <option value="not_done">incompleto</option>
          </select>
          <button>Inserir</button>
        </form>
        <p>{this.state.task_add}</p>  
        </div>
        </div>
      </div>
    );
  }
}

export default App;
