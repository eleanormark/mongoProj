const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
    let joe;

    beforeEach((done) => {
        joe = new User({name:'Joe'});
        joe.save()
            .then(() => done())
    });

    it ('model instance remvoe', (done) => {
        joe.remove()
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) =>{
                assert(user === null);
                done();
            });
        
    });

    it('class method remove', (done) => {
        // Remove a bunch of records with some given criteria
        User.remove({name: 'Joe' })
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) => {
                assert(user === null);
                done();
            });
    });

    it('class method findOneRemove', (done) => {
        User.findOneAndRemove({name: 'Joe'})
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) =>{
                assert(user === null);
                done();
            });
    });

    it('class method fidnByIdRemove', (done) => {
        User.findByIdAndRemove(joe._id)
            .then(() => User.findOne({name: 'Joe'}))
            .then((user) =>{
                assert(user === null);
                done();
            });
    });
});
