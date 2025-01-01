import { Flex, Box } from "@chakra-ui/react";
import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

function PhotoGalery({ images }: { images: Array<any> }) {
  const renderImage = () => {
    const array = Array<any>();
    images?.map((img) => {
      array.push({
        original: `${process.env.NEXT_PUBLIC_API_URL}/storage/${img.img_path}`,
        thumbnail: `${process.env.NEXT_PUBLIC_API_URL}/storage/${img.img_path}`,
      });
    });

    return array;
  };
  const items = renderImage();

  return (
    <Flex direction="column" alignItems="center" width="100%">
      <Flex width="100%" flexWrap="wrap" padding="0 4px" alignItems="start">
        <Box width="100%">
          {renderImage().length !== 0 ? (
            <>
              <ImageGallery
                items={items}
                showFullscreenButton={false}
                showPlayButton={false}
              />
            </>
          ) : (
            <></>
          )}
        </Box>
      </Flex>
    </Flex>
  );
}

export default PhotoGalery;
