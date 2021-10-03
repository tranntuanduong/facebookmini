import React, { useEffect, useRef, useState } from 'react';

ProgressTimeOut.propTypes = {};

function ProgressTimeOut({ storyViewer, showStoryIndex, pauseFlagMouse }) {
    const [value, setValue] = useState();
    const interval = useRef(null);

    // bugggggggg ????????????!!!!!!!!!!!!!!!!!!!!!!!!
    // ---->> fixed: clearInterval: each interval have a uni key*
    useEffect(() => {
        clearInterval(interval.current);
        setValue(0);
        if (storyViewer.length > 0) {
            interval.current = setInterval(() => {
                let newValue = 0;
                if (!pauseFlagMouse.current) {
                    setValue((prevValue) => {
                        newValue = prevValue + 1;

                        if (newValue >= 100) {
                            clearInterval(interval.current);
                            newValue = 100;
                        }

                        return newValue;
                    });
                }
            }, 50);
        }
    }, [storyViewer, showStoryIndex, pauseFlagMouse]);

    return (
        <ul className="storyProgessList">
            {Array.from(new Array(storyViewer.length)).map((x, index) => (
                <li key={index} className="storyProgessItem">
                    <div
                        className="storyProgessItemProgress"
                        style={{
                            width:
                                index === showStoryIndex
                                    ? `${value}%`
                                    : index > showStoryIndex
                                    ? `0%`
                                    : '100%',
                        }}
                    ></div>
                </li>
            ))}
        </ul>
    );
}

export default ProgressTimeOut;
