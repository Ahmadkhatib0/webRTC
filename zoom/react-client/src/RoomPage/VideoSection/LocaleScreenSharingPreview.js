import React, { useEffect, useRef } from "react";

const LocaleScreenSharingPreview = ({ stream }) => {
  const localePreviewRef = useRef();
  useEffect(() => {
    const video = localePreviewRef.current;
    video.srcObject = stream;
    video.onloadedmetadata = () => video.play();
  }, [stream]);
  return (
    <div className="local_screen_share_preview">
      <video muted autoPlay ref={localePreviewRef}></video>
    </div>
  );
};

export default LocaleScreenSharingPreview;
