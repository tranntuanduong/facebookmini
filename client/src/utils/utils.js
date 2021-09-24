// convert likes db -> likes viewer
export const likeUtils = (likes) => {
    const topLike = {};

    // convert default likes: detail in nhap.js
    likes.forEach((i) => {
        if (topLike.hasOwnProperty(i.type)) {
            // topLike[`${i.type}`].push([i.userId, i.text]);
            topLike[`${i.type}`].push(i.userId);
        } else {
            // topLike[`${i.type}`] = [i.userId, i.text]; khong dung den key text
            topLike[`${i.type}`] = [i.userId];
        }
    });

    // console.log(topLike);
    const sortable = [];
    for (const property in topLike) {
        sortable.push([property, topLike[property]]);
    }

    sortable.sort(function (a, b) {
        return -(a[1].length - b[1].length);
    });
    while (sortable.length > 3) {
        sortable.pop();
    }

    return sortable;
};

export const sortDateUtils = (data) => {
    return data.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
};

// chooseLikeType handler: like  va doi type like
export const chooseLikeTypeUtils = (likes, currentUser, data, setLikes, setCurrentLikeIndex, setOpenChooseLikeType) => {
    if (likes.some((like) => like.userId === currentUser._id)) {
        // liked
        likes.splice(
            likes.findIndex((like) => like.userId === currentUser._id),
            1
        );
        const newLikes = [
            ...likes,
            { type: data.type, userId: currentUser._id, text: data.text, styleColor: data.styleColor },
        ];
        setLikes(newLikes);
    } else {
        const newLikes = [
            ...likes,
            { type: data.type, userId: currentUser._id, text: data.text, styleColor: data.styleColor },
        ];
        console.log('newLikes', newLikes);
        setLikes(newLikes);
        setCurrentLikeIndex(newLikes.findIndex((like) => like.userId === currentUser._id));
    }
    setOpenChooseLikeType(false);
};

// xu li like(su kien o nut like), dislike
export const likeBtnHanderUtils = (likes, currentUser, setLikes, setCurrentLikeIndex, data) => {
    if (likes.some((like) => like.userId === currentUser._id)) {
        // neu nhu da like:
        likes.splice(
            likes.findIndex((like) => like.userId === currentUser._id),
            1
        );
        setLikes([...likes]);
        setCurrentLikeIndex(likes.findIndex((like) => like.userId === currentUser._id));
    } else {
        const newLikes = [
            ...likes,
            { type: data.type, userId: currentUser._id, text: data.text, styleColor: data.styleColor },
        ];
        setLikes(newLikes);
        setCurrentLikeIndex(newLikes.findIndex((like) => like.userId === currentUser._id));
    }
};
