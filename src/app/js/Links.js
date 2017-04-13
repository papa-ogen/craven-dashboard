// import { sortBy, first } from 'underscore';

/**
 * Represents a book.
 * @constructor
 */
class Links {
  /**
   * Represents a book.
   * @constructor
   * @param {array} links - Array of link objects
   */
    constructor(links) {
        this.links = links;
    }

    /**
     * Nr of links
     @return {number} links - number of links
     */
    getTotalLinks() {
      return this.links.length;
    }
}

export default Links;
