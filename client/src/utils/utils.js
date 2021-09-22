// convert likes db -> likes viewer
export const likeUtils = (likes) => {
    const topLike = {};

    // convert default likes: detail in nhap.js
    likes.forEach((i) => {
        if (topLike.hasOwnProperty(i.type)) {
            topLike[`${i.type}`].push(i.userId);
        } else {
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
