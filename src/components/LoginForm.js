import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, signOut } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { checkUserLoggedIn } from '../actions';

class LoginForm extends Component {

  componentDidMount() {
    if (this.props.logout) {
      this.props.signOut();
    } else {
      this.props.checkUserLoggedIn();
    }
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={styles.errorTextBackground} >
          <Text style={styles.errorTextStyle} >
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  renderInputs() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
            keyboardType="email-address"
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>
      </Card>
    );
  }

  render() {
    return (
      <View>

        {this.renderInputs()}

        <Card>

          {this.renderError()}

          <CardSection>
            {this.renderButton()}
          </CardSection>

        </Card>
      </View>
    );
  }
}

const styles = {
  errorTextBackground: {
    backgroundColor: 'white',
    paddingTop: 15,
    paddingBottom: 15
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

const mapStateToProps = ({ authReducer }) => {
  const { email, password, error, loading } = authReducer;

  return { email, password, error, loading };
}

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, checkUserLoggedIn, signOut
}) (LoginForm);
