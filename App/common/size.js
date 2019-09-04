import { Platform, Dimensions, StatusBar } from 'react-native'

const window = Dimensions.get('window')

export const windowWidth = window.width
export const windowHeight = window.height
export const alpha = window.width / 375
export const fontAlpha = window.width / 375
// export const fontAlpha = 1
export const barHeight = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight
export const navBarPaddingTop = barHeight
export const navbarHeight = (20 + 20) * alpha + barHeight
export const bottomBarHeight = 49 * alpha
export const defaultMarginTop = 15 * alpha
export const windowHeightWithoutBothBar =
    windowHeight - bottomBarHeight - navbarHeight - defaultMarginTop
export const windowHeightWithoutNavBar =
    windowHeight - navbarHeight - defaultMarginTop
