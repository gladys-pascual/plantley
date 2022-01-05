import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="skeleton-group-wrapper">
      <div className="skeleton-group">
        <div className="skeleton">
          <Skeleton variant="rectangular" width="100%" height={236} />
          <Skeleton width="90%" height={50} />
          <Skeleton width="60%" />
        </div>
        <div className="skeleton">
          <Skeleton variant="rectangular" width="100%" height={236} />
          <Skeleton width="90%" height={50} />
          <Skeleton width="60%" />
        </div>
        <div className="skeleton">
          <Skeleton variant="rectangular" width="100%" height={236} />
          <Skeleton width="90%" height={50} />
          <Skeleton width="60%" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
