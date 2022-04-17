import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Divider } from "react-native-elements";

import { firebase, db } from "../../firebase";

const postFooterIcon = [
  {
    name: "Like",
    imageUrl:
      "https://img.icons8.com/fluency-systems-regular/344/ffffff/hearts.png",
    likedImgeUrl: "https://img.icons8.com/color/344/ffffff/filled-like.png",
  },
  {
    name: "Comment",
    imageUrl:
      "https://img.icons8.com/fluency-systems-regular/344/ffffff/speech-bubble--v1.png",
  },
  {
    name: "Share",
    imageUrl:
      "https://img.icons8.com/fluency-systems-regular/344/ffffff/sent.png",
  },
  {
    name: "Save",
    imageUrl:
      "https://img.icons8.com/fluency-systems-regular/344/ffffff/bookmark-ribbon--v1.png",
  },
];

const Post = ({ post }) => {
  const handleLike = post => {
    const currenLikeStatus = !post.likes_by_users.includes  (
      firebase.auth().currentUser.email
    );
    db.collection("user")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        likes_by_users: currenLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.email
            )
          : firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.email
            ),
      })
      .then(() => {
        console.log("update");
      })
      .catch(error => {
        console.error("error Upadtess",error );
      });
  };

  return (
    <View style={{ marginBottom: 25 }}>
      <Divider width={1} orientation={"vertical"} />
      <PostHeader poster={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 10, marginTop: 8 }}>
        <PostFooter post={post} handleLike={handleLike} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostHeader = ({ poster }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 5,
      alignItems: "center",
    }}
    // profilepicture
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image source={{ uri: poster.profilepicture }} style={styles.story} />
      <Text style={{ color: "white", marginLeft: 5, fontWeight: "100" }}>
        {poster.user}
      </Text>
    </View>
    <Text style={{ color: "white", fontWeight: "bold", alignItems: "center" }}>
      ...
    </Text>
  </View>
);

const PostImage = ({ post }) => (
  <View style={{ width: "100%", height: 450 }}>
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: "100%", resizeMode: "cover" }}
    />
  </View>
);

const PostFooter = ({ handleLike, post }) => (
  <View style={{ flexDirection: "row" }}>
    <View style={styles.footerContainer}>
      <TouchableOpacity onPress={()=>handleLike(post)}>
        <Image
          style={styles.footericon}
          source={{ uri: postFooterIcon[0].imageUrl }}
        />
      </TouchableOpacity >
      {/* <Icon imgStyle={styles.footericon} imgUrl={postFooterIcon[0].imageUrl} /> */}
      <Icon imgStyle={styles.footericon} imgUrl={postFooterIcon[1].imageUrl} />
      <Icon
        imgStyle={[styles.footericon, styles.shareIcon]}
        imgUrl={postFooterIcon[2].imageUrl}
      />
    </View>
    <View style={{ flex: 1, alignItems: "flex-end" }}>
      <Icon imgStyle={styles.footericon} imgUrl={postFooterIcon[3].imageUrl} />
    </View>
  </View>
);

const Icon = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={{ uri: imgUrl }} />
  </TouchableOpacity>
);
/* tolocaleString is not working  */
const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 3, marginLeft: 3 }}>
    <Text style={{ color: "white", fontSize: 13, fontWeight: "bold" }}>
      {post.likes_by_users.length.toLocaleString("en")} likes
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginTop: 3 }}>
    <Text style={{ color: "white" }}>
      <Text style={{ fontWeight: "bold" }}>{post.user}</Text>
      <Text style={{ fontSize: 14 }}>{post.caption}</Text>
    </Text>
  </View>
);

const CommentSection = ({ post }) => (
  <View style={{ marginTop: 3 }}>
    {!!post.comments.length && (
      <Text style={{ color: "grey" }}>
        View {post.comments.length > 1 ? "all" : " "} {post.comments.length}
        {"  "}
        {post.comments.length > 1 ? "comments" : "comment"}
      </Text>
    )}
  </View>
);

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: "row" }}>
        <Text style={{ color: "white" }}>
          <Text style={{ fontWeight: "bold" }}>
            {comment.user}
            {"  "}
          </Text>
          {comment.comment}
        </Text>
      </View>
    ))}
  </>
);

const styles = StyleSheet.create({
  story: {
    marginTop: 3,

    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 5,
    borderWidth: 1,
    borderColor: "#ff8501",
  },

  footericon: {
    width: 33,
    height: 33,
  },

  footerContainer: {
    flexDirection: "row",
    width: "32%",
    justifyContent: "space-between",
  },

  shareIcon: {
    marginTop: -5,
    alignItems: "center",
    transform: [{ rotate: "320deg" }],
  },
});

export default Post;
