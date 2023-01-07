import "./ProgressBar.scss"
import React from 'react';

export default function ProgressBar(props) {
    return (
        <div className="progress-bar">
            <div
                className="progress-bar-fill"
                style={{ width: `${props.value}%` }}
            >
                {props.value}%
            </div>
        </div>
    );
}
