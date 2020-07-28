import React, { Component } from 'react';
import { alpha, fontAlpha, windowWidth } from '../Common/size';
import Modal, {
  ModalContent,
  ModalButton,
  ModalFooter,
  SlideAnimation
} from 'react-native-modals';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  Button,
  FlatList,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import { TITLE_FONT, NON_TITLE_FONT } from '../Common/common_style';

class Brew9SlideUp extends Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
  }

  _getState = () => ({
    currentTab: 0,
    tabs: ['District', 'Town', 'All'],
    chosenAreaIndex: null,
    chosenDistrictArray: null,
    data: null
  });

  renderTabs() {
    let { tabs, currentTab } = this.state;

    const tabSet = tabs.map((value, key) => {
      return (
        <Text
          onPress={key == 2 ? () => this.onPressAll() : null}
          style={
            currentTab == key
              ? {
                  ...styles.tabItemText,
                  ...{
                    borderBottomColor: '#00B2E3',
                    borderBottomWidth: 1,
                    color: '#00B2E3'
                  }
                }
              : styles.tabItemText
          }
          key={key}
        >
          {value}
        </Text>
      );
    });

    return tabSet;
  }

  onPressDistrict = (item) => {
    let { currentTab } = this.state;
    this.setState({
      currentTab: currentTab + 1,
      chosenDistrictArray: item
    });
  };

  onPressTown = (item) => {
    let { chosenDistrictArray } = this.state
    let { onAreaChosen } = this.props
    console.log(chosenDistrictArray)
    let area = item
    let district = chosenDistrictArray.district
    onAreaChosen(area, district);
  };

  onPressAll = () => {
    let { onAreaChosen } = this.props;
    this.setState({
      currentTab: 0
    });
    onAreaChosen(null);
  };

  renderDistrict = ({ item, index }) => {
    return (
      <Text style={styles.nameText} onPress={() => this.onPressDistrict(item)}>
        {item.district}
      </Text>
    );
  };

  renderArea = ({ item, index }) => {
    return (
      <Text style={styles.nameText} onPress={() => this.onPressTown(item)}>
        {item}
      </Text>
    );
  };

  groupByDistrict() {
    let { locationList } = this.props;
    let tmp = [];

    for (let k in locationList) {
      let key = locationList[k].district;
      if (!tmp[key]) tmp[key] = [];
      if (tmp[key].indexOf(locationList[k].area) == -1)
        tmp[key].push(locationList[k].area);
    }

    let r = Object.keys(tmp).map((key) => {
      return { district: key, areas: tmp[key] };
    });

    // sort asc
    r.sort((a, b) => {
      return a.district < b.district ? -1 : 1;
    });

    return r;
  }

  renderList = () => {
    let { currentTab, chosenDistrictArray } = this.state;
    let data = []
    let render = null

    //current tab is district
    if (currentTab == 0) {
      data = this.groupByDistrict()
      render = this.renderDistrict
    }

    if (currentTab == 1) {
      data = chosenDistrictArray.areas
      data.push('All')
      render= this.renderArea

    }
    return (
      <FlatList
        data={data}
        renderItem={render}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${index}-${item.id}`}
      />
    );
  };

  saveData = ( ) => {
    let data = this.groupByDistrict()
    this.setState({
      data: data
    })
  }

  onPressClose = () => {
    let { toggleAreaView } = this.props
    this.setState({
      currentTab: 0
    })
    toggleAreaView()
  }

  render() {
    let { visible, onAreaChosen, toggleAreaView } = this.props;
    return (
      <Modal.BottomModal
        visible={visible}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom'
          })
        }
        onTouchOutside={() => this.onPressClose()}
      >
        <ModalContent style={styles.customStyle}>
          <View style={styles.modalView}>
            <Text style={styles.headerText}>Please Select</Text>
            <View style={styles.tabView}>{this.renderTabs()}</View>
            <View style={styles.placesView}>{this.renderList()}</View>
          </View>
          <TouchableOpacity
            onPress={() => this.onPressClose()}
            style={styles.closeButton}
          >
            <Image
              source={require('./../../assets/images/cancel.png')}
              style={styles.closeImage}
            />
          </TouchableOpacity>
        </ModalContent>
      </Modal.BottomModal>
    );
  }
}

const styles = StyleSheet.create({
  customStyle: {
    backgroundColor: 'white',
    paddingLeft: 0,
    paddingRight: 0,
    paddingBottom: 0
  },
  modalView: {
    backgroundColor: 'white',
    width: '100%',
    height: alpha * 150,
    borderRadius: 0
  },
  placesView: {
    width: '100%',
    height: alpha * 150,
    backgroundColor: '#F5F5F5',
    padding: alpha * 10
  },
  headerText: {
    fontFamily: TITLE_FONT,
    fontSize: fontAlpha * 14,
    alignSelf: 'center',
    marginBottom: alpha * 15
  },
  tabView: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
    paddingLeft: alpha * 15
  },
  tabItemText: {
    fontFamily: NON_TITLE_FONT,
    fontSize: fontAlpha * 14,
  },
  nameText: {
    fontSize: fontAlpha * 12,
    fontFamily: NON_TITLE_FONT,
    marginTop: alpha * 5
  },
  closeImage: {
    // position: 'absolute',
    // top: alpha * 5,
    // right: alpha * 5,
    tintColor: '#00B2E3'
  },
  closeButton: {
    position: 'absolute',
    top: alpha * 5,
    right: alpha * 5
  }
});
export default Brew9SlideUp;
