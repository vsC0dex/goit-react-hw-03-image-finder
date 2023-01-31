import { Component } from 'react';
import axios from 'axios';
import { Triangle } from 'react-loader-spinner';

import styles from './images-search.module.css';

class ImagesSearch extends Component {
  state = {
    items: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get('https://pixabay.com/api/?key=30765883-517ae795d1e2950758ca42c2f')
      .then(({ data: { hits } }) => {
        this.setState({ items: hits });
      })
      .catch(error => {
        this.setState({ error: error.message });
      })
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { items, loading, error } = this.state;
    const image = items.map(({ id, webformatURL, tags }) => (
      <li key={id} className={styles.ImageGalleryItem}>
        <img
          className={styles.ImageGalleryItem_image}
          src={webformatURL}
          alt={tags}
        />
      </li>
    ));
    return (
      <>
        <div className={styles.App}>
          <header className={styles.Searchbar}>
            <form className={styles.SearchForm}>
              <button type="submit" className={styles.SearchForm_button}>
                Search
                <span className={styles.SearchForm_button_label}></span>
              </button>

              <input
                className={styles.SearchForm_input}
                type="text"
                autoComplete="off"
                autoFocus
                placeholder="Search images and photos"
              />
            </form>
          </header>
          {loading && (
            <Triangle
              height="180"
              width="180"
              color="#4fa94d"
              ariaLabel="triangle-loading"
              // wrapperStyle={{}}
              // wrapperClassName={styles.Loading}
              visible={true}
            />
          )}
          {error && <p>{error}</p>}
          <ul className={styles.ImageGallery}>{image}</ul>
        </div>
      </>
    );
  }
}

export default ImagesSearch;
