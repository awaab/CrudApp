const express = require('express');
const Joi = require('joi');
const router = express.Router();
const mongoose = require('mongoose');
const Course = require('../models/course.model');
const schema = {
  name: Joi.string().min(3).required()
};
const courses_list = [{ id: 1, name: 'things 101' },];

router.get('/', function (req, res) {
  Course.find({})
    .exec(function (err, courses) {
      if (err) {
        res.send('error occured')
      } else {
        console.log(courses);
        res.json(courses);
      }
    });
}
);

router.post('/', function (req, res) {
  // validation = Joi.validate(req.body, schema);
  // if(validation.error){
  //     res.status(400).send(validation.error);
  //     return;
  // }
  // const course = {
  //     id: courses_list.length + 1,
  //     name: req.body.name
  // };
  // courses_list.push(course);
  // res.send(course);


  var newCourse = new Course();
  newCourse.name = req.body.name;

  newCourse.save(function (err, course) {
    if (err) {
      res.send('error saving book');
    } else {
      console.log(course);
      res.send(course);
    }
  });
}
);

router.put('/:id', function (req, res) {
  // id = parseInt(req.params.id);
  // const course = courses_list.find(c => c.id === id);
  // if(!course){
  //     res.status(404).send(`No course with given id: ${id}`);
  //     return;
  // }
  // validation = Joi.validate(req.body, schema);
  // if(validation.error){
  //     res.status(400).send(validation.error);
  //     return;
  // }
  // course.name = req.body.name;
  // res.send(course);
  Course.findOneAndUpdate({
    _id: req.params.id
  },
    {
      $set: { name: req.body.name }
    }, { upsert: true }, function (err, newCourse) {
      if (err) {
        res.send('error updating ');
      } else {
        console.log(newCourse);
        res.send(newCourse);
      }
    });
}
);

router.get('/:id', function (req, res) {
  // id = parseInt(req.params.id);
  // const course = courses_list.find(c => c.id === id);
  // if(!course)
  //     res.status(404).send(`No course with given id: ${id}`);
  // else
  //     res.send(course);
  Course.findOne({
    _id: req.params.id
  })
    .exec(function (err, course) {
      if (err) {
        res.status(400).send('error occured');
        console.log(err);
      } else {
        console.log(course);
        res.json(course);
      }
    });
}
);

router.delete('/:id', function (req, res) {
  // id = parseInt(req.params.id);
  // const course = courses_list.find(c => c.id === id);
  // if(!course){
  //     res.status(404).send(`No course with given id: ${id}`);
  //     return;
  // }
  // const index = courses_list.indexOf(course);
  // courses_list.splice(index,1);
  // res.send(course);
  Course.findOneAndRemove({
    _id: req.params.id
  }, function (err, course) {
    if (err) {
      res.send('error removing')
    } else {
      console.log(course);
      res.status(204);
    }
  });
}
);

module.exports = router;
