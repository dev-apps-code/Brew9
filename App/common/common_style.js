import { windowWidth, alpha } from "./size";
import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
  lightGraySeparator: {
    backgroundColor: "blue",
    height: 5 * alpha,
    width: windowWidth
  },
  normal:{
		backgroundColor: "rgb(0, 178, 227)",
	},
	disabled:{
		backgroundColor: "rgba(0, 178, 227, 0.5)",
	},
});
