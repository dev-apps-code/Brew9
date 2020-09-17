//
//  PointProductCell
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';
import React from 'react';
import {alpha, fontAlpha, windowHeight, windowWidth} from '../Common/size';
import {TITLE_FONT, NON_TITLE_FONT} from '../Common/common_style';
import {Analytics, Event, PageHit} from 'expo-analytics';
import {ANALYTICS_ID} from '../Common/config';
import {getMemberIdForApi} from '../Services/members_helper';
import {connect} from 'react-redux';

@connect(({members}) => ({
  company_id: members.company_id,
  members: members,
  currentMember: members.profile,
}))
export default class PointProductCell extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  onPointProductCellPress = (item, item_name) => {
    const {navigate} = this.props.navigation;

    const analytics = new Analytics(ANALYTICS_ID);
    analytics.event(
      new Event(
        'Redemption Product',
        getMemberIdForApi(this.props.currentMember),
        `${item_name}`,
      ),
    );
    this.props.onPressItem(item, item_name);
  };

  onViewMorePressed = (plan_id, title) => {
    const {navigate} = this.props.navigation;
    navigate('PointShopFullList', {
      plan_id: plan_id,
      title: title,
    });
  };

  render() {
    const {sectionId, sectionHeader, item} = this.props;

    // return (
    //   <TouchableWithoutFeedback
    //     navigation={this.props.navigation}
    //     style={styles.pointproductcell}
    //     onPress={() => this.onPointProductCellPress(item, item.name)}>
    //     {/* <View style={styles.itemView}> */}
    //       <Image source={{uri: item.image}} style={styles.imageImage} />
    //       <View style={styles.viewView}>
    //         <Text style={styles.titleText}>{item.name}</Text>
    //         <View
    //           pointerEvents="box-none"
    //           style={{
    //             width: 78 * alpha,
    //             height: 22 * alpha,
    //             marginLeft: 13 * alpha,
    //             flexDirection: 'row',
    //             alignItems: 'flex-start',
    //           }}>
    //           <Text style={styles.valueText}>
    //             {item.points} <Text style={styles.pointsText}>Points</Text>
    //           </Text>
    //         </View>
    //       </View>
    //     {/* </View> */}
    //   </TouchableWithoutFeedback>
    // );

    return (
      <TouchableOpacity
        navigation={this.props.navigation}
        style={styles.pointproductcell}
        onPress={() => this.onPointProductCellPress(item, item.name)}
        style={styles.itemContainer}>
        <Image source={{uri: item.image}} style={styles.imageImage} />
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.name}>
          {item.name}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.points}>{item.points}</Text>
          <Text style={styles.pointsLabel}>Points</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    width: windowWidth * 0.5,
    height: windowHeight * 0.25,
    backgroundColor: '#FFFFFF',
  },
  name: {
    color: 'black',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    marginLeft: 13 * alpha,
    marginTop: 10 * alpha,
    marginBottom: 3 * alpha,
  },

  points: {
    color: 'rgb(0, 178, 227)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    marginLeft: 13 * alpha,
  },

  pointsLabel: {
    color: 'rgb(142, 142, 142)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    marginLeft: 3 * alpha,
  },

  pointproductcell: {
    backgroundColor: '#FFFFFF',
    width: '50%',
    marginBottom: alpha * 10,
  },
  headerView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0 * alpha,
    right: 0 * alpha,
    top: 0 * alpha,
    height: 40 * alpha,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemBlockView: {
    backgroundColor: 'transparent',
    flex: 1,
    height: 160 * alpha,
    // top: 40 * alpha,
    flexWrap: 'wrap',
  },
  itemBlockView2: {
    backgroundColor: 'transparent',
    flex: 1,
    height: 320 * alpha,
    marginTop: 20 * alpha,
    flexWrap: 'wrap',
  },
  sectionheadertitleText: {
    color: 'rgb(0, 178, 227)',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent',
    marginLeft: 10 * alpha,
  },
  viewmoreButtonText: {
    color: 'rgb(164, 164, 164)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },
  viewmoreButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    alignSelf: 'flex-start',
    width: 95 * alpha,
    height: 40 * alpha,
  },
  viewmoreButtonImage: {
    tintColor: 'rgb(164, 164, 164)',
    resizeMode: 'contain',
    width: 10 * alpha,
    marginLeft: 5 * alpha,
  },
  itemView: {
    width: '50%',
    alignItems: 'center',
  },
  imageImage: {
    resizeMode: 'contain',
    backgroundColor: 'transparent',
    width: '100%',
    height: 100 * alpha,
  },
  viewView: {
    backgroundColor: 'transparent',
    width: '100%',
    height: 60 * alpha,
    alignItems: 'flex-start',
  },
  titleText: {
    backgroundColor: 'transparent',
    color: 'black',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    marginLeft: 13 * alpha,
    marginTop: 10 * alpha,
  },
  valueText: {
    backgroundColor: 'transparent',
    color: 'rgb(0, 178, 227)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    marginTop: 3 * alpha,
  },
  pointsText: {
    backgroundColor: 'transparent',
    color: 'rgb(142, 142, 142)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    marginLeft: 3 * alpha,
  },
});
