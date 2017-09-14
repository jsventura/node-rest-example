var should = require('should'),
    sinon = require('sinon');

describe('Evaluation Controller Test:', function(){
    describe('Post', function(){
        it('should not allow an empty title on post', function(){
            var Evaluation = function(evaluation){
                this.save = function(){
                }
            };

            var req = {
                body: {
                    author: 'Jose'
                }
            }

            var res = {
                status: sinon.spy(),
                send: sinon.spy(),
            }

            var evaluationController = require('../controllers/evaluationController')(Evaluation);
            evaluationController.post(req, res);

            res.status.calledWith(400).should.equal(true, 'Bad Status '+ res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);

        })
    })
})    