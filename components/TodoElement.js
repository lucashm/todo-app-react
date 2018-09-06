import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Icon } from 'react-native-elements'


export default class TodoElement extends React.Component {
  constructor(props){
      super(props);
  }
  
  render() {
    return (
      <View style={styles.container}>
        <CheckBox 
            checked={this.props.checked}
            title={this.props.text}
            checkedIcon='dot-circle-o'
            uncheckedIcon='circle-o'
            onPress={() => this.props.changeCheckedFunction(this.props.id)}
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
});
