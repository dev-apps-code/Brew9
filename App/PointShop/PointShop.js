import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {Analytics, Event} from 'expo-analytics';
import {connect} from 'react-redux';
import PointProductCell from './PointProductCell';
import {alpha, fontAlpha} from '../Common/size';
import {KURL_INFO} from '../../App/Utils/server.js';
import {createAction} from '../Utils';
import PointsProductsRequestObject from '../Requests/points_products_request_object.js';
import * as commonStyles from '../Common/common_style';
import {ANALYTICS_ID} from '../Common/config';
import {getMemberIdForApi} from '../Services/members_helper';
import {Brew9Toast} from '../Components';

const {
  TITLE_FONT,
  NON_TITLE_FONT,
  PRIMARY_COLOR,
  LIGHT_GREY,
  DEFAULT_GREY_BACKGROUND,
  TOAST_DURATION,
} = commonStyles;
@connect(({members}) => ({
  members: members.profile,
  company_id: members.company_id,
}))
export default class PointShop extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      headerTitle: (
        <Text
          style={{
            textAlign: 'center',
            alignSelf: 'center',
            fontFamily: TITLE_FONT,
          }}>
          Reward Points
        </Text>
      ),
      headerTintColor: 'black',
      headerLeft: (
        <View style={styles.headerLeftContainer}>
          <TouchableOpacity
            onPress={params.onBackPressed ? params.onBackPressed : () => null}
            style={styles.navigationBarItem}>
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
        shadowOpacity: 0,
      },
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
    };
  }

  componentDidMount() {
    this.loadPointsProducts();
    this.props.navigation.setParams({
      onBackPressed: this.onBackPressed,
      onItemPressed: this.onItemPressed,
    });
  }

  onBackPressed = () => {
    this.props.navigation.goBack();
  };

  onPointRulePressed = async () => {
    const {navigate} = this.props.navigation;
    const {company_id} = this.props;
    const analytics = new Analytics(ANALYTICS_ID);
    analytics.event(
      new Event(
        'Redemption Shop',
        getMemberIdForApi(this.props.members),
        'Point Rules',
      ),
    );

    navigate('WebCommon', {
      title: 'Point Rules',
      web_url: (await KURL_INFO()) + '?page=point_rules&id=' + company_id,
    });
  };

  onItemPressed = (item, item_name) => {
    const {navigate} = this.props.navigation;
    const {points} = this.props.members;
    if (points < item.points) {
      this.refs.toast.show(
        'Insufficient points for redemption',
        TOAST_DURATION,
      );
    } else {
      navigate('PointShopItem', {
        item_id: item.id,
        item_name: item_name,
        item_type: item.product_type,
        item: item,
      });
    }
  };

  loadPointsProducts() {
    const {dispatch, members} = this.props;
    this.setState({loading: true});
    const callback = (eventObject) => {
      if (eventObject.success) {
        this.setState({
          loading: false,
          data: eventObject.result,
        });
      }
    };
    const obj = new PointsProductsRequestObject();
    obj.setUrlId(members.company_id);
    dispatch(
      createAction('companies/loadPointsProducts')({
        object: obj,
        callback,
      }),
    );
  }

  onPointHistoryPressed = () => {
    const {navigate} = this.props.navigation;
    const analytics = new Analytics(ANALYTICS_ID);
    analytics.event(
      new Event(
        'Redemption Shop',
        getMemberIdForApi(this.props.members),
        'Point History',
      ),
    );
    navigate('PointHistory');
  };

  onTransactionHistoryPressed = () => {
    const {navigate} = this.props.navigation;
    const analytics = new Analytics(ANALYTICS_ID);
    analytics.event(
      new Event(
        'Redemption Shop',
        getMemberIdForApi(this.props.members),
        'Redemption History',
      ),
    );
    navigate('PointShopHistory');
  };

  onRulesPressed = async () => {
    const {navigate} = this.props.navigation;
    const {company_id} = this.props;
    const analytics = new Analytics(ANALYTICS_ID);
    analytics.event(
      new Event(
        'Redemption Shop',
        getMemberIdForApi(this.props.members),
        'Point Rules',
      ),
    );
    navigate('WebCommon', {
      title: 'Point Rules',
      web_url: (await KURL_INFO()) + '?page=point_rules&id=' + company_id,
    });
  };

  renderPointproductlistFlatListCell = ({item, index}) => {
    return (
      <PointProductCell
        navigation={this.props.navigation}
        sectionId={item.id}
        sectionHeader={'Redemption Zone'}
        item={item}
        onPressItem={this.onItemPressed}
        index={index}
      />
    );
  };

  render() {
    const {members} = this.props;
    const {data} = this.state;

    var expiry_date = '';

    if (members.point_expiry_date != null && members.point_expiry_date != '') {
      expiry_date = `Expiry Date: ${members.point_expiry_date}`;
    }

    return (
      <View style={styles.pointShopView}>
        <View style={styles.contentView}>
          <View style={styles.pointCollectedView}>
            <View style={styles.pointCollectedTwoView}>
              <Text style={styles.pointsText}>{members.points}</Text>
              {members.point_expiry_date != undefined}
              <Text style={styles.pointsCollectedText}>Reedemable Points</Text>
              <Text style={styles.pointsExpiryText}>{expiry_date}</Text>
            </View>
            <View
              style={{
                flex: 1,
              }}
            />
            <TouchableOpacity
              onPress={this.onPointRulePressed}
              style={styles.pointRuleButton}>
              <Image
                source={require('./../../assets/images/icon-rule.png')}
                style={styles.pointRuleButtonImage}
              />
              <Text style={styles.pointRuleButtonText}>Point Rule</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerView}>
            <TouchableOpacity
              onPress={this.onPointHistoryPressed}
              style={styles.pointHistoryButton}>
              <Text style={styles.pointHistoryButtonText}>Points History</Text>
              {/* <View style={{ borderBottomColor: PRIMARY_COLOR, borderBottomWidth: 5 * alpha, width: 50, borderRadius: 5 }}></View> */}
            </TouchableOpacity>
            <Text style={styles.verticalLine}>|</Text>
            <TouchableOpacity
              onPress={this.onTransactionHistoryPressed}
              style={styles.pointHistoryButton}>
              <Text style={styles.transactionHistoryButtonText}>
                Redemption History
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.spacer} />
          {this.state.loading ? (
            <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" />
            </View>
          ) : (
            <FlatList
              renderItem={this.renderPointproductlistFlatListCell}
              data={data['0'].points_products}
              style={styles.pointproductlistFlatList}
              keyExtractor={(item, index) => index.toString()}
              numColumns={2}
              scrollIndicatorInsets={{right: 1}}
            />
          )}
        </View>
        <Brew9Toast ref="toast" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerLeftContainer: {
    flexDirection: 'row',
    marginLeft: 8 * alpha,
    width: 70 * alpha,
  },
  navigationBarItem: {
    width: '100%',
  },
  navigationBarItemTitle: {
    color: 'black',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha,
  },
  navigationBarItemIcon: {
    width: 18 * alpha,
    height: 18 * alpha,
    tintColor: 'black',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10 * alpha,
  },
  pointShopView: {
    backgroundColor: DEFAULT_GREY_BACKGROUND,
    flex: 1,
  },
  contentView: {
    backgroundColor: 'transparent',
    flex: 1,
  },
  pointCollectedView: {
    backgroundColor: 'white',
    height: 130 * alpha,
    marginRight: 1 * alpha,
    alignItems: 'flex-end',
  },
  pointCollectedTwoView: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    flexDirection: 'column',
    width: 300 * alpha,
    flex: 1,
    marginTop: 18 * alpha,
  },
  pointsCollectedText: {
    color: 'rgb(59, 59, 59)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginTop: 5 * alpha,
  },
  pointsText: {
    color: PRIMARY_COLOR,
    fontFamily: TITLE_FONT,
    fontSize: 31 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    top: 5 * alpha,
  },
  pointsExpiryText: {
    color: LIGHT_GREY,
    fontFamily: TITLE_FONT,
    fontSize: 12 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'center',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    top: 10 * alpha,
  },
  pointRuleButtonImage: {
    resizeMode: 'contain',
    marginRight: 5 * alpha,
  },
  pointRuleButton: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    width: 77 * alpha,
    height: 15 * alpha,
    marginRight: 19 * alpha,
    marginBottom: 18 * alpha,
  },
  pointRuleButtonText: {
    color: 'rgb(30, 29, 29)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 11 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
  },
  headerView: {
    backgroundColor: 'white',
    height: 47 * alpha,
    marginTop: 10 * alpha,
    paddingVertical: 10 * alpha,
    // marginHorizontal: 10 * alpha,
    // justifyContent: "center",
    // alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: DEFAULT_GREY_BACKGROUND,
    borderBottomWidth: 1,
  },
  pointHistoryButtonText: {
    // color: PRIMARY_COLOR,
    color: 'rgb(59, 59, 59)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'center',
    // paddingBottom: 6 * alpha,
    // marginRight: 10 * alpha,
  },
  verticalLine: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  pointHistoryButton: {
    backgroundColor: 'transparent',
    // flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15 * alpha,
    flex: 1,
    width: '50%',
  },
  transactionHistoryButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 1 * alpha,
    width: '50%',
  },
  transactionHistoryButtonText: {
    color: 'rgb(59, 59, 59)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'center',
  },
  seperatorView: {
    backgroundColor: 'rgb(221, 221, 221)',
    width: 1 * alpha,
    height: 20 * alpha,
  },
  pointproductlistFlatList: {
    width: '100%',
  },

  spacer: {
    width: '100%',
    height: alpha * 20,
    backgroundColor: '#FFFFFF',
  },
});
