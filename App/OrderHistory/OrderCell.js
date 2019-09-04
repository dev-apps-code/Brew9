//
//  OrderCell
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import { TouchableOpacity, Text, Image, TouchableWithoutFeedback, StyleSheet, View } from "react-native"
import React from "react"


export default class OrderCell extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
	
	}

	onOrderCellPress = () => {
	
	}

	render() {
	
		return <TouchableWithoutFeedback
				onPress={this.onOrderCellPress}>
				<View
					navigation={this.props.navigation}
					style={styles.ordercell}>
					<View
						style={styles.cellcontentView}>
						<View
							style={styles.headerView}>
							<Text
								style={styles.puchongBranchText}>Puchong Branch</Text>
							<View
								style={{
									flex: 1,
								}}/>
							<Text
								style={styles.receivedCopyText}>Received</Text>
							<Image
								source={require("./../../assets/images/group-10.png")}
								style={styles.groupImage}/>
						</View>
						<View
							style={styles.productimagesView}>
							<Image
								source={require("./../../assets/images/group-33.png")}
								style={styles.group10Image}/>
							<Image
								source={require("./../../assets/images/group-11.png")}
								style={styles.group11Image}/>
							<Image
								source={require("./../../assets/images/group-32.png")}
								style={styles.group12Image}/>
							<View
								style={{
									flex: 1,
								}}/>
							<Image
								source={require("./../../assets/images/group-31.png")}
								style={styles.group13Image}/>
							<Image
								source={require("./../../assets/images/group-33.png")}
								style={styles.group14Image}/>
							<View
								style={styles.group15View}>
								<Image
									source={require("./../../assets/images/group-15.png")}
									style={styles.groupTwoImage}/>
							</View>
						</View>
						<View
							style={styles.orderinfoView}>
							<View
								style={styles.group17View}>
								<Text
									style={styles.orderNoCopyText}>Order No.   :</Text>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.textText}>9876543210</Text>
							</View>
							<View
								pointerEvents="box-none"
								style={{
									flex: 1,
									alignSelf: "stretch",
									flexDirection: "row",
									alignItems: "flex-end",
								}}>
								<View
									style={styles.group18View}>
									<Text
										style={styles.orderTimeCopyText}>Order Time :</Text>
									<View
										style={{
											flex: 1,
										}}/>
									<Text
										style={styles.textTwoText}>2019-06-20  16:06:00</Text>
								</View>
								<View
									style={{
										flex: 1,
									}}/>
								<Text
									style={styles.rm11700Text}>RM117.00</Text>
							</View>
						</View>
						<View
							style={{
								flex: 1,
							}}/>
						<View
							style={styles.lineView}/>
						<View
							style={styles.bottomsectionView}>
							<TouchableOpacity
								onPress={this.onReviewPressed}
								style={styles.reviewButton}>
								<Text
									style={styles.reviewButtonText}>Review</Text>
							</TouchableOpacity>
							<View
								style={{
									flex: 1,
								}}/>
							<TouchableOpacity
								onPress={this.onReceiptPressed}
								style={styles.receiptButton}>
								<Text
									style={styles.receiptButtonText}>Receipt</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</TouchableWithoutFeedback>
	}
}

const styles = StyleSheet.create({
	ordercell: {
		backgroundColor: "transparent",
		shadowColor: "rgb(226, 226, 226)",
		shadowRadius: 4,
		shadowOpacity: 1,
		width: "100%",
		height: 185,
		justifyContent: "center",
		alignItems: "center",
	},
	cellcontentView: {
		backgroundColor: "white",
		width: 375,
		height: 174,
		alignItems: "center",
	},
	headerView: {
		backgroundColor: "transparent",
		width: 323,
		height: 14,
		marginTop: 3,
		flexDirection: "row",
		alignItems: "center",
	},
	puchongBranchText: {
		backgroundColor: "transparent",
		color: "rgb(59, 59, 59)",
		fontFamily: "Helvetica-Bold",
		fontSize: 12,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
	},
	receivedCopyText: {
		color: "rgb(149, 149, 149)",
		fontFamily: "Helvetica",
		fontSize: 9,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
		marginRight: 6,
	},
	groupImage: {
		backgroundColor: "transparent",
		resizeMode: "center",
		flex: 1,
		height: 8,
		marginLeft: 6,
	},
	productimagesView: {
		backgroundColor: "rgb(248, 248, 248)",
		alignSelf: "stretch",
		height: 58,
		marginRight: 10,
		marginTop: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	group10Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		alignSelf: "flex-start",
		width: 42,
		height: 47,
		marginLeft: 30,
		marginTop: 3,
	},
	group11Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 44,
		height: 42,
		marginLeft: 8,
	},
	group12Image: {
		backgroundColor: "transparent",
		resizeMode: "center",
		width: 42,
		height: 42,
		marginLeft: 8,
	},
	group13Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: 42,
		height: 42,
		marginRight: 9,
	},
	group14Image: {
		resizeMode: "center",
		backgroundColor: "transparent",
		alignSelf: "flex-start",
		width: 42,
		height: 47,
		marginRight: 9,
		marginTop: 3,
	},
	group15View: {
		backgroundColor: "rgb(252, 252, 252)",
		width: 42,
		height: 42,
		marginRight: 48,
		justifyContent: "center",
	},
	groupTwoImage: {
		resizeMode: "center",
		backgroundColor: "transparent",
		width: null,
		height: 3,
		marginLeft: 14,
		marginRight: 13,
	},
	orderinfoView: {
		backgroundColor: "transparent",
		width: 321,
		height: 23,
		marginTop: 5,
		alignItems: "flex-start",
	},
	group17View: {
		backgroundColor: "transparent",
		width: 99,
		height: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	orderNoCopyText: {
		color: "rgb(149, 149, 149)",
		fontFamily: "Helvetica",
		fontSize: 8,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	textText: {
		backgroundColor: "transparent",
		color: "rgb(149, 149, 149)",
		fontFamily: "Helvetica",
		fontSize: 8,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	group18View: {
		backgroundColor: "transparent",
		width: 131,
		height: 10,
		flexDirection: "row",
		alignItems: "center",
	},
	orderTimeCopyText: {
		backgroundColor: "transparent",
		color: "rgb(149, 149, 149)",
		fontFamily: "Helvetica",
		fontSize: 8,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	textTwoText: {
		color: "rgb(149, 149, 149)",
		fontFamily: "Helvetica",
		fontSize: 8,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
		backgroundColor: "transparent",
	},
	rm11700Text: {
		backgroundColor: "transparent",
		color: "black",
		fontFamily: "Helvetica-Bold",
		fontSize: 11,
		fontStyle: "normal",
		fontWeight: "bold",
		textAlign: "left",
		alignSelf: "flex-start",
	},
	lineView: {
		backgroundColor: "rgb(246, 246, 246)",
		width: 321,
		height: 1,
		marginBottom: 9,
	},
	bottomsectionView: {
		backgroundColor: "transparent",
		alignSelf: "flex-end",
		width: 113,
		height: 22,
		marginRight: 35,
		marginBottom: 18,
		flexDirection: "row",
		alignItems: "center",
	},
	reviewButton: {
		backgroundColor: "transparent",
		borderRadius: 2,
		borderWidth: 1,
		borderColor: "rgb(242, 242, 242)",
		borderStyle: "solid",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 53,
		height: 22,
	},
	reviewButtonImage: {
		resizeMode: "contain",
		marginRight: 10,
	},
	reviewButtonText: {
		color: "rgb(94, 94, 94)",
		fontFamily: "Helvetica",
		fontSize: 8,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	receiptButtonText: {
		color: "rgb(0, 178, 227)",
		fontFamily: "Helvetica",
		fontSize: 8,
		fontStyle: "normal",
		fontWeight: "normal",
		textAlign: "left",
	},
	receiptButton: {
		backgroundColor: "transparent",
		borderRadius: 2,
		borderWidth: 1,
		borderColor: "rgb(0, 178, 227)",
		borderStyle: "solid",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: 0,
		width: 53,
		height: 22,
	},
	receiptButtonImage: {
		resizeMode: "contain",
		marginRight: 10,
	},
})
