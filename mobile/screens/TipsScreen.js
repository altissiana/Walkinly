import React, { Component } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ImageBackground
} from "react-native";

const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
  const paddingToBottom = 20;
  return (
    layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
  );
};

class TipsScreen extends Component {
  static navigationOptions = {
    headerStyle: {
      height: 40,
      backgroundColor: 'black',
      zIndex: 1,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,

      elevation: 24,
    },
    headerTitle: "Tips and Advice",
    headerTitleStyle: {
      fontSize: 30,
      color: 'white',
      fontFamily: 'Arial'
    },
    headerTitleContainerStyle: {
      top: -16
    }
  };

  state = {
    accepted: false
  };

  render() {
    return (
      <ImageBackground
        source={require("../assets/grady5.jpg")}
        style={styles.img}
      >
        <View style={styles.container}>
          <ScrollView
            style={styles.tcContainer}
            onScroll={({ nativeEvent }) => {
              if (isCloseToBottom(nativeEvent)) {
                this.setState({
                  accepted: true
                });
              }
            }}
            scrollEventThrottle={32}
          >
            <Text style={styles.tcL}>
              <Text style={styles.bold}>Keep your keys ready</Text>
              {"\n"}
              Even if it's a quick jaunt from your front door to your car, it's
              a good idea to keep your keys ready at all times. Hold on to them
              inside your pocket. Then, bring them out holding the proper key in
              position as you approach your car or front door. This will
              eliminate fumbling around in your purse for them outside, which
              will distract you from your surroundings.
            </Text>
            <Text style={styles.tcL}>
              <Text style={styles.bold}>Walk with confidence</Text>
              {"\n"}
              Walk with confidence and purpose when you're out solo. Keep your
              head up and don't be afraid to make eye contact with those you
              pass. Walk at a steady pace and walk facing traffic to keep
              yourself visible. If you get lost, don't wander aimlessly. Keep
              your pace steady and head for the nearest store or restaurant to
              ask for directions.
            </Text>
            <Text style={styles.tcL}>
              <Text style={styles.bold}>Trust your gut</Text>
              {"\n"}
              When out alone at night, your instincts are your best friend. If
              you are worried someone is following you, turn around. Let the
              person know you're aware of their presence. Don't head straight
              for your car or home, but go to a nearby store or restaurant,
              somewhere public and safe.{" "}
            </Text>
            <Text style={styles.tcL}>
              <Text style={styles.bold}>
                Carry a noisy friend (Like our SOS button!)
              </Text>
              {"\n"}
              Keep some kind of noisemaker on your keychain or pinned to your
              jacket. A personal alarm or whistle can be used to let those
              around you know when something is wrong.{" "}
            </Text>
            <Text style={styles.tcL}>
              <Text style={styles.bold}>
                Know what to do in the worst-case scenario
              </Text>
              {"\n"}A woman's best defence against an attack is awareness and
              action. If you are faced with an uncomfortable or dangerous
              situation and you can escape, do so immediately. Only you can
              determine what you can or will do when faced with an attacker.
              Self-defence moves and tips can be found from various web sources,
              or through community self-defence classes.{" "}
            </Text>
            <Text style={styles.tcL}>
              <Text style={styles.bold}>
                Avoid struggling with lots of bags
              </Text>
              {"\n"}
              Struggling with five different bags at night as you make your way
              into the house can be a fact of life, but you should avoid it
              whenever possible. Multiple bags can prevent your ability to react
              quickly should a dangerous situation arise.{" "}
            </Text>
            <Text style={styles.tcL}>
              <Text style={styles.bold}>Avoid hiding spots</Text>
              {"\n"}
              Parked cars, dark alleys and unlit corners of parking garages are
              all places that you should avoid when you're out alone. Keep
              yourself in visible places on the sidewalk or street as much as
              possible.{" "}
            </Text>
            <Text style={styles.tcL}>
              <Text style={styles.bold}>Keep walkways clear</Text>
              {"\n"}
              In the winter, it's important to make sure any pathway from your
              car to your door is clear of ice and snow. Shovel the areas
              regularly and keep a container of sand, nonclumping cat litter or
              ice melt handy to control any icy situations. Keeping an extra
              container in your trunk is a good idea for any ice you encounter
              away from home.{" "}
            </Text>
            <Text style={styles.tcL}>
              <Text style={styles.bold}>Choose your footwear wisely</Text>
              {"\n"}
              Those leather pumps may look fantastic, but they won't provide the
              secure footing you need, especially in the winter when ice and
              snow are a factor. Choose footwear that is comfortable, such as
              runners. If necessary, wear one pair of shoes to the office and
              bring your indoor footwear in a bag.{" "}
            </Text>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

export default TipsScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 40,
    color: "white"
  },
  tcL: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
    color: "white"
  },
  tcContainer: {
    marginTop: 18,
    marginBottom: 15
  },
  img: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "cover"
  },

  bold: { fontWeight: "bold" },
  italic: { fontStyle: "italic" },
  underline: { textDecorationLine: "underline" }
});
