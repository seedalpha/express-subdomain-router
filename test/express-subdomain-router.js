var request   = require('supertest');
var subdomain = require('..');
var express   = require('express');

describe('express-subdomain-router', function() {
  beforeEach(function() {
    this.app = express();
  });
  
  it('should route a single subdomain', function(done) {
    this.app.use(subdomain('api', function(req, res, next) {
      res.status(200).end();
    }));
    
    request(this.app)
      .get('/')
      .set('Host', 'api.example.com')
      .expect(200, done);
  });
  
  it('should not route unless matches', function(done) {
    this.app.use(subdomain('api', function(req, res, next) {
      res.status(200).end();
    }));
    
    request(this.app)
      .get('/')
      .set('Host', 'foo.example.com')
      .expect(404, done);
  });
  
  it('should route a wildcard subdomain', function(done) {
    this.app.use(subdomain('*', function(req, res, next) {
      res.status(200).end();
    }));
    
    request(this.app)
      .get('/')
      .set('Host', 'any.example.com')
      .expect(200, done);
  });
  
  it('should route nested subdomains', function(done) {
    this.app.use(subdomain('api.*', function(req, res, next) {
      res.status(200).end();
    }));
    
    request(this.app)
      .get('/')
      .set('Host', 'api.v1.example.com')
      .expect(200, done);
  });
  
  it('should route nested subdomains using nested routers', function(done) {
    this.app.use(subdomain('d.e.f', express.Router()
      .use(subdomain('a.b.c', function(req, res, next) {
        res.status(200).end();
      })
    )));
    
    request(this.app)
      .get('/')
      .set('Host', 'a.b.c.d.e.f.example.com')
      .expect(200, done);
  });
  
  it('should route nested subdomains using deeply nested routers', function(done) {
    this.app.use(subdomain('g.h.i', express.Router()
      .use(subdomain('d.e.f', express.Router()
        .use(subdomain('a.b.c', function(req, res, next) {
          res.status(200).end();
        }))
      )
    )));
    
    request(this.app)
      .get('/')
      .set('Host', 'a.b.c.d.e.f.g.h.i.example.com')
      .expect(200, done);
  });
  
});