import {sortBy} from 'underscore';

/**
* Links
*/
class Links {
  /**
  * @constructor
  * @param {array} links - array of link objects
  */
  constructor(links) {
    this.links = links;
  }

  /**
  * sort links by title
  */
  sortLinks() {
    this.links = sortBy(this.links, 'title');
  }

  /**
  * Link Header
  @param {object} link - link object
  @return {string} - header markup
  */
  linkHeader(link) {
   return `<header class="db-links-header"><h2>${ link.title }</h2></header>`;
  }

  /**
  * Link SubHeader
  @param {object} link - link object
  @param {number} count - link iteration number
  @return {string} - sub header markup
  */
  linkSubHeader(count, link) {
   return `<label for="toggle-${count}"><h4>${ link.name }</h4></label>
<input class="toggle" type="checkbox" id="toggle-${count}">`;
  }
}

/* global module*/
/* eslint no-undef: "error"*/
export default Links;
