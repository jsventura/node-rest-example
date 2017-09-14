var express = require('express');

var routes = function(Evaluation){
  
  var evaluationRouter = express.Router();
  
  var evaluationController = require('../controllers/evaluationController')(Evaluation)

    evaluationRouter.route('/')
      .post(evaluationController.post)
      .get(evaluationController.get);

    evaluationRouter.use('/:evaluationId', function(req, res, next){
      Evaluation.findById(req.params.evaluationId,function(err, evaluation){
        if(err){
          res.status(500).send(err);
        }else if(evaluation){
          req.evaluation = evaluation; 
          next();
        }else{
          res.status(404).send('no evaluation found');
        }
      });
    })
    evaluationRouter.route('/:evaluationId')
      .get(function(req, res){
        /**hateoas **/
        var returnEvaluation = req.evaluation.toJSON();
        returnEvaluation.links = [];
        var newLink = 'http://'+ req.headers.host + '/api/evaluations/?genre='+ returnEvaluation.genre;
        returnEvaluation.links.filterByThisGenre = newLink.replace(' ', '%20');
        res.json(returnEvaluation);
        //res.json(req.evaluation);
      })
      .put(function(req, res){
            req.evaluation.title = req.body.title;
            req.evaluation.author = req.body.author;
            req.evaluation.genre = req.body.genre;
            req.evaluation.read = req.body.read;
            req.evaluation.save();
            res.json(req.evaluation);
      })
      .patch(function(req, res){
          if(req.body._id){
            delete req.body._id;
          }

          for (var p in req.body) {
              req.evaluation[p] = req.body[p];
          }
          
          req.evaluation.save(function(err){
            if(err){
              res.status(500).send(err);
            }else{
              res.json(req.evaluation);
            }
          });
      })
      .delete(function(req, res){
        req.evaluation.remove(function(err){
          if(err){
            res.status(500).send(err);
          }else{
            res.status(204).send('Removed');
          }
        });
      })
    ;
  
    return evaluationRouter;
};

module.exports = routes;