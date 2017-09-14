

var evaluationController = function(Evaluation){
    var post = function(req, res){
        var evaluation = new Evaluation(req.body);

        if(!req.body.title){
            res.status(400);
            res.send('Title is required');
        }else{
            evaluation.save();
            res.status(201);
            res.send(evaluation);
        }
    } 

    var get = function(req, res){
        var query = {};
        if(req.query.genre){
            query.genre = req.query.genre;
        }
        Evaluation.find(query,function(err, evaluations){
            if(err){
                res.status(500).send(err);
            }else{
                /**hateoas **/
                var returnEvaluations = [];
                evaluations.array.forEach(function(element, index, array) {
                    var newEvaluation = element.toJSON();
                    newEvaluation.links = {};
                    newEvaluation.links.self = 'http://'+ req.headers.host + '/api/evaluations/'+newEvaluation._id;
                    returnEvaluations.push(newEvaluation);
                });
                res.json(returnEvaluations);
                //res.json(evaluations);
            }
        });
    }

    return {
        post: post,
        get: get
    }
};

module.exports = evaluationController;