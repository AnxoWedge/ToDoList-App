import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      task_array:[],
      task_add: "",
      task_date:"" ,
      task_time:"",
      task_state:"",
      saving_msg:"",
      task_edit: false,
    }
  this.submitHandler=this.submitHandler.bind(this);
  this.handleAddition=this.handleAddition.bind(this);
  }

//============ React Life Cycle Functions =============

componentWillMount(){
  this.getLocalData()
}

componentWillReceiveProps(){
  this.editit()
}

shouldComponentUpdate(){
  return true
}

//============ JSON FUNCTION DATA SAVING ==============
setLocalData(task_array){
  this.setState({saving_msg:"Please hold while we process your data"})
  localStorage.setItem("task_array",JSON.stringify(task_array))
  setTimeout(()=>{
    this.setState({saving_msg:" "})
  }, 2500)
}

getLocalData(){
  let task_array = localStorage.getItem('task_array')
  if(task_array===null){
    task_array=[];
  }
  else{
    task_array=JSON.parse(task_array)
  }
  this.setState({task_array})
}

//================= Handler Functions =================
submitHandler(e){
  e.preventDefault();
  if(this.state.task_add !==""){
    this.state.task_array.push({
      text:this.state.task_add,
      state:this.state.task_state === "not_done" ? true : false,
      date: {
        date:this.state.task_date,
        time:this.state.task_time,
      },
    });
    this.setState({
      task_array: this.state.task_array, 
      task_add:"",
      task_date:"", 
    });
    this.setLocalData(this.state.task_array)
  }
  else{
    alert("to change");
  }
  this.setLocalData(this.state.task_array)
}

handleAddition(e){
  this.setState({
    [e.target.name]: [e.target.value],
  });
}

removeit(task_Index, e){
  this.state.task_array.splice(task_Index, 1);
  this.setState({
    task_array: this.state.task_array,
  })


}

editit(task_Index,e){
  this.setState({
    task_editmode: this.state.task_editmode === task_Index ? null : task_Index,
  })


}

handleTaskChange(task_Index,e){
  if(e.target.name==="task_add"){
    this.state.task_array[task_Index].text=e.target.value;
  }
  else if(e.target.name=== "task_time"){
    this.state.task_array[task_Index].date.time=e.target.value;
  }
  else if(e.target.name==="task_date"){
    this.state.task_array[task_Index].date.date=e.target.value;
  }

  this.setState({
    task_array: this.state.task_array,
  })

  this.setLocalData(this.state.task_array)

}

doneit(task_Index,e){
  this.state.task_array[task_Index].state = !this.state.task_array[task_Index].state
  this.setState({
    task_array: this.state.task_array,
  })

  this.setLocalData(this.state.task_array)
}


//================= Render Functions =================

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <p className="App-intro">
          O que pretende fazer hoje? 
        </p>

        <div className="list">
        <ul>
          {this.state.task_array.map((item, index)=>{
            return(
              
              <li key= {"task" + index} className={item.state ? "notdone" : "done"}>
              <button onClick={this.doneit.bind(this,index)}>{item.state ? "Feito?" : "Feito!"}</button>
              {this.state.task_editmode === index ? 
              <form>
                <input type="text" name="task_add" value={item.text} onChange={this.handleTaskChange.bind(this, index)}/>
                <input type="time" name="task_time" value={item.date.time} onChange={this.handleTaskChange.bind(this, index)}/>
                <input type="date" name="task_date" value={item.date.date} onChange={this.handleTaskChange.bind(this, index)}/>
                </form>
                : <span>{item.text} às {item.date.time} no dia {item.date.date}</span>
                }
              
              <button onClick={this.editit.bind(this,index)}>Editar</button>
              <button onClick={this.removeit.bind(this,index)}>Remover</button>
              </li>
            
              ) 
          })}
          </ul>
        <div className="clicky_buttons">
        <form onSubmit={this.submitHandler}> 
          <input type="text" name="task_add" value={this.state.task_add} onChange={this.handleAddition}/>
          <input type="time" name="task_time" value={this.state.task_date.time} onChange={this.handleAddition}/>
          <input type="date" name="task_date" value={this.state.task_date.date} onChange={this.handleAddition}/>
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
