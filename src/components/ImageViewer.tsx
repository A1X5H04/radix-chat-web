import React, { useState } from "react";
import Image from "next/image";
import { useTransition, animated } from "@react-spring/web";

function ImageViewer({ src }: { src: string }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Image
        src={src}
        width={200}
        height={250}
        onClick={openModal}
        alt="Image Viewer"
      />
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
            backgroundColor: "rgba(0, 0, 0, 0.95)",
            zIndex: 100,
          }}
          onContextMenu={(event) => event.stopPropagation()}
          onClick={closeModal}
        >
          <div>
            <animated.img
              src={src}
              onLoad={() => setLoaded(true)}
              alt="Image Viewer"
              width="100%"
              height="100%"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageViewer;
