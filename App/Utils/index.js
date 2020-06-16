export { StackActions, NavigationActions } from 'react-navigation'

export { default as Storage } from './storage'

export const delay = time => new Promise(resolve => setTimeout(resolve, time))

export const createAction = type => payload => ({ type, payload })

export function validateEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

export function	toRad(angle) {
  return (angle * Math.PI) / 180;
}

export function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  )
}

export function navigationAware(ScreenComponent, routeName) {
  const mapStateToProps = state => ({
    routeName: state.navigation.route,
  })

  class NavigationAware extends Component {
    screenWillFocus = () => this.props.routeName === routeName

    render() {
      return (
        <ScreenComponent
          {...this.props}
          routeName={this.props.routeName}
          screenWillFocus={this.screenWillFocus}
        />
      )
    }
  }

  return connect(mapStateToProps)(NavigationAware)
}
