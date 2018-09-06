import React from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import TodoElement from "./components/TodoElement";
import {Header, Button, Icon} from 'react-native-elements';
import { Dimensions } from "react-native";

let width = Dimensions.get('window').width;

export default class App extends React.Component {
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
            
            <TodoElement text="Finish my class" finished={true}/>
            <TodoElement text="Finish another thing" finished={false}/>
            <TodoElement text="woooo" finished={false}/>
            
            <View style={styles.input}>
              <Icon name="note-add" />  
              <TextInput 
                style={styles.textInput}
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
