import React from 'react';
import styles from './styles';
import {
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  View,
  AsyncStorage
} from 'react-native';
// import { SERVERS, PROTOCOLS } from '../Constants/server_list';
import * as SERVERS from '../Constants/servers.json';
import Modal from 'react-native-modal';
import { StackActions, NavigationActions } from '../Utils';
import { loadServer } from '../Utils/server';

const FAILED_ERROR_MESSAGE =
  'Failed to change server. Please select a different one.';

class ChangeServer extends React.Component {
  state = {
    loading: false,
    cancelled: false
  };

  timeout(ms, promise) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        reject(new Error('timeout'));
      }, ms);
      promise.then(resolve, reject);
    });
  }

  _changeServer = async (server, protocol) => {
    this.setState({ loading: true, cancelled: false, hasFailed: false });

    let hasFailed = false;
    let server_string = `${protocol}${server}/admin/login`;

    this.timeout(5000, fetch(server_string))
      .then((response) => {
        if (response.status == 200) {
          if (!this.state.cancelled) {
            return Promise.all([
              AsyncStorage.clear(),
              AsyncStorage.setItem('selected_server_url', server),
              AsyncStorage.setItem('selected_server_protocol', protocol)
            ]);
          }
        } else {
          hasFailed = true;
        }
      })
      .then(() => {
        if (hasFailed == false) {
          return Promise.all(loadServer());
        }
      })
      .catch((error) => (hasFailed = true))
      .finally(() => {
        this.setState({ hasFailed });
        if (!hasFailed) {
          this.setState(
            { loading: false, hasFailed: false, cancelled: false },
            () => {
              this.redirect();
            }
          );
        }
      });
  };

  redirect() {
    console.log('---redirecting---');
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'VerifyUserStack' })]
    });
    this.props.navigation.dispatch(resetAction);
  }

  _renderServerList() {
    const items = SERVERS.servers.map((server, serverIndex) =>
      SERVERS.protocols.map((protocol, protocolIndex) => {
        let serverText = `${protocol}${server}`;
        return (
          <TouchableOpacity
            key={`server-${serverIndex}-${protocolIndex}`}
            style={styles.button}
            onPress={this._changeServer.bind(this, server, protocol)}
          >
            <Text style={styles.text}>{serverText}</Text>
          </TouchableOpacity>
        );
      })
    );

    return items;
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.selectServerText}>Select Server</Text>
          {this._renderServerList()}
          <Modal
            isVisible={this.state.loading}
            hideModalContentWhileAnimating={true}
            animationIn="fadeIn"
            animationOut="slideOutDown"
          >
            <View style={styles.loading}>
              {this.state.hasFailed ? (
                <Text style={styles.text}>{FAILED_ERROR_MESSAGE}</Text>
              ) : (
                <>
                  <ActivityIndicator
                    size="large"
                    color="white"
                    style={{ marginBottom: 20 }}
                  />
                  <Text style={styles.text}>Checking Server</Text>
                </>
              )}

              <TouchableOpacity
                onPress={() =>
                  this.setState({ loading: false, cancelled: true })
                }
                style={styles.cancelButton}
              >
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
