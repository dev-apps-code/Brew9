import React from 'react';
import {
  ActivityIndicator,
  TouchableWithoutFeedback,
  Image,
  View,
  StyleSheet,
} from 'react-native';
import {alpha, Colors} from '@common';
import {Analytics, Event} from 'expo-analytics';
import {ANALYTICS_ID} from '../Common/config';
import {getMemberIdForApi} from '../Services/members_helper';
import {connect} from 'react-redux';

@connect(({members}) => ({
  currentMember: members.profile,
  members: members,
}))
class BannerCell extends React.Component {
  state = {
    isLoading: true,
  };

  constructor(props) {
    super(props);
    this.onBannerCellPress = this.onBannerCellPress.bind(this);
  }

  onBannerCellPress = () => {
    const {currentMember, item, index, onPressItem} = this.props;
    const analytics = new Analytics(ANALYTICS_ID);
    const memberId = getMemberIdForApi(currentMember);
    const event = new Event('Banner', memberId, item?.description || 'banner');
    analytics.event(event);

    // call onPressItem item fromm Home
    onPressItem(item, index);
  };

  render() {
    const {item, navigation} = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.onBannerCellPress}>
        <View navigation={navigation} style={styles.bannercell}>
          {this.state.isLoading && (
            <View style={styles.loadingIndicatorContainer}>
              <ActivityIndicator size="small" />
            </View>
          )}
          <Image
            onLoadEnd={() => this.setState({isLoading: false})}
            source={{uri: item.image, cache: 'force-cache'}}
            style={styles.bannerImage}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  bannerImage: {
    backgroundColor: 'transparent',
    height: 150 * alpha,
    marginLeft: 5 * alpha,
    marginRight: 5 * alpha,
    marginTop: 5 * alpha,
    resizeMode: 'cover',
  },
  bannercell: {
    flex: 1,
    width: 150 * 2 * alpha,
  },
  loadingIndicatorContainer: {
    alignContent: 'center',
    backgroundColor: Colors.lightGray1,
    height: 150 * alpha,
    justifyContent: 'center',
    width: 300 * alpha,
  },
});

export default BannerCell;
