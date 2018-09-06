import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableHighlight, TextInput, Dimensions } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Icon } from 'react-native-elements';

let width = Dimensions.get('window').width;


export default class TodoElement extends React.Component {
  constructor(props){
      super(props);
      this.state = { 
        modalVisible: false,
        editText: ''
        }
  }

    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

    handleSubmit(edit){
      edit(this.props.id, this.state.editText);
      this.setModalVisible(!this.state.modalVisible);
    }
  
  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Edit Task</Text>
              <TextInput
                ref={(input) => { this.textInput = input }} 
                style={styles.textInput}
                onChangeText={(text) => this.setState({editText: text})}
                onSubmitEditing={() => this.handleSubmit(this.props.editTaskFunction)}
                blurOnSubmit
                clearTextOnFocus
                returnKeyType='done'
                returnKeyLabel='done'
                clearButtonMode="always"
              />
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <CheckBox 
            checked={this.props.checked}
            title={this.props.text}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={() => this.props.changeCheckedFunction(this.props.id)}
            onLongPress={() => this.setModalVisible(true)}

            />
          <Icon 
            name="delete"
            onPress={() => this.props.deleteFunction(this.props.id)}
          />
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    height: 40,
    borderColor: 'black',
    borderWidth: 1,
    width: width*0.8,
    marginBottom: 10
  }
});
