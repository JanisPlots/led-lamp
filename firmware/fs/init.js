load('api_gpio.js');
load('api_neopixel.js');
load('api_math.js');
load('api_blynk.js');
load("api_rpc.js");

let pn = 2,
    ct = 10;

let c = {
    r: 255,
    g: 255,
    b: 255
};

let strip = NeoPixel.create(
    pn,
    ct,
    NeoPixel.GRB
);

function colorAll(col) {
    for (let i = 0; i < ct; i++) {
        strip.setPixel(
            i,
            col.r,
            col.g,
            col.b
        );
    }
    strip.show();
}

colorAll(c);

Blynk.setHandler(function(conn, cmd, pin, val, id) {
    if (cmd === 'vw') {
        if (pin === 1) {
            c.r = val;
        } else if (pin === 2) {
            c.g = val;
        } else if (pin === 3) {
            c.b = val;
        }
        colorAll(c);
    }
}, null);

RPC.addHandler('Set.Color', function(args) {
    colorAll(args);
    return "OK";
});