// NotificationTabBarIcon.js

import React from "react";
import {
  Text,
  Image
} from "react-native";
import { connect } from "react-redux";
import IconBadge from 'react-native-icon-badge';
import { alpha, fontAlpha } from "../Common/size";
import { TITLE_FONT, NON_TITLE_FONT, TABBAR_INACTIVE_TINT, TABBAR_ACTIVE_TINT, PRIMARY_COLOR, TABBAR_INACTIVE_TINT_CROWN } from "../Common/common_style";

const MissionBadgeIcon = props => (

  <IconBadge
    MainElement={
      <Image
        source={props.image}
        style={{ resizeMode: "contain", width: 28 * alpha, height: 28 * alpha, tintColor: props.focused ? TABBAR_ACTIVE_TINT : TABBAR_INACTIVE_TINT_CROWN }} />}
    BadgeElement={
      <Text style={{ color: '#FFFFFF', fontSize: 10 * alpha, fontFamily: TITLE_FONT }}>{props.unclaimedMission}</Text>
    }
    IconBadgeStyle={
      {
        position: 'absolute',
        top: 1,
        right: -5 * alpha,
        minWidth: 15 * alpha,
        height: 15 * alpha,
        borderRadius: 15 * alpha,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF0000',
        opacity: 1,
      }
    }
    Hidden={props.unclaimedMission == 0 || props.unclaimedMission == undefined} />)

export default connect(
  ({ members }) => ({
    unclaimedMission: members.unclaimedMission
  })
)(MissionBadgeIcon);
