import {StyleSheet} from 'react-native';
import {PRIMARY_COLOR, TITLE_FONT, NON_TITLE_FONT} from '../Common';
import {fontAlpha} from '../Common/size';

export default StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: PRIMARY_COLOR,
    borderRadius: 10,
    margin: 5,
    padding: 10,
  },
  cancelButton: {
    backgroundColor: PRIMARY_COLOR,
    marginVertical: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  cancelButtonText: {
    color: 'white',
    fontFamily: NON_TITLE_FONT,
    fontSize: 20 * fontAlpha,
  },
  container: {
    flex: 1,
  },
  loading: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
  },
  loadingIndicator: {marginBottom: 20},
  selectServerText: {
    fontFamily: TITLE_FONT,
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontFamily: TITLE_FONT,
    fontSize: 18 * fontAlpha,
    fontWeight: 'bold',
  },
});
