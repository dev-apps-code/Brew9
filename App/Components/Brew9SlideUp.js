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
    chosenTown: '',
    chosenDistrict: null
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

  onPressDistrict = (index) => {
    let { currentTab } = this.state;
    this.setState({
      currentTab: currentTab + 1,
      chosenDistrict: index
    });
  };

  onPressTown = (area) => {
    let { onAreaChosen, locationList } = this.props;
    let {chosenDistrict} = this.state
    let district = locationList[chosenDistrict].district
    this.setState({
      currentTab: 0
    });
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
      <Text style={styles.nameText} onPress={() => this.onPressDistrict(index)}>
        {item.district}
      </Text>
    );
  };

  renderTown = ({ item, index }) => {
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
    let locationList = this.groupByDistrict();

    let { currentTab, chosenDistrict } = this.state;
    let data =
      currentTab == 0
        ? locationList
        : currentTab == 1
        ? [locationList[chosenDistrict].areas, 'All']
        : null;
    let render =
      currentTab == 0
        ? this.renderDistrict
        : currentTab == 1
        ? this.renderTown
        : null;
    return (
      <FlatList
        data={data}
        renderItem={render}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `${index}-${item.id}`}
      />
    );
  };

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
        onTouchOutside={() => toggleAreaView()}
      >
        <ModalContent style={styles.customStyle}>
          <View style={styles.modalView}>
            <Text style={styles.headerText}>Please Select</Text>
            <View style={styles.tabView}>{this.renderTabs()}</View>
            {/* <Button style={{marginTop: alpha * 3}}title="test" onPress={this.test}></Button> */}
            <View style={styles.placesView}>{this.renderList()}</View>
          </View>
          <TouchableOpacity
            onPress={() => toggleAreaView()}
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
