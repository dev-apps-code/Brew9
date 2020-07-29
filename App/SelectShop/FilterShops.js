import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity
} from 'react-native';
import Modal, { ModalContent, SlideAnimation } from 'react-native-modals';
import { TITLE_FONT, NON_TITLE_FONT } from '../Common/common_style';
import { alpha, fontAlpha } from '../Common/size';

const TAB_FONT_SIZE = 16 * fontAlpha;
const CONTENT_FONT_SIZE = 14 * fontAlpha;

class FilterShops extends Component {
  constructor(props) {
    super(props);
    this.state = this._getState();
  }

  _getState = () => ({
    currentTab: 0,
    tabs: ['District', 'Area', 'All'],
    chosenAreaIndex: null,
    chosenDistrictArray: null,
    data: null
  });

  renderTabs() {
    let { tabs, currentTab } = this.state;

    const tabSet = tabs.map((value, key) => {
      return (
        <View
          key={key}
          style={{ marginLeft: 10, width: 100, alignItems: 'center' }}
        >
          <Text
            onPress={key == 2 ? () => this.onPressAll() : null}
            style={[
              styles.tabItemText,
              currentTab == key && { color: '#00B2E3' }
            ]}
          >
            {value}
          </Text>

          <View
            style={
              currentTab == key && {
                borderBottomColor: '#00B2E3',
                height: 1,
                width: '50%',
                borderBottomWidth: 1,
                color: '#00B2E3'
              }
            }
          />
        </View>
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
    let { chosenDistrictArray } = this.state;
    let { onAreaChosen } = this.props;
    console.log(chosenDistrictArray);
    let area = item;
    let district = chosenDistrictArray.district;
    onAreaChosen(area, district);
    this.onPressClose();
  };

  onPressAll = () => {
    let { onAreaChosen } = this.props;
    this.setState({
      currentTab: 0
    });
    onAreaChosen(null);
    this.onPressClose();
  };

  renderCheck = () => (
    <Image
      source={require('./../../assets/images/check.png')}
      style={{ alignSelf: 'center' }}
    />
  );

  renderDistrict = ({ item, index }) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text
          style={styles.nameText}
          onPress={() => this.onPressDistrict(item)}
        >
          {item.district}
        </Text>
        {this.props.selectedDistrict == item.district && this.renderCheck()}
      </View>
    );
  };

  renderArea = ({ item, index }) => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.nameText} onPress={() => this.onPressTown(item)}>
          {item}
        </Text>
        {this.props.selectedArea == item && this.renderCheck()}
      </View>
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
    let data = [];
    let render = null;

    //current tab is district
    if (currentTab == 0) {
      data = this.groupByDistrict();
      render = this.renderDistrict;
    }

    if (currentTab == 1) {
      data = ['All', ...chosenDistrictArray.areas];
      render = this.renderArea;
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

  saveData = () => {
    let data = this.groupByDistrict();
    this.setState({
      data: data
    });
  };

  onPressClose = () => {
    let { toggleAreaView } = this.props;
    this.setState({
      currentTab: 0
    });
    toggleAreaView();
  };

  render() {
    let { visible } = this.props;
    return (
      <Modal.BottomModal
        visible={visible}
        rounded={false}
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
              source={require('./../../assets/images/x-3.png')}
              style={styles.closeButtonImage}
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
    paddingBottom: 0,
    borderRadius: 0
  },
  modalView: {
    backgroundColor: 'white',
    width: '100%',
    height: alpha * 200,
    borderRadius: 0
  },
  placesView: {
    width: '100%',
    height: alpha * 150,
    backgroundColor: '#F5F5F5',
    padding: alpha * 14,
    paddingBottom: 50
  },
  headerText: {
    fontFamily: TITLE_FONT,
    fontSize: fontAlpha * 14,
    alignSelf: 'center',
    marginBottom: alpha * 15
  },
  tabView: {
    flexDirection: 'row',
    // width: '60%',
    justifyContent: 'flex-start',
    paddingLeft: alpha * 15
  },
  tabItemText: {
    fontFamily: NON_TITLE_FONT,
    fontSize: TAB_FONT_SIZE,
    paddingBottom: 10
  },
  nameText: {
    fontSize: CONTENT_FONT_SIZE,
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
    backgroundColor: 'white',
    borderRadius: 10.5 * alpha,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    position: 'absolute',
    left: 12 * alpha,
    width: 21 * alpha,
    top: 19 * alpha,
    height: 21 * alpha
  }
});

export default FilterShops;
