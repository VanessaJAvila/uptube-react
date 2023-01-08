import { useState } from "react";
import "./Description.scss"

export default function Description({ id, description = "" }) {
    const [expanded, setExpanded] = useState(false);
    const shortDescription = description.slice(0, 250);

    return (
        <div className="description-container">
            <p className="description-text">
                {expanded ? description : shortDescription}
            </p>
            {!expanded && description.length > 250 && (
                <a href="#" onClick={() => setExpanded(true)}>
                    Show more
                </a>
            )}
            {expanded && (
                <a href="#" onClick={() => setExpanded(false)}>
                    Show less
                </a>
            )}
        </div>
    );
}
