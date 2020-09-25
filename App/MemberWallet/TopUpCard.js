//
//  Card
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {
  Text,
  Image,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {alpha, fontAlpha, windowWidth} from '../Common/size';
import {TITLE_FONT, NON_TITLE_FONT} from '../Common/common_style';
import {Analytics, Event, PageHit} from 'expo-analytics';
import {ANALYTICS_ID} from '../Common/config';
import {getMemberIdForApi} from '../Services/members_helper';
import {connect} from 'react-redux';

@connect(({members}) => ({
  currentMember: members.profile,
  members: members,
}))
export default class TopUpCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null,
    };
  }

  componentDidMount() {}

  onCardPress = () => {
    const analytics = new Analytics(ANALYTICS_ID);
    analytics.event(
      new Event(
        'Wallet Top Up',
        getMemberIdForApi(this.props.members),
        this.props.price,
      ),
    );
    this.props.onPressItem(this.props.item, this.props.index);
    this.setState({
      selected: this.props.selected,
    });
  };

  renderPromotion = () => {
    const {promotion} = this.props;
    return promotion ? (
      <View style={styles.tag}>
        <Text style={styles.tagText}>{promotion}</Text>
      </View>
    ) : null;
  };

  render() {
    const {image, promotion} = this.props;
    const promotionText = promotion ? promotionText : console.log(this.props);
    return (
      <TouchableWithoutFeedback onPress={this.onCardPress}>
        <View navigation={this.props.navigation} style={styles.cardcell}>
          <Image source={{uri: image}} style={styles.cardImage} />
          {this.renderPromotion()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  cardcell: {
    width: windowWidth / 2,
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10 * alpha,
    paddingBottom: 10 * alpha,
    paddingRight: 10 * alpha,
    marginBottom: 10 * alpha,
  },
  cardImage: {
    backgroundColor: 'transparent',
    resizeMode: 'contain',
    alignSelf: 'center',
    width: '100%',
    height: 100 * alpha,
  },
  infoView: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    width: '100%',
    height: 39 * alpha,
  },
  backgroundImage: {
    resizeMode: 'cover',
    backgroundColor: 'transparent',
    width: null,
    height: 39 * alpha,
  },
  valueText: {
    backgroundColor: 'transparent',
    color: 'rgb(59, 59, 59)',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },
  selectView: {
    backgroundColor: 'transparent',
    borderRadius: 8.5 * alpha,
    borderWidth: 1,
    borderColor: 'rgb(219, 219, 219)',
    borderStyle: 'solid',
    width: 17 * alpha,
    height: 17 * alpha,
  },
  selectView_selected: {
    backgroundColor: 'rgb(0, 178, 227)',
    borderRadius: 8.5 * alpha,
    borderWidth: 1,
    borderColor: 'rgb(219, 219, 219)',
    borderStyle: 'solid',
    width: 17 * alpha,
    height: 17 * alpha,
  },

  tag: {
    borderRadius: alpha * 10,
    backgroundColor: '#ED6E69',
    position: 'absolute',
    bottom: alpha * 4,
    right: 1,
    paddingHorizontal: alpha * 7,
    paddingVertical: alpha * 2,
    marginRight: alpha * 5,
  },

  tagText: {
    fontFamily: NON_TITLE_FONT,
    fontSize: 10 * fontAlpha,
    color: '#FFFFFF',
  },
});
