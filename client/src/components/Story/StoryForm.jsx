import axios from 'axios';
import React, { useState } from 'react';
import { BACKGROUND_LIST } from '../../constants';

StoryForm.propTypes = {};

function StoryForm({
    text,
    setText,
    background,
    setBackground,
    currentUser,
    createStoryMode,
    setCreateStoryMode,
}) {
    const [colorIndex, setColorIndex] = useState(0);

    const textChangeHandler = (e) => {
        setText(e.target.value);
    };

    const changeBackgroundHandler = (color, index) => {
        setBackground(color);
        setColorIndex(index);
    };

    const submitStoryFormHandler = async (e) => {
        e.preventDefault();
        const newStory = {
            userId: currentUser._id,
            desc: text,
            style: {
                background: background,
            },
        };
        console.log('story:', newStory);
        try {
            await axios.post('/stories', newStory);
            window.location.href = 'http://localhost:3000/';
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form className="storyForm" onSubmit={submitStoryFormHandler}>
            {createStoryMode === 'text' && (
                <>
                    <textarea
                        name="storyText"
                        placeholder="Bắt đầu nhập..."
                        className="storyFormArea"
                        value={text}
                        onChange={textChangeHandler}
                    ></textarea>
                    <div className="storyFormColor">
                        <div className="storyFormColorTitle">Phông nền</div>
                        <ul className="storyFormColorList">
                            {BACKGROUND_LIST.map((background, index) => (
                                <li
                                    key={index}
                                    className={
                                        colorIndex === index
                                            ? 'storyFormColorItem chosen'
                                            : 'storyFormColorItem'
                                    }
                                    style={{
                                        background: background,
                                    }}
                                    onClick={() => changeBackgroundHandler(background, index)}
                                ></li>
                            ))}
                        </ul>
                    </div>
                    <div className="storyFormBtnWrap">
                        <div
                            className="storyFormBtn storyFormBtnDefault"
                            onClick={() => setCreateStoryMode(null)}
                        >
                            Bỏ
                        </div>
                        <button type="submit" className="storyFormBtn storyFormBtnPrimary">
                            Chia sẻ lên tin
                        </button>
                    </div>
                </>
            )}

            {createStoryMode === 'img' && (
                <>
                    <div className="storyFormAddTextWrap">
                        <div className="storyFormAddTextIcon"></div>
                        <div className="storyFormAddTextTitle">Thêm văn bản</div>
                    </div>
                    <div className="storyFormBtnWrap">
                        <div
                            className="storyFormBtn storyFormBtnDefault"
                            onClick={() => setCreateStoryMode(null)}
                        >
                            Bỏ
                        </div>
                        <button type="submit" className="storyFormBtn storyFormBtnPrimary">
                            Chia sẻ lên tin
                        </button>
                    </div>
                </>
            )}
        </form>
    );
}

export default StoryForm;
