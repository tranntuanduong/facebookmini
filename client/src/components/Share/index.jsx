import React, { useRef, useState } from 'react';
import { NO_AVARTAR, PF } from '../../constants';
import './Share.css';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';

Share.propTypes = {};

function Share({ currentUser, posts, setPosts }) {
    const [desc, setDesc] = useState('');
    const [files, setFiles] = useState(null);

    const handleShareSubmmit = async (e) => {
        e.preventDefault();

        const imgCollections = [];
        if (files) {
            const formData = new FormData();

            // const imgs = [];
            // for (let i = 0; i < files.length; i++) {
            //     // append name before file to prevent proxy error
            //     formData.append(`names[${i}]`, Date.now() + files[i].name);
            //     formData.append(`images[${i}]`, files[i]);
            //     imgs.push(`/${Date.now() + files[i].name}`);
            // }
            for (const key of Object.keys(files)) {
                formData.append('imgCollections', files[key]);
                imgCollections.push(files[key].name);
            }

            // Display the values
            // for (var value of formData.values()) {
            //     console.log(value);
            // }
            try {
                await axios.post('/uploads', formData);
            } catch (error) {
                console.log(error);
            }
        }

        const newPost = {
            userId: currentUser._id,
            desc: desc,
            imgCollections: imgCollections,
        };

        const res = await axios.post('/posts', newPost);
        setPosts([...posts, res.data]);
        setDesc('');
        setFiles(null);
    };

    const handleDescChange = (e) => {
        setDesc(e.target.value);
    };

    return (
        <form className="share" onSubmit={handleShareSubmmit}>
            <div className="shareTop">
                <img
                    src={`${PF}/${currentUser.avatar ? currentUser.avatar : NO_AVARTAR}`}
                    alt=""
                    className="shareTopImg"
                />
                <input
                    type="text"
                    placeholder={`${currentUser.lastName} ơi, bạn đang nghĩ gì thế?`}
                    className="shareTopInput"
                    value={desc}
                    onChange={handleDescChange}
                />
            </div>

            {files && (
                <div className="shareImgContainer">
                    {Object.keys(files)
                        .slice(0, 4)
                        .map((key, index) => (
                            <div key={index} className="shareImgItemWrap">
                                {index < 3 ? (
                                    <>
                                        <img src={URL.createObjectURL(files[key])} alt="" className="shareImg" />
                                        <CloseIcon className="shareCancelImg" />
                                    </>
                                ) : (
                                    <>
                                        <img src={URL.createObjectURL(files[key])} alt="" className="shareImg" />
                                        <CloseIcon className="shareCancelImg" />
                                        {Object.keys(files).length > 4 && (
                                            <div className="moreImg">+{Object.keys(files).length - 4}</div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                </div>
            )}

            <div className="shareBottom">
                <div className="shareBottomAction">
                    <div
                        className="shareBottomActionItemBg"
                        style={{
                            backgroundImage: `url("/assets/feed/imgAction.png")`,
                            backgroundPosition: '0 0',
                        }}
                    ></div>
                    <span className="shareBottomActionItemText">Video trực tiếp</span>
                </div>
                <label htmlFor="file" className="shareBottomAction">
                    <div
                        className="shareBottomActionItemBg"
                        style={{
                            backgroundImage: `url("/assets/feed/imgAction.png")`,
                            backgroundPosition: '0 -275px',
                        }}
                    ></div>
                    <span className="shareBottomActionItemText">Ảnh/Video</span>
                </label>
                <input
                    style={{ display: 'none' }}
                    type="file"
                    id="file"
                    accept=".png, .jpeg, .jpg"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                />
                <div className="shareBottomAction">
                    <div
                        className="shareBottomActionItemBg"
                        style={{
                            backgroundImage: `url("/assets/feed/imgAction.png")`,
                            backgroundPosition: '0 -50px',
                        }}
                    ></div>
                    <span className="shareBottomActionItemText">Cảm xúc/Hoạt động</span>
                </div>
            </div>
        </form>
    );
}

export default Share;
