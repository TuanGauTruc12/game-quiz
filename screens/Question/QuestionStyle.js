import {StyleSheet} from 'react-native';

const questionStyle = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  wrapper: {
    padding: 32,
    zIndex: 2,
    flex: 1,
    marginHorizontal: 8,
  },
  question: {
    position: 'relative',
    flex: 1,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timer: {
    position: "absolute",
    right: 0,
    borderTopEndRadius: 20,
    top: 0,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    padding: 8
  },
  timerText: {
    fontSize: 24,

  },
  option: {},
  text: {
    borderRadius: 20,
    marginVertical: 16,
    paddingVertical: 24,
    textAlign: 'center',
  },
});

export default questionStyle;
