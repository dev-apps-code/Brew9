import {windowWidth, alpha} from '../../App/Common/size'
import { StyleSheet} from "react-native"

export const commonStyles = StyleSheet.create({
	lightGraySeparator: {
		backgroundColor: "blue",
        height:5*alpha,
		width: windowWidth,
	},
})
