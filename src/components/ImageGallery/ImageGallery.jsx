import styles from './image-gallery.module.css';

const ImageGallery = ({ items, showImage }) => {
  const image = items.map(({ id, webformatURL, tags, largeImageURL }) => (
    <li
      onClick={() => showImage({ tags, largeImageURL })}
      key={id}
      className={styles.ImageGalleryItem}
    >
      <img
        className={styles.ImageGalleryItem_image}
        src={webformatURL}
        alt={tags}
      />
    </li>
  ));
  return <ul className={styles.ImageGallery}>{image}</ul>;
};

export default ImageGallery;

ImageGallery.defaultProps = {
  items: [],
};
