const router = require("express").Router();
const { uploader, cloudinary } = require('../config/cloudinary');
const Movie = require('../models/Movie');

/* GET home page */
router.get("/", (req, res, next) => {
  Movie.find()
    .then(movies => {
      res.render("index", { movies });
    })
});

router.get('/movie/add', (req, res, next) => {
  res.render('movie-add');
});

router.post('/movie/add', uploader.single('photo'), (req, res, next) => {
  const { title, description } = req.body;
  console.log(req.file);
  const imgPath = req.file.path;
  const imgName = req.file.originalname;
  const publicId = req.file.filename;
  // console.log(imgPath, imgName);
  Movie.create({ title, description, imgPath, imgName, publicId })
    .then(movie => {
      console.log(movie);
      res.redirect('/');
    })
    .catch(err => {
      next(err);
    })
});

router.get('/movie/delete/:id', (req, res, next) => {
  Movie.findByIdAndDelete(req.params.id)
    .then(movieThatWasDeleted => {
      // if that movie had a poster 
      if (movieThatWasDeleted.imgPath) {
        // then also delete this image on cloudinary
        cloudinary.uploader.destroy(movieThatWasDeleted.publicId);
      }
      res.redirect('/');
    })
    .catch(err => {
      next(err);
    })
});


module.exports = router;
