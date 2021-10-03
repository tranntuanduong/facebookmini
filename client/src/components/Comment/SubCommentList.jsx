import React from 'react';
import SubCommentItem from './SubCommentItem';

function SubCommentList({ subComments }) {
    return (
        <ul className="commentList">
            {subComments.map((subComment) => (
                <li key={subComment._id} className="commentItem">
                    <SubCommentItem subComment={subComment} />
                </li>
            ))}
        </ul>
    );
}

export default SubCommentList;
