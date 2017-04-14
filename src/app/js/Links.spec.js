'use strict';

var expect = require('chai').expect;
import Links from './Links';

describe('Links', function() {
    it('should exist', function() {
        expect(Links).to.not.be.undefined;
    });
});

describe('#sortLinks()', function() {
  it('should receive a array of link objects and sort them by title', function() {
    let input = [
      { title: "Development", credentials: [] },
      { title: "Business", credentials: [] },
      { title: "Social", credentials: [] }
    ];

    let expected = [
      { title: "Business", credentials: [] },
      { title: "Development", credentials: [] },
      { title: "Social", credentials: [] }
    ];

    let L = new Links(input);
    L.sortLinks();
    let actual = L.links;
    expect(actual).to.eql(expected);

    input = [
      { title: "Personal", credentials: [] },
      { title: "Business", credentials: [] }
    ];

    expected = [
      { title: "Business", credentials: [] },
      { title: "Personal", credentials: [] }
    ];

    L = new Links(input);
    L.sortLinks();
    actual = L.links;
    expect(actual).to.eql(expected);

  });
});

describe('#linkHeader()', function() {
  it('should take a link header object and return a header string', function() {
    let input = { title: "Business" },
        expected = `<header class="db-links-header"><h2>Business</h2></header>`;

    let L = new Links(['input']);
    expect(L.linkHeader(input)).to.equal(expected);

    input = { title: "Development" },
    expected = `<header class="db-links-header"><h2>Development</h2></header>`;

    L = new Links(['input']);
    expect(L.linkHeader(input)).to.equal(expected);
  });
});

describe('#linkSubHeader()', function() {
  it('should take a link object and return a header string', function() {
    let input = { name: "Slack" },
        expected = `<label for="toggle-0"><h4>Slack</h4></label>
<input class="toggle" type="checkbox" id="toggle-0">`;

    let L = new Links(['input']);
    expect(L.linkSubHeader(0, input)).to.equal(expected);

    input = { name: "Trello" },
    expected = `<label for="toggle-1"><h4>Trello</h4></label>
<input class="toggle" type="checkbox" id="toggle-1">`;

    L = new Links(['input']);
    expect(L.linkSubHeader(1, input)).to.equal(expected);
  });
});

// describe('#linkSubHeader()', function() {
//   it('should take a link object and return a header string', function() {
//     let input = { name: "Slack" },
//         expected = `<label for="toggle-0"><h4>Slack</h4></label>
// <input class="toggle" type="checkbox" id="toggle-0">`;
//
//     let L = new Links(['input']);
//     expect(L.linkSubHeader(input, 0)).to.equal(expected);
//
//     input = { name: "Trello" },
//     expected = `<label for="toggle-1"><h4>Trello</h4></label>
// <input class="toggle" type="checkbox" id="toggle-1">`;
//
//     L = new Links(['input']);
//     expect(L.linkSubHeader(input, 1)).to.equal(expected);
//   });
// });
