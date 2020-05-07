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
import { SERVERS, PROTOCOLS } from '../Constants/server_list';
import Modal from 'react-native-modal';
import { Storage } from '../Utils';
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
    console.log('loading');
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
          this.setState({ loading: false, hasFailed: false, cancelled: false });
        }
      });
  };

  _renderServerList() {
    const items = SERVERS.map((server, serverIndex) =>
      PROTOCOLS.map((protocol, protocolIndex) => {
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
