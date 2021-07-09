import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  Linking,
} from "react-native";
import { Avatar, SocialIcon } from "react-native-elements";

const DevelopersData = [
  {
    id: "1",
    name: "Rishi singh",
    img:
      "https://avatars1.githubusercontent.com/u/47683539?s=400&u=69de166fad6eade9f1bac3d940c883a3e9eac520&v=4",
    github: "https://www.github.com/rishi-singh26",
    linkedin: "https://www.linkedin.com/in/rishi-singh-b2226415b/",
    description: "Lead developer and Database designer",
  },
  {
    id: "2",
    name: "Aniket",
    img: "https://avatars2.githubusercontent.com/u/40296077?s=400&v=4",
    github: "https://github.com/imanik8",
    linkedin: "https://www.linkedin.com/in/imanik8/",
    description: "FrontEnd and Database developer",
  },
  {
    id: "3",
    name: "Anuj Kumar",
    img: "https://avatars2.githubusercontent.com/u/47420066?s=400&v=4",
    github: "https://github.com/anujsaxena9127/",
    linkedin: "https://www.linkedin.com/in/anuj-kumar-b85247183/",
    description: "Database Developer",
  },
  {
    id: "4",
    name: "Vishal",
    img: "https://avatars2.githubusercontent.com/u/47420066?s=400&v=4",
    github: "https://github.com/anujsaxena9127/",
    linkedin: "https://www.linkedin.com/in/anuj-kumar-b85247183/",
    description: "Resource Generator",
  },
];

function Item({ title, image, description, github, linkedin }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#fff",
        marginTop: 10,
        marginBottom: 10,
        padding: 20,
      }}
    >
      <View style={{ flex: 5 }}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            minHeight: 20,
          }}
        >
          {title}
        </Text>
        <Text style={{ fontSize: 17, maxWidth: 300 }}>{description}</Text>
        <View
          duration={1500}
          animation="fadeIn"
          style={{ flex: 1, flexDirection: "row" }}
        >
          <SocialIcon
            type="linkedin"
            light
            raised={false}
            onPress={() => Linking.openURL(linkedin)}
          />
          <SocialIcon
            type="github"
            light
            raised={false}
            onPress={() => Linking.openURL(github)}
          />
        </View>
      </View>
      <View
        duration={1500}
        animation="fadeIn"
        style={{
          flex: 1,
        }}
      >
        <Avatar
          rounded
          size="medium"
          source={{
            uri: image,
          }}
        />
      </View>
    </View>
  );
}

class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDevelopersData: false,
      showDevelopersBtnText: "More About Developers",
    };
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <FlatList
          ListHeaderComponent={() => (
            <>
              <View
                style={{
                  flex: 1,
                  justifyContent: "flex-start",
                  marginTop: 50,
                  flexDirection: "row",
                }}
              >
                <Image
                  source={require("../../assets/icon.png")}
                  style={{ width: 50, height: 50 }}
                />
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    alignSelf: "center",
                    marginLeft: 15,
                  }}
                >
                  DOCTO
                </Text>
              </View>
              <View style={{ marginVertical: 15, marginHorizontal: 8 }}>
                <Text style={{ fontSize: 18 }}>
                  An app to create appointments with doctors and to buy
                  medicines from the pharmacy in your neighbourhood.
                </Text>
              </View>
            </>
          )}
          data={DevelopersData}
          renderItem={({ item }) => (
            <Item
              title={item.name}
              image={item.img}
              description={item.description}
              github={item.github}
              linkedin={item.linkedin}
            />
          )}
          keyExtractor={(item) => item.id}
          style={{ paddingHorizontal: 20 }}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    );
  }
}

export default About;
