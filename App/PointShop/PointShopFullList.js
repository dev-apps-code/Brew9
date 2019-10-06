//
//  PointShop
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {Text, View, StyleSheet, FlatList, TouchableOpacity, Image} from "react-native"
import React from "react"
import PointProductNoHeaderCell from "./PointProductNoHeaderCell"
import { alpha, fontAlpha } from "../Common/size";
import { KURL_INFO } from "../Utils/server.js"
import {createAction} from "../Utils";
import {connect} from "react-redux";
import PointsProductsRequestObject from "../Requests/points_products_request_object.js"

@connect(({ members }) => ({
    members: members.profile
}))
export default class PointShopFullList extends React.Component {

    static navigationOptions = ({ navigation }) => {

        const { params = {} } = navigation.state
        return {
            title: navigation.getParam("title", ""),
            headerTintColor: "black",
            headerLeft: <View
                style={styles.headerLeftContainer}>
                <TouchableOpacity
                    onPress={params.onBackPressed ? params.onBackPressed : () => null}
                    style={styles.navigationBarItem}>
                    <Image
                        source={require("./../../assets/images/back.png")}
                        style={styles.navigationBarItemIcon}/>
                </TouchableOpacity>
            </View>,
            headerRight: null,
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0
            },
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            data: [],
        }
    }

    componentDidMount() {
        this.loadPointsProducts()
        this.props.navigation.setParams({
            onBackPressed: this.onBackPressed,
            onItemPressed: this.onItemPressed,
        })
    }

    onBackPressed = () => {

        this.props.navigation.goBack()
    }

    loadPointsProducts(){
        const { dispatch, members } = this.props
        this.setState({ loading: true })
        const callback = eventObject => {
            if (eventObject.success) {
                this.setState({
                    loading: false,
                    data: eventObject.result,
                })
            }

        }
        const obj = new PointsProductsRequestObject()
        obj.setUrlId(members.company_id)
        dispatch(
            createAction('companies/loadPointsProducts')({
                object:obj,
                callback,
            })
        )
    }

    onPointHistoryPressed = () => {

        const { navigate } = this.props.navigation

        navigate("PointShopHistory")
    }

    onTransactionHistoryPressed = () => {

    }

    onRulesPressed = () => {
        const { navigate } = this.props.navigation

        navigate("WebCommon", {
            title: 'Rules',
            web_url: KURL_INFO + '?page=point_rules&id=1',
        })
    }

    renderPointproductlistFlatListCell = ({ item, index }) => {

        return <PointProductNoHeaderCell
            navigation={this.props.navigation}
            index={index}/>
    }

    tableViewFlatListMockData = [{
        key: "1",
    }, {
        key: "2",
    }, {
        key: "3",
    }, {
        key: "4",
    }, {
        key: "5",
    }, {
        key: "6",
    }, {
        key: "7",
    }]

    render() {

        return <View
            style={styles.pointShopView}>
            <View
                style={styles.contentView}>
                <View
                    style={styles.pointproductlistFlatListViewWrapper}>
                    <FlatList
                        renderItem={this.renderPointproductlistFlatListCell}
                        data={this.tableViewFlatListMockData}
                        numColumns={2}
                        style={styles.pointproductlistFlatList}
                        keyExtractor={(item, index) => index.toString()}/>
                </View>
            </View>
        </View>
    }
}

const styles = StyleSheet.create({
    headerLeftContainer: {
		flexDirection: "row",
		marginLeft: 8 * alpha,
		width: 70 * alpha,
	},
	navigationBarItem: {
		width: "100%",
	},
    navigationBarItemTitle: {
        color: "black",
        fontFamily: "DINPro-Bold",
        fontSize: 16 * fontAlpha,
    },
    navigationBarItemIcon: {
		width: 18 * alpha,
		height: 18 * alpha,
		tintColor: "black",
	},
    pointShopView: {
        backgroundColor: "white",
        flex: 1,
    },
    contentView: {
        backgroundColor: "transparent",
        flex: 1,
        marginBottom: 3 * alpha,
    },
    seperatorView: {
        backgroundColor: "rgb(221, 221, 221)",
        width: 1 * alpha,
        height: 20 * alpha,
    },
    pointproductlistFlatList: {
        backgroundColor: "rgb(244, 244, 244)",
        width: "100%",
        height: "100%",
    },
    pointproductlistFlatListViewWrapper: {
        flex: 1,
        marginRight: 1 * alpha,
    },
})