function match(subdomains, offset) {
  return function(item, index) {
    return (item === '*' && !!subdomains[index + offset])
      || subdomains[index + offset] === item;
  }
}

/**
 * Subdomain router
 *
 * @param {String} subdomain
 * @param {Function} fn, middleware, router
 * @return {Function} middleware
 */

exports = module.exports = function(subdomain, fn) {
  return function(req, res, next) {
    
    // keep track of matched subdomains (allows nested router)
    req._subdomainsMatched = req._subdomainsMatched || 0;
    
    var parts = subdomain.split('.').reverse();
    
    // route
    if (parts.every(match(req.subdomains, req._subdomainsMatched))) {
      req._subdomainsMatched = parts.length;
      return fn(req, res, next);
    } else {
      next();
    }
  }
}