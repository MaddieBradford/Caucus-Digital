import { LibraryProvider, LibraryCategory, LibraryImage } from "photoeditorsdk";

class MyProvider extends LibraryProvider {
  /**
   * This is a method explicitly created for this provider. It makes sure our data
   * JSON has been loaded from the server.
   * @return {Promise}
   * @private
   */
  loadData() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return this.loadJSON(
      "https://img.ly/static/libraries/unsplash/metadata.json"
    ).then((data) => {
      this.data = data;
      return data;
    });
  }

  /**
   * Returns the categories
   * @return {Promise}
   * @resolve {LibraryCategory[]}
   * @abstract
   */
  getCategories() {
    return this.loadData().then((data) => {
      // Create `Category` instances from our data
      return data.categories.map((categoryData) => {
        return new LibraryCategory({
          name: categoryData.name,
          coverImageUrl: categoryData.coverImage,
        });
      });
    });
  }

  /**
   * Returns the images for the given search query
   * @param {String} query
   * @return {Promise}
   * @resolve {LibraryImage[]}
   * @abstract
   */
  searchImages(query) {
    return this._loadData().then((data) => {
      return data.images
        .filter((image) => {
          // Split query by spaces, make sure all words are present in image title
          var words = query.split(/\s+/);
          for (var i = 0; i < words.length; i++) {
            var word = words[i];
            var regexp = new RegExp(word, "i");
            if (!regexp.test(image.title)) {
              return false;
            }
          }

          return true;
        })
        .map((imageData) => {
          return new Image(imageData);
        });
    });
  }
}