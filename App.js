import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import TodoElement from "./components/TodoElement";
import {Header, Button, Icon} from 'react-native-elements';
import { Dimensions } from "react-native";
import { AsyncStorage } from "react-native"

let width = Dimensions.get('window').width;

export default class App extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        input: '',
        tasks: [],
        counter: 0
      }
  }

  handleSubmit = (text) => {
    let tasks = this.state.tasks;
    let newCounter = this.state.counter + 1;
    tasks.push({
      text: this.state.text,
      finished: false,
      id: this.state.counter
    })

    this.setState({
        tasks: tasks,
        text: '',
        counter: newCounter
    });
    this.setData();
  }

  deleteTask = (id) => {
    let index = this.state.tasks.findIndex(item => item.id == id);
    let newTasks = this.state.tasks;
    if(index !== -1)
      newTasks.splice(index, 1);
    this.setState({tasks: newTasks});
    this.setData();
  }

  changeChecked = (id) => {
    let index = this.state.tasks.findIndex(item => item.id == id);
    let newTasks = this.state.tasks;
    if (newTasks[index].finished == false) {
      newTasks[index].finished = true;
    } else {
      newTasks[index].finished = false;
    }
    this.setState({tasks: newTasks});
    this.setData();
  }

  setData = async () => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(this.state.tasks));
      await AsyncStorage.setItem('counter', String(this.state.counter));
    } catch (error) {
      console.log(error);
    }

  }
  
  getData = async () => {
    try {
      await AsyncStorage.getItem('tasks').then((tasks) => {
        console.log(tasks);
        if(tasks == null)
          tasks = [];
        this.setState({tasks: JSON.parse(tasks)});
      });
      await AsyncStorage.getItem('counter').then((counter) => {
        if(counter == null)
          counter = 0;
        this.setState({counter: counter});
      });

    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount(){
    function setTasksAndCounter(tasks, counter){
        this.setState({
          tasks: tasks,
          counter: counter
        });
    }
    this.getData(setTasksAndCounter);
  }


  render() {
    return (
      <View style={styles.container}>
        <Header
        centerComponent={{ text: "To do list!", style: {color: 'white'} }}
        innerContainerStyles={styles.header}
        />
        <ScrollView style={styles.todoList}>
          <KeyboardAvoidingView style={{ flex: 1 }}
                  keyboardVerticalOffset={100} behavior={"position"}>
            {
              this.state.tasks.map(item => {
                  return(
                    <TodoElement 
                    text={item.text} 
                    checked={item.finished} 
                    key={item.id}
                    id={item.id}
                    deleteFunction = {this.deleteTask}
                    changeCheckedFunction = {this.changeChecked}
                    />
                  )

              })
            }
            
            
            <Text>{this.state.text}</Text>
            <View style={styles.input}>
              <Icon name="note-add" />  
              
              <TextInput
                ref={(input) => { this.textInput = input }} 
                style={styles.textInput}
                onChangeText={(text) => this.setState({text: text})}
                onSubmitEditing={this.handleSubmit}
                blurOnSubmit
                clearTextOnFocus
                returnKeyType='done'
                returnKeyLabel='done'
                clearButtonMode="always"
              />
              
            </View>

          </KeyboardAvoidingView>
        </ScrollView>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: width
  },
  header: {
    width: width
  },
  todoList: {
    width: width*0.9
  },
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textInput: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    width: width*0.8,
    marginBottom: 10
  }
});
