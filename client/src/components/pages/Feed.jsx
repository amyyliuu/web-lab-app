import React from "react";
import { Link } from "react-router-dom";

function Feed() {
    return (
        <div className="feed">
            <h1>Feed Page</h1>
            <p>This is the Feed page.</p>
            {/* Link back to the Skeleton page */}
            <Link to="/">Go to Skeleton</Link>
        </div>
    );
}

export default Feed;
