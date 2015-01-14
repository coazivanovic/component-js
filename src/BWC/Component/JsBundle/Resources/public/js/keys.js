if (typeof BWC == 'undefined') BWC = {};

BWC.Keys = {};

BWC.Keys.whitelist = {};

BWC.Keys.blacklist = {
    KEY_TAB: 9, // TAB
    KEY_SHIFT: 16, // Shift
    KEY_CTRL: 17, // CTRL
    KEY_ALT: 18, // ALT
    KEY_PAUSE: 19, // Pause/Break
    KEY_CAPS_LOCK: 20, // Caps Lock
    KEY_ESCAPE: 27, // Escape
    KEY_PAGE_UP: 33, // page up
    KEY_PAGE_DOW: 34, // page down
    KEY_END: 35, // end
    KEY_HOME: 36, // home
    KEY_LEFT: 37, //left arrow
    KEY_UP: 38, // up arrow
    KEY_RIGHT: 39, // right arrow
    KEY_DOWN: 40, // down arrow
    KEY_PRINT_SCR: 42, // print screen
    KEY_INSERT: 45, // insert
    KEY_WINDOWS: 91, // Windows Button
    KEY_CONTEXT: 93, // Context menu
    KEY_F1: 112, // F1
    KEY_F2: 113, // F2
    KEY_F3: 114, // F3
    KEY_F4: 115, // F4
    KEY_F5: 116, // F5
    KEY_F6: 117, // F6
    KEY_F7: 118, // F7
    KEY_F8: 119, // F8
    KEY_F9: 120, // F9
    KEY_F10: 121, // F10
    KEY_F11: 122, // F11
    KEY_F12: 123, // F12
    KEY_NUM_LOCK: 144, // Num Lock
    KEY_SCROLL_LOCK: 145 // Scroll Lock
};

BWC.Keys.isBlacklisted = function(keyCode) {

    for (var keyName in this.blacklist) {
        var blacklisted = this.blacklist[keyName] === keyCode &&
                            this.whitelist.hasOwnProperty(keyName) == false ||
                            (this.whitelist.hasOwnProperty(keyName) && this.whitelist[keyName] == false)
        ;

        if (this.blacklist.hasOwnProperty(keyName) && blacklisted) {
            return true;
        }
    }

    return false;
};

BWC.Keys.addKeysToWhiteList = function(keys, clear) {

    if (clear) {
        this.clearWhitelist();
    }

    try {
        keys.forEach(function(key) {
            this.addToWhiteList(key);
        }.bind(this));
    } catch (e) {
        throw new Error(e.message);
    }
};

BWC.Keys.addToWhiteList = function(key) {
    if (false == this.isValidKey(key)) {
        throw new SyntaxError('Key ' + key + ' not listed in blacklist');
    }

    BWC.Keys.whitelist[key] = true;
};

BWC.Keys.clearWhitelist = function() {
    this.whitelist = {};
};

BWC.Keys.isValidKey = function(key) {
    return this.blacklist[key] || false;
};