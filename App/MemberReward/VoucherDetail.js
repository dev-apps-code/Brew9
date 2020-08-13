//
//  MemberReward
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { alpha, fontAlpha } from '../Common/size';
import { connect } from 'react-redux';
import UsedVoucher from './UsedVoucher';
import ExpiredVoucher from './ExpiredVoucher';
import ValidVoucher from './ValidVoucher';
import { KURL_INFO } from '../Utils/server';
import { TITLE_FONT, NON_TITLE_FONT } from '../Common/common_style';

@connect(({ members }) => ({
  members: members.profile,
  company_id: members.company_id
}))
export default class VoucherDetail extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <Text
          style={{
            textAlign: 'center',
            alignSelf: 'center',
            fontFamily: TITLE_FONT
          }}
        >
          Voucher
        </Text>
      ),
      headerTintColor: 'black',
      headerLeft: (
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity
            onPress={params.onBackPressed ? params.onBackPressed : () => null}
            style={styles.navigationBarItem}
          >
            <Image
              source={require('./../../assets/images/back.png')}
              style={styles.navigationBarItemIcon}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: null,
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0
      }
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      voucher: props.navigation.state.params.voucher
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onBackPressed: this.onBackPressed,
      onItemPressed: this.onItemPressed
    });
  }

  onBackPressed = () => {
    this.props.navigation.goBack();
  };

  onHowToUsePressed = async () => {
    const { navigate } = this.props.navigation;
    const { company_id } = this.props;

    navigate('WebCommon', {
      title: 'How To Use',
      web_url: (await KURL_INFO()) + '?page=voucher_uses&id=' + company_id
    });
  };

  renderVoucherHeader(item) {
    if (item.used === true) {
      return (
        <UsedVoucher
          navigation={this.props.navigation}
          item={item}
          title={item.voucher.name}
          description={item.voucher.description}
          used_date={item.used_date}
          available_date={item.available_date}
        />
      );
    } else if (item.expired === true) {
      return (
        <ExpiredVoucher
          navigation={this.props.navigation}
          item={item}
          title={item.voucher.name}
          description={item.voucher.description}
          used_date={item.used_date}
          available_date={item.available_date}
        />
      );
    } else {
      return (
        <ValidVoucher
          navigation={this.props.navigation}
          item={item}
          title={item.voucher.name}
          description={item.voucher.description}
          display_value={item.voucher.display_value}
          discount_type={item.voucher.discount_type}
          used_date={item.used_date}
          company_id={this.props.company_id}
          available_date={item.available_date}
        />
      );
    }
  }
  render() {
    return (
      <View style={styles.rewardView}>
        {this.renderVoucherHeader(this.state.voucher)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: 'row',
    marginLeft: 8 * alpha,
    width: 70 * alpha
  },
  navigationBarItem: {
    width: '100%'
  },
  navigationBarItemTitle: {
    color: 'black',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha
  },
  navigationBarItemIcon: {
    width: 18 * alpha,
    height: 18 * alpha,
    tintColor: 'black'
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10 * alpha
  },
  rewardView: {
    backgroundColor: 'rgb(243, 243, 243)',
    flex: 1
  },
  availableView: {
    backgroundColor: 'white',
    height: 49 * alpha
  },
  availableTwoView: {
    backgroundColor: 'transparent',
    width: 125 * alpha,
    height: 49 * alpha
  },
  availablebarView: {
    backgroundColor: 'rgb(68, 68, 68)',
    position: 'absolute',
    right: 26 * alpha,
    width: 67 * alpha,
    bottom: 0 * alpha,
    height: 2 * alpha
  },
  availableButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    height: 49 * alpha
  },
  availableButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha
  },
  availableButtonText: {
    color: 'rgb(68, 68, 68)',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',

    textAlign: 'left'
  },
  expiredView: {
    backgroundColor: 'white',
    width: 125 * alpha,
    height: 49 * alpha
  },
  expiredbarView: {
    backgroundColor: 'rgb(68, 68, 68)',
    position: 'absolute',
    alignSelf: 'center',
    width: 67 * alpha,
    bottom: 0 * alpha,
    height: 2 * alpha
  },
  expiredButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 125 * alpha,
    height: 49 * alpha
  },
  expiredButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha
  },
  expiredButtonText: {
    color: 'rgb(118, 118, 118)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',

    textAlign: 'left'
  },
  usedView: {
    backgroundColor: 'white',
    position: 'absolute',
    alignSelf: 'center',
    width: 125 * alpha,
    top: 0 * alpha,
    height: 49 * alpha
  },
  usedbarView: {
    backgroundColor: 'rgb(68, 68, 68)',
    position: 'absolute',
    alignSelf: 'center',
    width: 67 * alpha,
    bottom: 0 * alpha,
    height: 2 * alpha
  },
  usedButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    position: 'absolute',
    left: 0 * alpha,
    right: 0 * alpha,
    top: 0 * alpha,
    height: 49 * alpha
  },
  usedButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha
  },
  usedButtonText: {
    color: 'rgb(118, 118, 118)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',

    textAlign: 'left'
  },
  voucherviewView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    left: 0 * alpha,
    right: 0 * alpha,
    top: 0 * alpha,
    bottom: 0 * alpha
  },
  howToUseButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    alignSelf: 'flex-end',
    width: 80 * alpha,
    height: 23 * alpha,
    marginRight: 15 * alpha,
    marginTop: 10 * alpha
  },
  howToUseButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha
  },
  howToUseButtonText: {
    color: 'rgb(151, 151, 151)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left'
  },
  voucherlistviewFlatList: {
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%'
  },
  voucherlistviewFlatListViewWrapper: {
    flex: 1
  },
  novoucherviewView: {
    backgroundColor: 'transparent',
    position: 'absolute',
    alignSelf: 'center',
    flex: 1,
    height: '100%',
    top: 0 * alpha,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  storeimageImage: {
    backgroundColor: 'transparent',
    resizeMode: 'contain',
    width: 375 * alpha,
    height: 91 * alpha
  },
  noRewardAvailableText: {
    backgroundColor: 'transparent',
    color: 'rgb(190, 190, 190)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    alignSelf: 'center',
    marginTop: 14 * alpha
  },
  redeemrewardButton: {
    backgroundColor: 'rgb(255, 254, 254)',
    borderWidth: 0.5,
    borderColor: 'rgb(215, 215, 215)',
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    height: 51 * alpha
  },
  redeemrewardButtonImage: {
    resizeMode: 'contain',
    marginRight: 10 * alpha
  },
  redeemrewardButtonText: {
    color: 'rgb(82, 82, 82)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 15 * fontAlpha,
    fontStyle: 'normal',

    textAlign: 'right'
  }
});
