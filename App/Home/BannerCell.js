import React from 'react';
import {
  TouchableWithoutFeedback,
  Image,
  View,
  StyleSheet
} from 'react-native';
import { alpha } from '../Common/size';
import { Analytics, Event } from 'expo-analytics';
import { ANALYTICS_ID } from '../Common/config';
import { getMemberIdForApi } from '../Services/members_helper';
import { connect } from 'react-redux';

@connect(({ members }) => ({
  currentMember: members.profile,
  members: members
}))
export default class BannerCell extends React.Component {
  constructor(props) {
    super(props);
  }

  onBannerCellPress = () => {
    const { currentMember, item, index, onPressItem } = this.props;
    const analytics = new Analytics(ANALYTICS_ID);
    const memberId = getMemberIdForApi(currentMember);
    const event = new Event('Banner', memberId, item?.description || 'banner');
    analytics.event(event);

    // call onPressItem item fromm Home
    onPressItem(item, index);
  };

  render() {
    const { item, navigation } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.onBannerCellPress.bind(this)}>
        <View navigation={navigation} style={styles.bannercell}>
          <Image source={{ uri: item.image }} style={styles.bannerImage} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  bannercell: {
    backgroundColor: 'transparent',
    width: 150 * 2 * alpha,
    flex: 1
  },
  bannerImage: {
    backgroundColor: 'transparent',
    resizeMode: 'cover',
    height: 150 * alpha,
    marginLeft: 5 * alpha,
    marginRight: 5 * alpha,
    marginTop: 5 * alpha
  }
});
