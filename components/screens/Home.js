import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url:
        'https://jobs.github.com/positions/de930ba0-4f10-46ab-be18-17cfe7e26f47',
      company: '',
      type: 'Full Time',
      location: 'Remote',
      title: 'Sr. Full-stack software engineer - JS + Ruby',
      description:
        '<p>We created Sticker Mule to be the best place to work and shop. That means making ordering fast, simple and fun while creating a stable, low stress and enjoyable place for talented people to work.</p>',
      company_logo:
        'https://jobs.github.com/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ0pjIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--35f6201e9066caf57547d2dd9d911004edfa8437/01-sticker-mule-logo-dark-stacked.png',
    };
  }
}
