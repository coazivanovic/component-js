if (typeof BWC == 'undefined') BWC = {};

BWC.Ajax = {};

BWC.Ajax.create = function(data) {
    if (typeof data == 'string') {
        try {
            json = JSON.parse(data);
        } catch (e) {
            json = {
                _class: '',
                success: false,
                message: e.message,
                body: data
            }
        }
    } else {
        json = data;
    }
    var className = json && json._class ? json._class : 'BWC.Ajax.Result';
    var chunks = className.split('.');
    var ctor = window;
    for (var i=0; i<chunks.length; i++) {
        if (typeof ctor[chunks[i]] == 'undefined') {
            throw new SyntaxError(className);
        }
        ctor = ctor[chunks[i]];
    }
    var result = new ctor(json);
    return result;
}

BWC.Ajax.Result = function(json) {
    this._class = 'BWC.Ajax.Result';
    if (typeof json == 'object') {
        this.success = json.success;
        this.message = json.message;
        this.body = json.body;
    } else {
        this.success = false;
        this.message = 'Not an object';
        this.body = json;
    }
}

