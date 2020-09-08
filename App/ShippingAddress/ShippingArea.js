import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {connect} from 'react-redux';
import {alpha, fontAlpha} from '../Common/size';
import {createAction} from '../Utils';
import ShopAreaRequestObject from '../Requests/shop_area_request_object';
import * as commonStyles from '../Common/common_style';

const {
  TITLE_FONT,
  NON_TITLE_FONT,
  PRIMARY_COLOR,
  BUTTONBOTTOMPADDING,
} = commonStyles;

@connect(({members, shops}) => ({
  currentMember: members.profile,
  selectedShop: shops.selectedShop,
  company_id: members.company_id,
}))
export default class ShippingArea extends React.Component {
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
          Delivery Address
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
      area: [],
      loading: false,
    };
  }
  loadArea = () => {
    let {dispatch, selectedShop} = this.props;
    this.setState({loading: true});
    const callback = (eventObject) => {
      if (eventObject.success) {
        this.setState({
          loading: false,
          area: eventObject.result.delivery_areas,
        });
      }
    };
    const obj = new ShopAreaRequestObject();
    obj.setUrlId(members.company_id);
    dispatch(
      createAction('companies/loadShopArea')({
        object: obj,
        callback,
      }),
    );
  };

  returnData(info) {
    this.props.navigation.state.params.returnData(info);
    // this.props.navigation.goBack();
  }

  onBackPressed = () => {
    this.props.navigation.goBack();
  };
  onSelectArea = (item) => {
    let currentArea = this.state.area.map((area) => {
      if (area.id == item.id) {
        area.selected = true;
      } else {
        area.selected = false;
      }
      return area;
    });
    this.setState({area: currentArea});
  };
  onSavePressed = () => {
    const {navigation} = this.props;
    let selectedArea = this.state.area.find((item) => {
      return item.selected == true;
    });
    navigation.state.params.returnData(selectedArea);
    navigation.navigate('AddShippingAddress');
  };

  componentDidMount() {
    this.props.navigation.setParams({
      onBackPressed: this.onBackPressed,
    });
    this.loadArea();
  }

  renderPlaces = (item) => {
    let selected = item.selected ? PRIMARY_COLOR : 'rgb(233,233,233)';
    let selected_text = item.selected ? 'white' : 'rgb(54, 54, 54)';
    return (
      <TouchableOpacity
        style={[styles.placesButton, {backgroundColor: selected}]}
        onPress={() => this.onSelectArea(item)}>
        <Text style={[styles.areaTitle, {color: selected_text}]}>
          {item.area}
        </Text>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <Brew9Loading />
        ) : (
          <View style={{flex: 1, height: '100%'}}>
            <View style={styles.addAddressForm}>
              <Text style={styles.header}>Please select your area</Text>
              <View style={styles.placesWrapperView}>
                <FlatList
                  renderItem={({item}) => this.renderPlaces(item)}
                  data={this.state.area}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={3}
                  key={'THREE COLUMN'}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => this.onSavePressed()}
              style={styles.saveButton}>
              <Text style={styles.saveButtonText}>SAVE</Text>
            </TouchableOpacity>
          </View>
        )}
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
    backgroundColor: 'rgb(243, 243, 243)',
  },
  addAddressForm: {
    backgroundColor: 'white',
    marginTop: 20 * alpha,
    paddingTop: 10 * alpha,
    paddingHorizontal: 10 * alpha,
    marginHorizontal: 10 * alpha,
    borderRadius: 10 * alpha,
    marginBottom: BUTTONBOTTOMPADDING + 30 * alpha,

    // paddingBottom: 10 * alpha,
  },
  textInput: {
    backgroundColor: 'transparent',
    padding: 0,
    color: 'black',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    fontWeight: 'normal',
    textAlign: 'left',
    // width: 193 * alpha,
    // height: 30 * alpha,
    flex: 1,
  },
  formDetail: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingVertical: 10 * alpha,
    // flex: 1
  },
  mainTitle: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 16 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'left',
    paddingVertical: 15 * alpha,
    paddingHorizontal: 15 * alpha,
  },
  title: {
    backgroundColor: 'transparent',
    color: 'rgb(54, 54, 54)',
    fontFamily: TITLE_FONT,
    fontSize: 13 * fontAlpha,
    fontStyle: 'normal',
    width: 110 * alpha,
    textAlign: 'left',
  },
  header: {
    backgroundColor: 'transparent',
    color: 'rgb(130, 130, 130)',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'center',
    paddingTop: 10 * alpha,
  },
  areaTitle: {
    color: 'rgb(54, 54, 54)',
    fontFamily: NON_TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'center',
  },
  seperatorImage: {
    backgroundColor: 'transparent',
    resizeMode: 'cover',
    height: 3 * alpha,
  },
  selectedradioView: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  defaultAddressOption: {
    borderRadius: 10 * alpha,
    width: 65 * alpha,
    // height: 10 * alpha,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
  },
  optionText: {
    fontFamily: NON_TITLE_FONT,
    fontSize: 10 * fontAlpha,
  },
  defaultAddressView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingVertical: 10 * alpha,
  },

  placesButton: {
    paddingVertical: 5 * alpha,
    paddingHorizontal: 10 * alpha,
    backgroundColor: 'rgb(233,233,233)',
    borderRadius: 5 * alpha,
    // borderWidth: 1,
    // borderColor: PRIMARY_COLOR,
    margin: 5 * alpha,
    alignItems: 'center',
  },
  placesWrapperView: {
    backgroundColor: 'transparent',
    marginTop: 10 * alpha,
    marginBottom: BUTTONBOTTOMPADDING + 50 * alpha,
  },
  saveButton: {
    borderRadius: 4 * alpha,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: PRIMARY_COLOR,
    position: 'absolute',
    left: 0 * alpha,
    right: 0 * alpha,
    marginHorizontal: 20 * alpha,
    bottom: BUTTONBOTTOMPADDING + 20 * alpha,
    height: 47 * alpha,
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: 'normal',
    textAlign: 'left',
  },
});
