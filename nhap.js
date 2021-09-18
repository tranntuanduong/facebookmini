const User = {
  id: 1,
  email: "",
  username: "",
  avatar: "",
  coverImg: "",
  phonenumber: "",
  friends: [
    {
      id: 1,
      username: "",
      avatar: "",
    },
  ],
  followingIds: ["id1", "id2", "id3"],
  followerIds: ["id1", "id2", "id3"],
  detailList: [
    {
      // detail item
      keyIcon: "work",
      name: "Học vấn",
      text: "",
      isPublic: true,
    },
  ],
};

const Post = {
  id: 1,
  userId: 2,
  desc: "",
  // pictures - update later
  picture: "",
  likes: [
    {
      type: "wow",
      userId: 1,
    },
  ],
  commentIds: [1, 2, 3, 4],
  isPublic: true,
};

const Comment = {
  id: 1,
  userId: 1,
  text: "",
  likes: [
    {
      type: "haha",
      userId: 1,
    },
  ],
  subCommentIds: [1, 2, 3, 4],
};

const SubComment = {
  id: 1,
  userId: 1,
  text: "",
  likes: [
    {
      type: "haha",
      userId: 1,
    },
  ],
};

const Conversation = {
  id: 1,
  memberIds: [1, 2, 3],
};

const Message = {
  id: 1,
  conversationId: 1, //best
  senderId: 1,
  text: "",
};

export const conversations = [];
