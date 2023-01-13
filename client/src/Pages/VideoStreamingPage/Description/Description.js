import { useState } from "react";
import "./Description.scss"

export default function Description({ id, description = "" }) {
    const [expanded, setExpanded] = useState(false);
    const shortDescription = description.slice(0, 250);

    return (
        <div className="description-container">
            <p className="description-text">
                {expanded ? description : shortDescription}
                {!expanded && description.length > 250 && (
                    <a href="#" onClick={(event) => {
                        event.preventDefault();
                        setExpanded(true);
                    }}>
                        Ver mais
                    </a>

                )}
                {expanded && (
                    <a href="#" onClick={(event) => {
                        event.preventDefault();
                        setExpanded(false);
                    }}>
                        Ver menos
                    </a>
                )}
            </p>

        </div>
    );
}
