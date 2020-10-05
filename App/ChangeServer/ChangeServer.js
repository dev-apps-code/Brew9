import React from 'react';
import styles from './styles';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  View,
  AsyncStorage,
} from 'react-native';
import {
  SERVERS,
  PROTOCOLS,
  FAILED_ERROR_MESSAGE,
  TIMEOUT_SECONDS,
} from '../Constants';
import Modal from 'react-native-modal';
import {StackActions, NavigationActions} from '../Utils';

class ChangeServer extends React.Component {
  state = {
    loading: false,
    cancelled: false,
  };

  timeout(ms, promise) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('timeout'));
      }, ms);
      promise.then(
        (res) => {
          clearTimeout(timeoutId);
          resolve(res);
        },
        (err) => {
          clearTimeout(timeoutId);
          reject(err);
        },
      );
    });
  }

  onPressServer = async (server, protocol) => {
    this.setState({loading: true, cancelled: false, hasFailed: false});

    let hasFailed = false;
    let server_string = `${protocol}${server}/admin/login`;

    this.timeout(TIMEOUT_SECONDS * 1000, fetch(server_string))
      .then(({status}) => {
        if (status === 200) {
          if (this.state.cancelled === false) {
            return Promise.all([
              AsyncStorage.setItem('selected_server_url', server),
              AsyncStorage.setItem('selected_server_protocol', protocol),
            ]);
          }
        }
      })
      .then(() => {
        if (!hasFailed) {
          this.redirect();
        }
      })
      .catch(() => this.setState({hasFailed: true}));
  };

  redirect() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'VerifyUserStack'})],
    });
    this.props.navigation.dispatch(resetAction);
  }

  renderServerList() {
    const items = SERVERS.map((server, serverIndex) =>
      PROTOCOLS.map((protocol, protocolIndex) => {
        let serverText = `${protocol}${server}`;
        return (
          <TouchableOpacity
            key={`server-${serverIndex}-${protocolIndex}`}
            onPress={() => this.onPressServer(server, protocol)}
            style={styles.button}>
            <Text style={styles.text}>{serverText}</Text>
          </TouchableOpacity>
        );
      }),
    );

    return items;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.selectServerText}>Select Server</Text>
          {this.renderServerList()}
          <Modal
            animationIn="fadeIn"
            animationOut="slideOutDown"
            hideModalContentWhileAnimating={true}
            isVisible={this.state.loading}>
            <View style={styles.loading}>
              {this.state.hasFailed ? (
                <Text style={styles.text}>{FAILED_ERROR_MESSAGE}</Text>
              ) : (
                <>
                  <ActivityIndicator
                    color="white"
                    size="large"
                    style={styles.loadingIndicator}
                  />
                  <Text style={styles.text}>Checking Server</Text>
                </>
              )}

              <TouchableOpacity
                onPress={() => this.setState({loading: false, cancelled: true})}
                style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default ChangeServer;
