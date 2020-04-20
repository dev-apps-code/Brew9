import React from 'react'
import {
    View,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import Swiper from 'react-native-swiper'
import BannerCell from "./BannerCell"
import { alpha, fontAlpha } from "../Common/size";

export default class ImageCell extends React.PureComponent {
    render() {
        let { image, containerStyle } = this.props
        let isArray = Array.isArray(image)
        if (image) {
            if (isArray) {
                return (

                    <View style={[styles.imageblockView, containerStyle]}>
                        <Swiper showsPagination={true} autoplay={false} paginationStyle={{ bottom: 5 }}>
                            {
                                image.map((item, index) => {
                                    return (<Image
                                        key={index}
                                        source={{ uri: item.url }}
                                        style={styles.productimageImage} />)
                                }
                                )
                            }
                        </Swiper>
                    </View>

                )
            } else {
                return (
                    <View
                        style={styles.imageblockView}>
                        <Image
                            source={{ uri: image.url }}
                            style={styles.productimageImage} />
                    </View>

                )

            }

        } else {
            return (<View />)
        }


    }


}


const styles = StyleSheet.create({
    imageblockView: {
        backgroundColor: "white",
        width: "100%",
        marginTop: 21 * alpha,
        height: 150 * alpha,
        alignItems: "center",
        justifyContent: 'center',
        // flex: 1

    },
    productimageImage: {
        backgroundColor: "transparent",
        resizeMode: "cover",
        width: 150 * alpha,
        height: 150 * alpha,
        // marginLeft: 5 * alpha,
        alignSelf: 'center'
    },
})
