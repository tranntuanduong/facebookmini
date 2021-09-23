const User = {
  id: 1,
  email: "",
  username: "",
  password: "",
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
      userId: 1,
      type: "wow",
    },
  ],
  commentIds: [1, 2, 3, 4],
  isPublic: true,
};

const Comment = {
  id: 1,
  postId: 1,
  userId: 1,
  text: "",
  likes: [
    {
      type: "haha",
      userId: 1,
    },
    {
      type: "wow",
      userId: 2,
    },
  ],
  subCommentIds: [1, 2, 3, 4],
};

const SubComment = {
  id: 1,
  userId: 1,
  replyToId: 2,
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

// convert default like to:::
const array1 = [
  { type: "like", userId: "61486a3ac108c4be6b6f0f7b" },
  { type: "like", userId: "61486c967181a46fbdabafd3" },
  { type: "sad", userId: "614856eca6aa06de2b0c0ff9" },
];

const array2 = {
  like: [
    "61486a3ac108c4be6b6f0f7b",
    "61486c967181a46fbdabafd3, 614856eca6aa06de2b0c0ff9",
  ],
  sad: ["614856eca6aa06de2b0c0ff9"],
  haha: ["614856eca6aa06de2b0c0ff9, 614856eca6aa06de2b0c0ff9"],
};

const array3 = [
  ["like", "... 3 element"],
  ["haha", "... 2 element"],
  ["sad", "... 1 element"],
];
