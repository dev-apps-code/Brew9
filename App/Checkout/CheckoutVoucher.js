//
//  MemberReward
//  Brew9
//
//  Created by [Author].
//  Copyright © 2018 brew9. All rights reserved.
//

import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator} from "react-native"
import React from "react"
import { alpha, fontAlpha } from "../Common/size";
import { createAction } from '../Utils'
import { connect } from "react-redux";
import VoucherRequestObject from "../Requests/voucher_request_object";
import UsedVoucher from "./UsedVoucher"
import ValidVoucher from "./ValidVoucher"
import {KURL_INFO} from "../Utils/server";

@connect(({ members }) => ({
    members: members.profile
}))
export default class CheckoutVoucher extends React.Component {

    static navigationOptions = ({ navigation }) => {

        const { params = {} } = navigation.state
        return {
            title: "Vouchers",
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
            valid_initial: true,
            used_initial: true,
            has_reward: true,
            valid_selected: true,
            used_selected: false,
            valid_page: 1,
            used_page: 1,
            valid_total: 0,
            used_total: 0,
            current_data: [],
            valid_data: [],
            used_data: [],
            loading: true,
            isRefreshing: false,
            voucher_button: 1
        }
    }

    loadValidVoucher(page_no) {
        const { dispatch, members } = this.props
        const callback = eventObject => {
            if (eventObject.success) {
                this.setState({
                    isRefreshing: false,
                    loading: false,
                    valid_initial: false,
                    valid_data: this.state.valid_data.concat(eventObject.result),
                    valid_total: eventObject.total,
                    valid_page: this.state.valid_page + 1,
                },function () {
                    this.setState({
                        current_data: this.state.valid_data,
                    });
                }.bind(this))
            }
        }
        const obj = new VoucherRequestObject()
        obj.setUrlId(members.id)
        obj.setPage(page_no)
        obj.setStatus(2) //Hardcoded
        dispatch(
            createAction('vouchers/loadValidVoucher')({
                object: obj,
                callback
            })
        )
    }

    loadUsedVoucher(page_no) {
        const { dispatch, members } = this.props
        const callback = eventObject => {
            if (eventObject.success) {
                this.setState({
                    isRefreshing: false,
                    loading: false,
                    used_initial: false,
                    used_data: this.state.used_data.concat(eventObject.result),
                    used_total: eventObject.total,
                    used_page: this.state.used_page + 1,
                },function () {
                    this.setState({
                        current_data: this.state.used_data,
                    });
                }.bind(this))
            }
        }
        const obj = new VoucherRequestObject()
        obj.setUrlId(members.id)
        obj.setPage(page_no)
        obj.setStatus(1)
        dispatch(
            createAction('vouchers/loadUsedVoucher')({
                object: obj,
                callback
            })
        )
    }

    componentDidMount() {
        this.onAvailablePressed()
        this.props.navigation.setParams({
            onBackPressed: this.onBackPressed,
            onItemPressed: this.onItemPressed,
        })
    }

    onBackPressed = () => {

        this.props.navigation.goBack()
    }

    onItemPressed = () => {

    }

    onAvailablePressed = () => {
        const { valid_initial, valid_data, valid_page } = this.state

        if (valid_initial) {
            this.loadValidVoucher(valid_page)
            this.setState({
                loading: true,
            })
        }

        this.setState({
            valid_selected: true,
            used_selected: false,
            current_data: valid_data,
        })

    }

    onUsedPressed = () => {
        const { used_initial, used_data, used_page } = this.state

        if (used_initial) {
            this.loadUsedVoucher(used_page)
            this.setState({
                loading: true,
            })
        }

        this.setState({
            valid_selected: false,
            used_selected: true,
            current_data: used_data,
        })

    }

    onRedeemRewardPressed = () => {
        const { navigate } = this.props.navigation

        navigate("RedeemPromotion")
    }

    onHowToUsePressed = () => {
        const { navigate } = this.props.navigation
        const { members } = this.props

        navigate("WebCommon", {
            title: 'How To Use',
            web_url: KURL_INFO + '?page=voucher_uses&id=' + members.company_id,
        })
    }

    onRefresh() {
        const { valid_selected, used_selected } = this.state

        this.setState({
            isRefreshing: true,
        })

        if (valid_selected) {
            this.setState({
                valid_data: [],
                valid_page: 1,
            })
            this.loadValidVoucher(1)
        }

        if (used_selected) {
            this.setState({
                used_data: [],
                used_page: 1,
            })
            this.loadUsedVoucher(1)
        }
    }

    loadMore() {
        const { valid_selected, used_selected, loading, valid_data, used_data, valid_total, used_total, valid_page, used_page } = this.state

        if (!loading) {
            if (valid_selected) {
                if (valid_total > valid_data.length) {
                    this.setState({
                        loading: true
                    })
                    this.loadValidVoucher(valid_page)
                }
            }
            if (used_selected) {
                if (used_total > used_data.length) {
                    this.setState({
                        loading: true
                    })
                    this.loadUsedVoucher(used_page)
                }
            }
        }
    }

    renderVouchertableFlatListCell = ({ item }) => {

        if (this.state.valid_selected) {
            return <ValidVoucher
                navigation={this.props.navigation}
                title={item.voucher.name}
                description={item.voucher.description}
                display_value={item.voucher.display_value}
                discount_type={item.voucher.discount_type}
                used_date={item.used_date}
                company_id={this.props.company_id}
                expiry_date={item.expiry_date}
            />
        } else {
            return <UsedVoucher
                navigation={this.props.navigation}
                title={item.voucher.name}
                description={item.voucher.description}
                used_date={item.used_date}
                expiry_date={item.expiry_date}
            />
        }
    }
    render() {

        return <View
            style={styles.rewardView}>
            <View
                style={styles.availableView}>
                <View
                    style={styles.availableTwoView}>
                    { this.state.valid_selected && (
                        <View
                            style={styles.availablebarView}/>
                    )}
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
                        <TouchableOpacity
                            onPress={this.onAvailablePressed}
                            style={styles.availableButton}>
                            <Text
                                style={styles.availableButtonText}>Available</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        flex: 1,
                    }}/>
                <View
                    style={styles.usedView}>
                    { this.state.used_selected && (
                        <View
                            style={styles.usedbarView}/>
                    )}
                    <TouchableOpacity
                        onPress={this.onUsedPressed}
                        style={styles.usedButton}>
                        <Text
                            style={styles.usedButtonText}>Used</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View
                pointerEvents="box-none"
                style={{
                    flex: 1,
                }}>
                <View
                    style={styles.voucherviewView}>
                    <TouchableOpacity
                        onPress={this.onHowToUsePressed}
                        style={styles.howToUseButton}>
                        <Image
                            source={require("./../../assets/images/group-15-2.png")}
                            style={styles.howToUseButtonImage}/>
                        <Text
                            style={styles.howToUseButtonText}>How to use</Text>
                    </TouchableOpacity>
                    { this.state.loading && (
                        <View style={[styles.container, styles.horizontal]}>
                            <ActivityIndicator size="large" />
                        </View>
                    )}
                    <View
                        style={styles.voucherlistviewFlatListViewWrapper}>
                        <FlatList
                            renderItem={this.renderVouchertableFlatListCell}
                            data={this.state.current_data}
                            style={styles.voucherlistviewFlatList}
                            refreshing={this.state.isRefreshing}
                            onRefresh={this.onRefresh.bind(this)}
                            onEndReachedThreshold={0.1}
                            onEndReached={this.loadMore.bind(this)}
                            keyExtractor={(item, index) => index.toString()}/>
                    </View>
                </View>
                {/*<View*/}
                {/*	style={styles.novoucherviewView}>*/}
                {/*	<Image*/}
                {/*		source={require("./../../assets/images/brew9-doodle-03.png")}*/}
                {/*		style={styles.storeimageImage}/>*/}
                {/*	<Text*/}
                {/*		style={styles.noRewardAvailableText}>No reward available</Text>*/}
                {/*</View>*/}
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
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10 * alpha,
    },
    rewardView: {
        backgroundColor: "rgb(243, 243, 243)",
        flex: 1,
    },
    availableView: {
        backgroundColor: "white",
        height: 49 * alpha,
        flexDirection: "row",
        alignItems: "flex-start",
    },
    availableTwoView: {
        backgroundColor: "transparent",
        width: 187 * alpha,
        height: 49 * alpha,
    },
    availablebarView: {
        backgroundColor: "rgb(68, 68, 68)",
        position: "absolute",
        alignSelf: "center",
        width: 67 * alpha,
        bottom: 0,
        height: 2 * alpha,
    },
    availableButton: {
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        height: 49 * alpha,
    },
    availableButtonText: {
        color: "rgb(68, 68, 68)",
        fontFamily: "DINPro-Bold",
        fontSize: 16 * fontAlpha,
        fontStyle: "normal",
        fontWeight: "bold",
        textAlign: "left",
    },
    availableButtonImage: {
        resizeMode: "contain",
        marginRight: 10 * alpha,
    },
    usedView: {
        backgroundColor: "transparent",
        width: 187 * alpha,
        height: 49 * alpha,
        marginRight: 1 * alpha,
    },
    usedbarView: {
        backgroundColor: "rgb(68, 68, 68)",
        position: "absolute",
        alignSelf: "center",
        width: 67 * alpha,
        bottom: 0,
        height: 2 * alpha,
    },
    usedButton: {
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        height: 49 * alpha,
    },
    usedButtonText: {
        color: "rgb(118, 118, 118)",
        fontFamily: "SFProText-Medium",
        fontSize: 16 * fontAlpha,
        fontStyle: "normal",
        fontWeight: "bold",
        textAlign: "left",
    },
    usedButtonImage: {
        resizeMode: "contain",
        marginRight: 10 * alpha,
    },
    voucherviewView: {
        backgroundColor: "transparent",
        position: "absolute",
        left: 0 * alpha,
        right: 0 * alpha,
        top: 0 * alpha,
        bottom: 0 * alpha,
    },
    howToUseButton: {
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        alignSelf: "flex-end",
        width: 80 * alpha,
        height: 23 * alpha,
        marginRight: 15 * alpha,
        marginTop: 10 * alpha,
    },
    howToUseButtonImage: {
        resizeMode: "contain",
        marginRight: 10 * alpha,
    },
    howToUseButtonText: {
        color: "rgb(151, 151, 151)",
        fontFamily: "Helvetica",
        fontSize: 11 * fontAlpha,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
    },
    voucherlistviewFlatList: {
        backgroundColor: "transparent",
        width: "100%",
        height: "100%",
    },
    voucherlistviewFlatListViewWrapper: {
        flex: 1,
    },
    novoucherviewView: {
        backgroundColor: "transparent",
        position: "absolute",
        alignSelf: "center",
        width: 375 * alpha,
        top: 0 * alpha,
        height: 490 * alpha,
        alignItems: "flex-start",
    },
    storeimageImage: {
        backgroundColor: "transparent",
        resizeMode: "contain",
        width: 375 * alpha,
        height: 91 * alpha,
        marginTop: 165 * alpha,
    },
    noRewardAvailableText: {
        backgroundColor: "transparent",
        color: "rgb(190, 190, 190)",
        fontFamily: "Helvetica",
        fontSize: 12 * fontAlpha,
        fontStyle: "normal",
        fontWeight: "normal",
        textAlign: "left",
        alignSelf: "center",
        marginTop: 14 * alpha,
    },
    redeemrewardButton: {
        backgroundColor: "rgb(255, 254, 254)",
        borderWidth: 0.5,
        borderColor: "rgb(215, 215, 215)",
        borderStyle: "solid",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
        height: 51 * alpha,
    },
    redeemrewardButtonImage: {
        resizeMode: "contain",
        marginRight: 10 * alpha,
    },
    redeemrewardButtonText: {
        color: "rgb(82, 82, 82)",
        fontFamily: "SFProText-Medium",
        fontSize: 15 * fontAlpha,
        fontStyle: "normal",
        fontWeight: "bold",
        textAlign: "right",
    },
})
