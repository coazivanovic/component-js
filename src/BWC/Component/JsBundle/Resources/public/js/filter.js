if (typeof BWC == 'undefined') BWC = {};

BWC.Filter = function(blacklist, whitelist) {
    var self = this;

    this.keys = BWC.Keys;
    this.blacklist = [];
    this.whitelist = [];

    function mapKey(value) {
        return self.keys.isValidKey(value);
    }

    if (typeof blacklist != 'undefined' && blacklist) {
        if (typeof blacklist.map === 'function') {
            blacklist = blacklist.map(mapKey);
        }
        
        this.addToBlacklist(blacklist);
    }

    if (typeof whitelist !== 'undefined' && whitelist) {
        if (typeof whitelist.map === 'function') {
            whitelist = whitelist.map(mapKey);
        }

        this.addToWhitelist(whitelist);
    }
};

BWC.Filter.prototype.isWhitelisted = function(value) {
    return this.whitelist.indexOf(value) !== -1;
};

BWC.Filter.prototype.isBlacklisted = function(value) {
    return this.blacklist.indexOf(value) !== -1;
};

BWC.Filter.prototype.isAllowed = function(value) {
    var keyCode = value;

    if (typeof value === 'string') {
        keyCode = this.keys.isValidKey(value);
    }

    return keyCode && (this.isWhitelisted(keyCode) || false == this.isBlacklisted(keyCode));
};

BWC.Filter.prototype.addToWhitelist = function(value) {
    var self=this;
    if (value && typeof value.forEach == 'function') {
        value.forEach(function(v) {
           self.whitelist.push(v);
        });
    } else if (value) {
        self.whitelist.push(value);
    }

    return self;
};

BWC.Filter.prototype.addToBlacklist = function(value) {
    var self=this;
    if (value && typeof value.forEach == 'function') {
        value.forEach(function(v) {
           self.blacklist.push(v);
        });
    } else if (value) {
        self.blacklist.push(value);
    }

    return self;
};

BWC.Filter.prototype.removeFromWhitelist = function(value) {
    var index = this.whitelist.indexOf(value);

    if (index !== -1) {
        delete this.whitelist[value];
    }

    return this;
};

BWC.Filter.prototype.removeFromBlacklist = function(value) {
    if (false === this.keys.isValidKey(value)) {
        throw new SyntaxError('Invalid key ' + value);
    }

    var index = this.blacklist.indexOf(value);

    if (index !== -1) {
        delete this.blacklist[value];
    }

    return this;
};

BWC.Filter.prototype.clearWhitelist = function() {
    this.whitelist = [];

    return this;
};

BWC.Filter.prototype.clearBlacklist = function() {
    this.blacklist = [];

    return this;
};