//
//  CategoryCell
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";
import React from "react";
import { alpha, fontAlpha } from "../Common/size";
import { TITLE_FONT, NON_TITLE_FONT, PRIMARY_COLOR } from "../Common/common_style";

export default class CategoryHeaderCell extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  onCategoryCellPress = () => {
    
  };

  render() {
    const { categoryImage, categoryname } = this.props;

    return <TouchableWithoutFeedback
				onPress={this.onCellThreePress}>
				<View
					navigation={this.props.navigation}
					style={styles.categoryheadercell}>
					<View
						style={styles.textblockView}>
              <View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 0,
								right: 0,
								top: 0,
								bottom: 0,
								justifyContent: "center",
							}}>
							<View
								style={styles.lineView}/>
						</View>
						<View
							pointerEvents="box-none"
							style={{
								position: "absolute",
								left: 0,
								top: 0,
								bottom: 0,
								justifyContent: "center",
							}}>
							<Text
								style={styles.headerText}>{this.props.categoryName}</Text>
						</View>
						
					</View>
					{this.props.categoryDescription && (
              <Text
              numberOfLines={3}
              style={styles.descriptionText}>{this.props.categoryDescription}</Text>
          )}
				</View>
			</TouchableWithoutFeedback>
  }
}

const styles = StyleSheet.create({
  categoryheadercell: {
		backgroundColor: "transparent",
		width: "100%",
		flex: 1,
	},
	textblockView: {
		backgroundColor: "transparent",
		height: 17,
		marginTop: 5,
	},
	headerText: {
		fontFamily: TITLE_FONT,
    fontSize: 14 * fontAlpha,
    fontStyle: "normal",
    fontWeight: "normal",
    color: PRIMARY_COLOR,
    textAlign: "left",
    marginLeft: 10 * alpha,
    paddingRight: 10 * alpha,
    backgroundColor: "white",
	},
	lineView: {
		marginLeft: 10 * alpha,
    backgroundColor: "rgb(229, 227, 227)",
    height: 1,
	},
	descriptionText: {
		backgroundColor: "transparent",
		color: "rgb(167, 167, 167)",
		fontFamily: NON_TITLE_FONT,
		fontSize: 11 * fontAlpha,
		fontStyle: "normal",
		fontWeight: "normal",
    textAlign: "left",
    // width: 190 * alpha,
		alignSelf: "flex-start",
    marginLeft: 10 * alpha,
    marginRight: 10 * alpha,
    marginTop: 2 * alpha,
    marginBottom: 10 * alpha,
	},
})