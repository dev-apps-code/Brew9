import { StackActions, NavigationActions } from './index';

export function logout({ navigation }) {
  const action = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'VerifyUserStack' })]
  });

  navigation.dispatch(action);
}

export function resetTo({ navigation }, destination) {
  const action = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: destination })]
  });

  navigation.dispatch(action);
}

export function goTo({ navigation }, index, actions) {
  const action = StackActions.reset({ index, actions });
  navigation.dispatch(action);
}
