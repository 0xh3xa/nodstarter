const app = require('../server/server-routers');
const request = require('supertest');
const expect = require('chai').expect;

describe('[Lions]', () => {

    var lion_obj = {
        name: 'lion_name',
        pride: 'lion_pride',
        age: 5,
        gender: 'male'
    };

    it('should GET all lions', (done) => {
        request(app)
            .post('/lions')
            .send(lion_obj)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, resp) => {
                request(app)
                    .get('/lions')
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, resp) => {
                        var actual_lion = resp.body[0];
                        lion_obj.id = '1';
                        expect(resp.body).to.be.an('array');
                        expect(actual_lion).to.eql(lion_obj);
                        done();
                    });
            });
    });
    it('should POST all lions', (done) => {
        request(app)
            .post('/lions')
            .send(lion_obj)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, resp) => {
                var lion = resp.body;
                lion_obj.id = '2';
                expect(resp.body).to.be.an('object');
                expect(lion).to.eql(lion_obj);
                done();
            });
    });

    it('should PUT all lions', (done) => {
        var updated_lion = {
            name: 'lion_name_1',
            pride: 'lion_pride_1',
            age: 5,
            gender: 'male'
        };

        request(app)
            .post('/lions')
            .send(lion_obj)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, resp) => {
                var lion = resp.body;
                updated_lion.id = lion.id;
                request(app)
                    .put('/lions/' + lion.id)
                    .send(updated_lion)
                    .set('Accept', 'application/json')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end((err, resp) => {
                        var actual_updated_lion = resp.body;
                        expect(resp.body).to.be.an('object');
                        expect(actual_updated_lion).to.eql(updated_lion);
                        done();
                    });
            });

    });

    it('should DELETE all lions', (done) => {
        request(app)
            .post('/lions')
            .send(lion_obj)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, resp) => {
                var lion = resp.body;
                request(app)
                    .delete('/lions/' + lion.id)
                    .end((err, resp) => {
                        expect(resp.body).to.eql('deleted');
                        done();
                    });
            });
    });
});
