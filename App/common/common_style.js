import { windowWidth, alpha } from "./size";
import { StyleSheet, Platform } from "react-native";

export const TITLE_FONT = "ClanPro-News";
export const NON_TITLE_FONT = "ClanPro-Book";
export const PRIMARY_COLOR = "rgb(0, 178, 227)"
export const BUTTONBOTTOMPADDING = Platform.OS === "ios" ? 40*alpha : 0
export const commonStyles = StyleSheet.create({
  lightGraySeparator: {
    backgroundColor: "blue",
    height: 5 * alpha,
    width: windowWidth
  },
  normal: {
    backgroundColor: "rgb(0, 178, 227)"
  },
  disabled: {
    backgroundColor: "rgba(0, 178, 227, 0.5)"
  },
  text_primary_color: {
    color: "rgb(0, 178, 227)",
  },
  background_primary_color: {
    backgroundColor: "rgb(0, 178, 227)",
  }
});
