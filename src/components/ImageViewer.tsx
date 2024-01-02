import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";

function ImageViewer({ src }: { src: string }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const animationProps = useSpring({
    opacity: loaded ? 1 : 0,
    transform: modalOpen ? "scale(1)" : "scale(0.5)",
  });

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <img src={src} onClick={openModal} alt="Image Viewer" />
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 100,
          }}
          onClick={closeModal}
        >
          <animated.img
            style={animationProps}
            src={src}
            onLoad={() => setLoaded(true)}
            alt="Image Viewer"
            width="50%"
            height="50%"
          />
        </div>
      )}
    </div>
  );
}

export default ImageViewer;
