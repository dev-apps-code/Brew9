import { StyleSheet, StatusBar } from 'react-native';
import { PRIMARY_COLOR, TITLE_FONT, NON_TITLE_FONT } from '../Common/common_style';
import { fontAlpha, windowHeight, barHeight } from '../Common/size';

export default StyleSheet.create({
  container: {
    flex: 1
  },
  button: {
    margin: 5,
    padding: 10,
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 10
  },
  text: {
    color: 'white',
    fontSize: 18 * fontAlpha,
    fontFamily: TITLE_FONT,
    fontWeight: 'bold'
  },
  selectServerText: {
    fontFamily: TITLE_FONT,
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 20
  },
  loading: {
    position: 'absolute',
    // backgroundColor: 'white',
    height: '100%',
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  cancelButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 10,
    marginVertical: 20,
    paddingHorizontal: 30,
  },
  cancelButtonText: {
    fontSize: 20 * fontAlpha,
    color: 'white',
    fontFamily: NON_TITLE_FONT
  }
});
