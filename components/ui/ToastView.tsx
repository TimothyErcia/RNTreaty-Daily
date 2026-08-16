import { Colors } from "@/constants/Colors";
import { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, StyleSheet, Text, View } from "react-native";
import { ACTIONRESPONSE } from "../props/CreateTaskProp";
import { useToastStore } from "../states/ToastState";

function ToastView() {
  const toastState = useToastStore();
  const toastTransition = useRef(new Animated.Value(-1000)).current;

  const backdropType = () => {
    if (toastState.currentToast.type === ACTIONRESPONSE.CREATED) {
      return backdropStyle.created;
    } else if (toastState.currentToast.type === ACTIONRESPONSE.UPDATED) {
      return backdropStyle.updated;
    }
    return backdropStyle.deleted;
  };

  useEffect(() => {
    Animated.timing(toastTransition, {
      toValue: -870,
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      duration: 600,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(toastTransition, {
        toValue: -1000,
        easing: Easing.bezier(0.68, -0.6, 0.32, 1.6),
        duration: 800,
        useNativeDriver: true,
      }).start(() => {
        toastState.updateAnimationEnd(true);
      });
    }, 1000);
  }, []);

  return (
    <>
      <Animated.View
        style={[
          {
            transform: [{ translateX: 0 }, { translateY: toastTransition }],
          },
        ]}
      >
        <View style={[styles.backdrop, backdropType()]}></View>
        <View style={styles.container}>
          <View style={styles.toastView}>
            <Text style={styles.toastMessage}>{toastState.currentToast.message}</Text>
          </View>
        </View>
      </Animated.View>
    </>
  );
}

const backdropStyle = StyleSheet.create({
  created: {
    backgroundColor: Colors.light.foodCategory,
  },
  updated: {
    backgroundColor: Colors.light.homeCategory,
  },
  deleted: {
    backgroundColor: Colors.light.personalCategory,
  },
});

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "#fffff4",
    width: 250,
    height: 40,
    borderRadius: 10,
    position: "absolute",
    top: 95,
    left: Dimensions.get("screen").width / 4.75,
  },
  backdrop: {
    position: "absolute",
    top: 100,
    left: Dimensions.get("screen").width / 4.5,
    borderRadius: 10,
    width: 250,
    height: 40,
  },
  toastView: {
    paddingHorizontal: 16,
  },
  toastMessage: {
    fontSize: 12,
    fontFamily: "inter",
  },
});

export default ToastView;
