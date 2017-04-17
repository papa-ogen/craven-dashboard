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
    this.links = sortBy(links, 'title');
    let dbLinks = document.getElementsByClassName('db-links')[0];
    let content = [];
    let self = this;

    this.links.map(function(link, index){
      let div = document.createElement('div');
      div.classList = 'box db-links-collection';
      div.innerHTML = self.linkHeader(link, index);

      dbLinks.appendChild(div);
    });
    //
    // for(let link of this.links) {
    //   let div = document.createElement('div');
    //   div.classList = 'box db-links-collection';
    //   div.innerHTML = this.linkHeader(link);
    //
    //   dbLinks.appendChild(div);
    // }
  }

  /**
  * Link Header
  @param {object} link - link object
  @return {string} - header markup
  */
  linkHeader(link, index) {
   return `<header class="db-links-header ${this.setHeaderColor(index)}"><h2>${ link.title }</h2></header>`;
  }

  /**
  * Link SubHeader
  @param {object} link - link object
  @param {number} count - link iteration number
  @returns {string} - sub header markup
  */
  linkSubHeader(count, link) {
   return `<label for="toggle-${count}"><h4>${ link.name }</h4></label>
<input class="toggle" type="checkbox" id="toggle-${count}">`;
  }

  /**
  * Credential
  @param {object} credential - credeential object
  @returns {string} - sub header markup
  */
  credentialMarkup(cred, index) {
    return `<li>
<label for="toggle-${index}"><h4>${cred.title}</h4></label>
<input class="toggle" type="checkbox" id="toggle-${index}">
<div class="db-details">
<summary class="db-descr">${cred.summary}</summary>
<ul class="db-list size-1of1">
<li>
<label class="size-1of5">URL</label>
<a href="https://slack.com" target="self">https://slack.com</a>
</li>
<li><label class="size-1of5" for="name0">Username</label><input class="size-2of3" type="text" id="name0" value="username"></li>
<li><label class="size-1of5" for="name1">Password</label><input class="size-2of3" type="password" id="name1" value="password"></li>
</ul>
</div>
</li>`;
  }

  setHeaderColor(index) {
    switch(index) {
      case 0:
      default:
        return "db-header-color-blue";
      case 1:
      case 4:
        return "db-header-color-green";
      case 2:
      case 5:
        return "db-header-color-yellow";
      case 3:
      case 6:
        return "db-header-color-red";
    }
  }
}

/* global module*/
/* eslint no-undef: "error"*/
export default Links;
