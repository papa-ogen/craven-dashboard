/* eslint-disable no-unused-vars */

const DBconfig = {
  links: [{
    title: 'Development',
    expanded: true,
    credentials: [{
      id: 'github',
      name: 'Github',
      descr: 'GitHub is a web-based Git repository hosting service.',
      url: ['https://github.com/papa-ogen/cravenDashBoard'],
      username: 'username',
      password: 'password',
    },
    {
      id: 'styleguide',
      name: 'Style Guides',
      url: ['https://google.github.io/styleguide/javascriptguide.xml',
            'https://google.github.io/styleguide/htmlcssguide.xml'],
    }],
  },
  {
    title: 'Business',
    credentials: [{
      id: 'trello',
      name: 'Trello',
      url: ['https://trello.com'],
      username: 'username',
      password: 'password',
    },
    {
      id: 'slack',
      name: 'Slack',
      url: ['https://slack.com'],
      username: 'username',
      password: 'password',
    }],
  },
  {
    title: 'Social',
    credentials: [{
      id: 'facebook',
      name: 'Facebook',
      url: ['https://facebook.com'],
      username: 'username',
      password: 'password',
    },
    {
      id: 'instagram',
      name: 'Instagram',
      url: ['https://instagram.com'],
      username: 'username',
      password: 'password',
    }],
  },
  {
    title: 'Personal',
    expanded: true,
    credentials: [{
      id: 'favs',
      name: 'Favourites',
      url: ['http://www.hongkiat.com', 'https://css-tricks.com/', 'http://9gag.com/'],
    }],
  }],
  countdown: {
    reportDay: 25,
  },
};

export default DBconfig;
