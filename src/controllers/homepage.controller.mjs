import db from '../models/app.model.mjs'

const homepageController = (req, res) => {
  // In pug defaults configuration searches for views directory in
  // root directory of the file, but in this project setup the views
  // is the src directory, so we hard to configure the file path to fit
  // this application setup.

    db.isLogin ? res.render('../src/views/homepage') : res.redirect('http://localhost:3000/login')
  }

export default homepageController