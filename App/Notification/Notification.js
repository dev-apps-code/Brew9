//
//  MemberWallet
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  AppState
} from "react-native";
import React from "react";
import { alpha, fontAlpha } from "../Common/size";
import { connect } from "react-redux";
import { createAction } from "../Utils";
import NotificationsRequestObject from "../Requests/notifications_request_object";
import NotificationsCell from "./NotificationsCell";
import NotificationBadgeIcon from "./NotificationBadgeIcon"
import * as SecureStore from "expo-secure-store";
import { TITLE_FONT, NON_TITLE_FONT, TABBAR_INACTIVE_TINT, TABBAR_ACTIVE_TINT, PRIMARY_COLOR } from "../Common/common_style";
import IconBadge from 'react-native-icon-badge';
import { AsyncStorage } from 'react-native'

@connect(({ members }) => ({
  members: members.profile
}))

export default class Notification extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: "Notification",
      headerTintColor: "black",
      headerTitleStyle: {
        textAlign: "center",
        flex: 1
      },
      headerRight: null,
      headerLeft: null
    };
  };

  static tabBarItemOptions = (navigation,store ) => {
    const badgeCount = navigation.state.params && navigation.state.params.badgeCount || 0
    return {
      tabBarLabel: "Inbox",
      tabBarOnPress: ({ navigation, defaultHandler }) => {
        store.dispatch(createAction("config/setToggleShopLocation")(false))
        store.dispatch(createAction("config/setTab")("notification"))
        defaultHandler()
			},
      tabBarIcon: ({ iconTintColor, focused }) => {
        const image = focused
          ? require("./../../assets/images/inbox_selected_tab.png")
          : require("./../../assets/images/inbox_tab.png");

        return (
          <View style={styles.tabIconWrapper}>
            
            <NotificationBadgeIcon image={image} focused={focused}/>
            
        </View>
          
        );
      }
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      unread: 0,
      isRefreshing: false,
      last_read: 0,
      timestamp: undefined,
      appState: AppState.currentState,
    };
    
  }

  componentDidMount() {
    // this.loadLocalStore();
    const { members } = this.props;
    AppState.addEventListener('change', this._handleAppStateChange);	
    if (members != null) {
      this.props.navigation.addListener('didFocus', this.loadNotifications)
    
      // this.props.navigation.addListener('didFocus', this.loadNotifications())
      // this.loadNotifications();
    }

    this.props.navigation.setParams({
      onBackPressed: this.onBackPressed,
      onItemPressed: this.onItemPressed,
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    const { members } = this.props;
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      if (members != null) {
        this.loadNotifications();
      }
    }
    this.setState({appState: nextAppState});
  };

  loadNotifications = () => {
        
    const {timestamp} =  this.state

    if (timestamp != undefined) {
       const date = new Date()
       const diff = date.getTime() - timestamp
       if (diff < 10000){
         this.setState({
          isRefreshing: false
         })
        return false;
       }
    }

    const { dispatch, members } = this.props;
    this.setState({ loading: true });
    const callback = eventObject => {
      console.log("Nothific")
      if (eventObject.success) {
        this.loadLocalStore(eventObject.result)
      }
      this.setState({
        loading: false,
        isRefreshing: false
      });
    };
    const obj = new NotificationsRequestObject();
    obj.setUrlId(members.id);
    dispatch(
      createAction("members/loadNotifications")({
        object: obj,
        callback
      })
    );
  }

  onRefresh() {
    
    this.setState({
        isRefreshing: true,
    })
    this.loadNotifications()
  }

  loadLocalStore(notifications) {

    const date = new Date()
    this.setState({timestamp:date.getTime()})
    return AsyncStorage.getItem("notification_key", (err, result) => {
      let data = notifications
      let unread= 0
       
      if (result != null) {
       for(var index in data) {
         let item = data[index]
         let read = item.id <= result ? true : false   
         data[index].read = read
         if (read == false){
           unread = unread + 1
         }
       }
       this.setState({
         data,
         unread: unread,
         last_read: result
       });
      } else {
        this.setState({
          last_read: 0,
          unread: data.length,
          data,
        });
      }
    })
  }

  onBackPressed = () => {
    this.props.navigation.goBack();
  };

  renderPointhistoryFlatListCell = ({ item }) => {
    return (
      <NotificationsCell
        navigation={this.props.navigation}
        item={item}
        id={item.id}
        title={item.title}
        text={item.text}
        time={item.created_at}
        type={item.notification_type}
        read={item.read}
      />
    );
  };

  onReadAllPressed = () => {

    const { data} = this.state
    const { dispatch } = this.props
    if (data.length > 0){
      let data = [...this.state.data]
      for(var index in data) {
        data[index].read = true
      }

      const last_read = data[0].id

      this.setState({data,unread:0})
      AsyncStorage.setItem("notification_key", JSON.stringify(last_read))
      
    }
    dispatch(createAction('members/reloadNotifications')({}))
  };

  render() {
    return (
      <View style={styles.notificationView}>
        <View style={styles.contentView}>
          <View style={styles.noticeView}>
            <Text style={styles.noticeText}>
              You have {this.state.unread} unread notifications
            </Text>
            <View
              style={{
                flex: 1
              }}
            />
            {this.state.unread > 0 ? (
              <TouchableOpacity
                onPress={this.onReadAllPressed}
                style={styles.readallButton}
              >
                <Text style={styles.readallButtonText}>Read All</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={styles.pointhistoryFlatListViewWrapper}>
            {this.state.loading ? (
              <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" />
              </View>
            ) : !this.state.loading && this.state.data.length > 0 ? (
              <FlatList
                renderItem={this.renderPointhistoryFlatListCell}
                data={this.state.data}
                style={styles.pointhistoryFlatList}
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh.bind(this)}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : (
              <View style={styles.blankView}>
                <Text style={styles.noLabelText}>No Notifications</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: "row",
    marginLeft: 8 * alpha,
    width: 70 * alpha
  },
  navigationBarItem: {
    width: "100%"
  },
  navigationBarItemTitle: {
    color: "black",
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha
  },
  navigationBarItemIcon: {
    width: 18 * alpha,
    height: 18 * alpha,
    tintColor: "black"
  },
  notificationView: {
    backgroundColor: "white",
    flex: 1
  },
  contentView: {
    backgroundColor: "transparent",
    flex: 1,
    alignItems: "flex-start"
  },
  noticeView: {
    backgroundColor: "rgb(245, 247, 246)",
    width: 375 * alpha,
    height: 51 * alpha,
    flexDirection: "row",
    alignItems: "center"
  },
  noticeText: {
    backgroundColor: "transparent",
    color: "rgb(107, 109, 108)",
    fontFamily: TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left",
    marginLeft: 20 * alpha
  },
  readallButton: {
    backgroundColor: "white",
    borderRadius: 13 * alpha,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    width: 90 * alpha,
    height: 26 * alpha,
    marginRight: 20 * alpha
  },
  readallButtonText: {
    color: "rgb(107, 109, 108)",
    fontFamily: NON_TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "left"
  },
  readallButtonImage: {
    resizeMode: "contain",
    marginRight: 10 * alpha
  },
  pointhistoryFlatList: {
    backgroundColor: "white",
    width: "100%",
    height: "100%"
  },
  pointhistoryFlatListViewWrapper: {
    flex: 1,
    alignSelf: "stretch",
    marginRight: 1
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10 * alpha
  },
  blankView: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  noLabelText: {
    color: "rgb(149, 149, 149)",
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    textAlign: "center",
    backgroundColor: "transparent"
  }
});
