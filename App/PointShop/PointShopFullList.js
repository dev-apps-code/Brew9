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
import MembershipPointsProductRequestObject from "../Requests/membership_points_product_request_object.js"
import { TITLE_FONT, NON_TITLE_FONT } from '../Common/common_style';

@connect(({ members }) => ({
    members: members.profile,
    company_id: members.company_id,
}))
export default class PointShopFullList extends React.Component {

    static navigationOptions = ({ navigation }) => {

        const { params = {} } = navigation.state
        return {
            headerTitle: <Text style={{ textAlign: 'center', alignSelf: "center", fontFamily: TITLE_FONT}}>{navigation.getParam("title", "")}</Text>,
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
        const { dispatch } = this.props

            this.setState({ loading: true })
            const callback = eventObject => {
                if (eventObject.success) {
                    this.setState({ data:eventObject.result})
                }
                this.setState({
                    loading: false,
                    })   
            }
            const obj = new MembershipPointsProductRequestObject()
            obj.setUrlId( this.props.navigation.getParam("plan_id", null),)
            dispatch(
                createAction('memberships/loadPointsProducts')({
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

    onRulesPressed = async() => {
        const { navigate } = this.props.navigation
        const { company_id } = this.props
		navigate("WebCommon", {
			title: 'Point Rules',
			web_url: await KURL_INFO() + '?page=point_rules&id=' + company_id,
		})
    }

    renderPointproductlistFlatListCell = ({ item, index }) => {

        return <PointProductNoHeaderCell
            navigation={this.props.navigation}
            item={item}
            index={index}/>
    }
    

    render() {

        return <View
            style={styles.pointShopView}>
            <View
                style={styles.contentView}>
                <View
                    style={styles.pointproductlistFlatListViewWrapper}>
                    <FlatList
                        renderItem={this.renderPointproductlistFlatListCell}
                        data={this.state.data}
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
        fontFamily: TITLE_FONT,
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
        marginTop: 10 *alpha,
        backgroundColor: "white",
        width: "100%",
        height: "100%",
    },
    pointproductlistFlatListViewWrapper: {
        flex: 1,
        marginRight: 1 * alpha,
    },
})