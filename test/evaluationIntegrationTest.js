var should = require('should'),
    request = require('supertest'),
    app = require('../server.js')
    mongoose = require('mongoose'),
    Evaluation = mongoose.model('EvaluationModel'),
    agent = request.agent(app);

describe('Evaluation Crud Test', function(){
    it('Should allow a evaluation to be posted and return a read and _id', function(done){
        var evaluation = {title:'new Evaluation', author:'Jose', genre:'Fiction'};
        agent.post('/api/evaluations')
            .send(evaluation)
            .expect(200)
            .end(function(err, results){
                results.body.read.should.equal(false);
                results.body.should.have.property('_id');
                done();
            })
    })

    afterEach(function(done){
        Evaluation.remove().exec();
        done();
    })

})    