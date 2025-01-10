import { Router } from 'express';
var router = Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send({'body': 'respond with a resource'});

// });

router.get('/', (req, res) => {
  res.send('Hello World!');
});


export default router;
