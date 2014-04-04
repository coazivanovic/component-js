$(function() {

    BWC.Dispatcher.addListener('sys.result.execute', function(e) {
        var result = e.result;
        if (!result) {
            throw new SyntaxError("sys.result.execute: Missing result");
        }
        if (typeof result.execute != "function") {
            throw new SyntaxError("sys.result.execute: Missing result execute function");
        }

        result.execute(e);
    });

});