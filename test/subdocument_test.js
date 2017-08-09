const assert = require('assert');
const User = require('../src/user');

describe('Subdocments', () => {
    it('can create a subdocument', (done) => {
        const joe = new User({
            name: 'Joe', 
            posts: [{title: 'PostTitle'}]
        });

        joe.save()
            .then(() => {return User.findOne({name: 'Joe'})})
            .then((user) => {
                assert(user.posts[0].title === 'PostTitle');
                done();
            })
    });

    it('can add subdocuments to an existing record', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: []
        });

        joe.save()
            .then(() => {return User.findOne({ name: 'Joe' })})
            .then((user) => {
                user.posts.push({ title: 'New Post' });
                return user.save();
            })
            .then(() => {return User.findOne({ name: 'Joe' })})
            .then((user) => {
                assert(user.posts[0].title === 'New Post');
                done();
            });
    });

    it('can remove subdocuments to an existing record', (done) => {
        const joe = new User({
            name: 'Joe',
            posts: [{title: 'Initial Post'}, {title: 'New Post'}]
        });

        joe.save()
            .then(() => {return User.findOne({ name: 'Joe' })})
            .then((user) => {
                user.posts[1].remove();
                return user.save();
            })
            .then(() => {return User.findOne({ name: 'Joe' })})
            .then((user) => {
                assert(user.posts[1] === undefined);
                done();
            });
        });
});