if (typeof BWC == 'undefined') BWC = {};

BWC.Keys = {
    KEY_TAB: 9, // TAB
    KEY_SHIFT: 16, // Shift
    KEY_CTRL: 17, // CTRL
    KEY_ALT: 18, // ALT
    KEY_PAUSE: 19, // Pause/Break
    KEY_CAPS_LOCK: 20, // Caps Lock
    KEY_ESCAPE: 27, // Escape
    KEY_PAGE_UP: 33, // page up
    KEY_PAGE_DOWN: 34, // page down
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
    KEY_SCROLL_LOCK: 145, // Scroll Lock
    KEY_SPACE: 32, // ' '
    KEY_EXCLAMATION_MARK: 33, // !
    KEY_QUOTES: 34, // "
    KEY_OCTOTHORPE: 35, // #
    KEY_DOLLAR: 36, // $
    KEY_PERCENT: 37, // %
    KEY_AMP: 38, // &
    KEY_APOSTROPHE: 39, // '
    KEY_OPEN_BRACKET: 40, // (
    KEY_CLOSE_BRACKET: 41, // )
    KEY_ASTERIKS: 42, // *
    KEY_PLUS: 43, // +
    KEY_COMMA: 44, // ,
    KEY_MINUS: 45, // -
    KEY_DOT: 46, // .
    KEY_SLASH: 47, // /
    KEY_ZERO: 48, // 0
    KEY_ONE: 49, // 1
    KEY_TWO: 50, // 2
    KEY_THREE: 51, // 3
    KEY_FOUR: 52, // 4
    KEY_FIVE: 53, // 5
    KEY_SIX: 54, // 6
    KEY_SEVEN: 55, // 7
    KEY_EIGHT: 56, // 8
    KEY_NINE: 57, // 9
    KEY_COLON: 58, // :
    KEY_SEMICOLON: 59, // ;
    KEY_LESS: 60, // <
    KEY_EQUAL: 61, // =
    KEY_GREATER: 62, // >
    KEY_QUESTION_MARK: 63, // ?
    KEY_AT: 64, // @
    KEY_CAPITAL_A: 65, // A
    KEY_CAPITAL_B: 66, // B
    KEY_CAPITAL_C: 67, // C
    KEY_CAPITAL_D: 68, // D
    KEY_CAPITAL_E: 69, // E
    KEY_CAPITAL_F: 70, // F
    KEY_CAPITAL_G: 71, // G
    KEY_CAPITAL_H: 72, // H
    KEY_CAPITAL_I: 73, // I
    KEY_CAPITAL_J: 74, // J
    KEY_CAPITAL_K: 75, // K
    KEY_CAPITAL_L: 76, // L
    KEY_CAPITAL_M: 77, // M
    KEY_CAPITAL_N: 78, // N
    KEY_CAPITAL_O: 79, // O
    KEY_CAPITAL_P: 80, // P
    KEY_CAPITAL_Q: 81, // Q
    KEY_CAPITAL_R: 82, // R
    KEY_CAPITAL_S: 83, // S
    KEY_CAPITAL_T: 84, // T
    KEY_CAPITAL_U: 85, // U
    KEY_CAPITAL_V: 86, // V
    KEY_CAPITAL_W: 87, // W
    KEY_CAPITAL_X: 88, // X
    KEY_CAPITAL_Y: 89, // Y
    KEY_CAPITAL_Z: 90, // Z
    KEY_ANGULAR_BRACKET_OPEN: 91, // [
    KEY_BACKSLASH: 92, // \
    KEY_ANGULAR_BRACKET_CLOSE: 93, // ]
    KEY_CARET: 94, // ^
    KEY_UNDERSCORE: 95, // _
    KEY_PRIME: 96, // `
    KEY_A: 97, // a
    KEY_B: 98, // b
    KEY_C: 99, // c
    KEY_D: 100, // d
    KEY_E: 101, // e
    KEY_F: 102, // f
    KEY_G: 103, // g
    KEY_H: 104, // h
    KEY_I: 105, // i
    KEY_J: 106, // j
    KEY_K: 107, // k
    KEY_L: 108, // l
    KEY_M: 109, // m
    KEY_N: 110, // n
    KEY_O: 111, // o
    KEY_P: 112, // p
    KEY_Q: 113, // q
    KEY_R: 114, // r
    KEY_S: 115, // s
    KEY_T: 116, // t
    KEY_U: 117, // u
    KEY_V: 118, // v
    KEY_W: 119, // w
    KEY_X: 120, // x
    KEY_Y: 121, // y
    KEY_Z: 122, // z
    KEY_CURVED_BRACKED_OPEN: 123, // {
    KEY_LINE: 124, // |
    KEY_CURVED_BRACKED_CLOSE: 125, // }
    KEY_TILDE: 126, // ~
    KEY_DELETE: 127 // DEL
};

BWC.Keys.defaultBlacklist = [
    BWC.Keys.KEY_TAB,
    BWC.Keys.KEY_SHIFT,
    BWC.Keys.KEY_CTRL,
    BWC.Keys.KEY_ALT,
    BWC.Keys.KEY_PAUSE,
    BWC.Keys.KEY_CAPS_LOCK,
    BWC.Keys.KEY_ESCAPE,
    BWC.Keys.KEY_PAGE_UP,
    BWC.Keys.KEY_PAGE_DOWN,
    BWC.Keys.KEY_END,
    BWC.Keys.KEY_HOME,
    BWC.Keys.KEY_LEFT,
    BWC.Keys.KEY_RIGHT,
    BWC.Keys.KEY_UP,
    BWC.Keys.KEY_DOWN,
    BWC.Keys.KEY_PRINT_SCR,
    BWC.Keys.KEY_INSERT,
    BWC.Keys.KEY_WINDOWS,
    BWC.Keys.KEY_CONTEXT,
    BWC.Keys.KEY_F1,
    BWC.Keys.KEY_F2,
    BWC.Keys.KEY_F3,
    BWC.Keys.KEY_F4,
    BWC.Keys.KEY_F5,
    BWC.Keys.KEY_F6,
    BWC.Keys.KEY_F7,
    BWC.Keys.KEY_F8,
    BWC.Keys.KEY_F9,
    BWC.Keys.KEY_F10,
    BWC.Keys.KEY_F11,
    BWC.Keys.KEY_F12,
    BWC.Keys.KEY_NUM_LOCK,
    BWC.Keys.KEY_SCROLL_LOCK
];

BWC.Keys.isValidKey = function(key) {
    if (typeof key === 'number') {
        for (k in BWC.Keys) {
            if (BWC.Keys.hasOwnProperty(k)) {
                if (BWC.Keys[k] === key) {
                    return key;
                }
            }
        }
    } else if (typeof key === 'string') {
        if (BWC.Keys.hasOwnProperty(key)) {
            return BWC.Keys[key];
        }
    }

    return false;
};