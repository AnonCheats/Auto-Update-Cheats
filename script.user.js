// ==UserScript==
// @name         Krunker ESP Only [AnonCheat]
// @namespace    https://krunker.io/
// @version      1.9.3
// @description  Only ESP for krunker
// @author       AnonCheat [Edit]
// @match        *://krunker.io/*
// @runAt        document-start
// @grant        none
// @noframes
// ==/UserScript==

(function() {
    let shared_state = new Map(Object.entries({
        functions_to_hide: new WeakMap(),
        strings_to_hide: [],// made by AnonCheat
        hidden_globals: [],
        init: false// made by AnonCheat
    }));

    let invisible_define = function(obj, key, value) {// made by AnonCheat
        shared_state.get('hidden_globals').push(key);
        Object.defineProperty(obj, key, {// made by AnonCheat
            enumberable: false,// made by AnonCheat
            configurable: false,
            writable: true,// made by AnonCheat
            value: value
        });
    };

    let conceal_function = function(original_Function, hook_Function) {// made by AnonCheat
        shared_state.get('functions_to_hide').set(hook_Function, original_Function);
    };

    let conceal_string = function(original_string, hook_string) {
        shared_state.get('strings_to_hide').push({
            from: new RegExp(hook_string.replace(/([\[|\]|\(|\)|\*|\\|\.|\+])/g, '\\$1'), 'g'),// made by AnonCheat
            to: original_string
        });
    };

    const original_toString = Function.prototype.toString;
    let hook_toString = new Proxy(original_toString, {// made by AnonCheat
        apply: function(target, _this, _arguments) {// made by AnonCheat
            try {
                var ret = Function.prototype.apply.apply(target, [_this, _arguments]);
            } catch (e) {
                e.stack = e.stack.replace(/\n.*Object\.apply \(<.*/, '');// made by AnonCheat// made by AnonCheat
                throw e;
            }

            let lookup_fn = shared_state.get('functions_to_hide').get(_this);// made by AnonCheat
            if (lookup_fn) {
                return Function.prototype.apply.apply(target, [lookup_fn, _arguments]);
            }
// made by AnonCheat
            for (var i = 0; i < shared_state.get('strings_to_hide').length; i++) {
                ret = ret.replace(shared_state.get('strings_to_hide')[i].from, shared_state.get('strings_to_hide')[i].to);// made by AnonCheat
            }
            return ret;
        }
    });
    Function.prototype.toString = hook_toString;
    conceal_function(original_toString, hook_toString);// made by AnonCheat

    var _cnBSeen, _canSee, _pchObjc, _objInstances, _isYou, _recoilAnimY, _mouseDownL, _mouseDownR, _getWorldPosition, _didShoot, _maxHealth, _ammos, _weaponIndex, _inputs, _me, _world, _procInputs;
    const defined = object => typeof object !== "undefined";

    const original_encode = TextEncoder.prototype.encodeInto; //made by AnonCheat
    let hook_encode = new Proxy(original_encode, {
        apply: function(target, _this, _arguments) {// made by AnonCheat
            let game = false;
            try {
                if (_arguments[0].length > 140000) {
                    _cnBSeen = _arguments[0].match(/this\['recon']=!0x1,this\['(\w+)']=!0x1/)[1];// made by AnonCheat
                    _canSee = _arguments[0].match(/,this\['(\w+)'\]=function\(\w+,\w+,\w+,\w+,\w+\){if\(!\w+\)return!\w+;/)[1];
                    _pchObjc = _arguments[0].match(/\(\w+,\w+,\w+\),this\['(\w+)'\]=new \w+\['\w+'\]\(\)/)[1];
                    _objInstances = _arguments[0].match(/\[\w+\]\['\w+'\]=!\w+,this\['\w+'\]\[\w+\]\['\w+'\]&&\(this\['\w+'\]\[\w+\]\['(\w+)'\]\['\w+'\]=!\w+/)[1];
                    _isYou = _arguments[0].match(/,this\['\w+'\]=!\w+,this\['\w+'\]=!\w+,this\['(\w+)'\]=\w+,this\['\w+'\]\['length'\]=\w+,this\[/)[1];
                    _recoilAnimY = _arguments[0].match(/\w*1,this\['\w+'\]=\w*0,this\['\w+'\]=\w*0,this\['\w+'\]=\w*1,this\['\w+'\]=\w*1,this\['\w+'\]=\w*0,this\['\w+'\]=\w*0,this\['(\w+)'\]=\w*0,this\['\w+'\]=\w*0,this\['\w+'\]=\w*0,this\['\w+'\]=\w*0,/)[1];// made by AnonCheat
                    _mouseDownL = _arguments[0].match(/this\['\w+'\]=function\(\){this\['(\w+)'\]=\w*0,this\['(\w+)'\]=\w*0,this\['\w+'\]={}/)[1];
                    _mouseDownR = _arguments[0].match(/this\['\w+'\]=function\(\){this\['(\w+)'\]=\w*0,this\['(\w+)'\]=\w*0,this\['\w+'\]={}/)[2];// made by AnonCheat
                    _getWorldPosition = _arguments[0].match(/\['camera']\['(\w+)']\(\);if/)[1];
                    _maxHealth = _arguments[0].match(/this\['health']\/this\['(\w+)']\?/)[1];
                    _didShoot = _arguments[0].match(/\w+\['(\w+)']=!0x1,\w+\['burstCount']=0x0/)[1];
                    const procInputRegex = _arguments[0].match(/this\['(\w+)']=function\((\w+),(\w+),\w+,\w+\){(this)/);
                    const reloadRegex = _arguments[0].match(/{!\w+\['reloadTimer']&&\w+\['(\w+)']\[\w+\['(\w+)']]/);
                    _procInputs = procInputRegex[1];
                    _ammos = reloadRegex[1];
                    _weaponIndex = reloadRegex[2];// made by AnonCheat
                    game = true;
                }

            } catch (e) {
                e.stack = e.stack.replace(/\n.*Object\.apply \(<.*/, '');
                throw e;
            }
            if (game) TextEncoder.prototype.encodeInto = original_encode;

            return Function.prototype.apply.apply(target, [_this, _arguments]);// made by AnonCheat
        }
    });
    TextEncoder.prototype.encodeInto = hook_encode;// made by AnonCheat
    conceal_function(original_encode, hook_encode);

    /**************************************************************/
    const Pi = Math.PI / 2;
    const PI2 = 2 * Math.PI;
    const consts = {
        cameraHeight: 1.5,
        playerHeight: 11,// made by AnonCheat
        cameraHeight: 1.5,
        headScale: 2,
        crouchDst: 3,// made by AnonCheat
        camChaseTrn: 0.0022,
        camChaseSpd: 0.0012,
        camChaseSen: 0.2,
        camChaseDst: 24,
        recoilMlt: 0.3,
        nameOffset: 0.6,
        nameOffsetHat: 0.8,
        verClans: [
            "DEV",
            "FaZe",
            "Lore",
            "nV",
            "Oxic",
            "Verb",
            "Omen",
            "ロリ幼女",
            "VOID",
            "JBP",
            "PHIL",// made by AnonCheat
            "TIMP",
            "24/7",
            "g59",
            "GLXY",
            "MMOK",
            "ODTY"
        ],
    };
    const input = {
        speed: 1,
        ydir: 2,
        xdir: 3,
        shoot: 5,// made by AnonCheat
        scope: 6,
        jump: 7,
        crouch: 8,
        reload: 9,
        weapon: 10,
    };
    const fonts = {
        ssBig: '30px\x20Sans-serif',
        ssSmall: '20px\x20Sans-serif',// made by AnonCheat// made by AnonCheat
        gmBig: '30px\x20GameFont',
        gmSmall: '20px\x20GameFont'// made by AnonCheat
    }
    let settings = {
        isSliding: false,
        distance: Infinity,
        scopingOut: false,
        canShoot: true,
    }

    const downKeys = new Set();
    const upKeys = new Set();// made by AnonCheat

    /**************************************************************/
    let keyDown = (code) => {// made by AnonCheat
        return downKeys.has(code);
    }

    let keyUp = (code) => {
        if (upKeys.has(code)) {
            upKeys.delete(code);// made by AnonCheat
            return true;
        }
        return false;
    }

    let getDistance3D = (fromX, fromY, fromZ, toX, toY, toZ) => {
        var distX = fromX - toX,
            distY = fromY - toY,
            distZ = fromZ - toZ; // made by AnonCheat
        return Math.sqrt(distX * distX + distY * distY + distZ * distZ);
    }

    let getDistance = (player1, player2) => {
        return getDistance3D(player1.x, player1.y, player1.z, player2.x, player2.y, player2.z);
    }

    let getDirection = (fromZ, fromX, toZ, toX) => {
        return Math.atan2(fromX - toX, fromZ - toZ);
    }

    let getXDir = (fromX, fromY, fromZ, toX, toY, toZ) => {
        var dirY = Math.abs(fromY - toY),
            dist = getDistance3D(fromX, fromY, fromZ, toX, toY, toZ);
        return Math.asin(dirY / dist) * (fromY > toY ? -1 : 1);
    }

    let getAngleDist = (start, end) => {// made by AnonCheat
        return Math.atan2(Math.sin(end - start), Math.cos(start - end));
    }

    /**************************************************************/
    function procInputs(me, world, renderer, inputs) {
        const controls = world.controls;
        let get = (entity, string) => {
            if (defined(entity) && entity && entity.active) {
                switch (string) {
                    case 'isYou':
                        return entity[_isYou];
                    case 'objInstances':
                        return entity[_objInstances];
                    case 'inView':
                        return (null == world[_canSee](me, entity.x, entity.y, entity.z)) && (null == world[_canSee](renderer.camera[_getWorldPosition](), entity.x, entity.y, entity.z, 10));
                    case 'isFriendly':
                        return (me && me.team ? me.team : me.spectating ? 0x1 : 0x0) == entity.team;
                    case 'recoilAnimY':
                        return entity[_recoilAnimY];// made by AnonCheat
                }
            }
            return null;
        }

        let autoBhop = (value) => {
            if (!value) return;
            if (keyDown("Space") || value == 1 || value == 3) {
                controls.keys[controls.jumpKey] = !controls.keys[controls.jumpKey];
                if (value >= 2) {
                    if (settings.isSliding) {
                        controls.keys[controls.crouchKey] = 1;
                        return;// made by AnonCheat
                    }
                    if (me.yVel < -0.04 && me.canSlide) {
                        settings.isSliding = true;
                        setTimeout(() => {
                            settings.isSliding = false;
                            controls.keys[controls.crouchKey] = 0;
                        }, 350);
                        controls.keys[controls.crouchKey] = 1;
                    }
                }
            }
        }

        let isLockedOn = false;
        let ty = controls.object.rotation.y;
        let tx = controls[_pchObjc].rotation.x;
        let target = world.players.list.filter(x => {
            x[_cnBSeen] = true;
            return defined(x[_objInstances]) && x[_objInstances] && x.active && !x[_isYou] && get(x, "inView") && !get(x, "isFriendly")
        }).sort((p1, p2) => p1[_objInstances].position.distanceTo(me) - p2[_objInstances].position.distanceTo(me)).shift();
        if (target) {// made by AnonCheat
            let offset1 = ((consts.playerHeight - consts.cameraHeight) - (target.crouchVal * consts.crouchDst));
            let offset2 = consts.playerHeight - consts.headScale / 2 - target.crouchVal * consts.crouchDst;
            ty = getDirection(controls.object.position.z, controls.object.position.x, target.z, target.x);
            tx = getXDir(controls.object.position.x, controls.object.position.y, controls.object.position.z, target.x, target.y + offset2, target.z);
            tx -= consts.recoilMlt * me[_recoilAnimY];
        }


        const ammoLeft = me[_ammos][me[_weaponIndex]];
        if (ammoLeft === 0) {
            world.players.reload(me);
            if (ammoLeft) world.players.endReload(me.weapon);
        }

        autoBhop(2);// made by AnonCheat
    }

    /**************************************************************/
    const original_scale = CanvasRenderingContext2D.prototype.fillRect;
    let hook_scale = new Proxy(original_scale, {
        apply: function(target, _this, _arguments) {
            try {
                var ret = Function.prototype.apply.apply(target, [_this, _arguments]);
                const args = arguments.callee.caller.arguments;
                const renderer = args[2];
                const me = args[3];
                if (me) {
                    if (defined(window.$)) { // made by AnonCheat
                        window.$(document).ready(function() {
                            if (!defined(console.json)) {
                                console.json = object => console.log(JSON.stringify(object, undefined, 2));
                                console.log("jquery Version ", window.$.fn.jquery);
                                console.dir(window);
                                addEventListener("keydown", e => {
                                    if ("INPUT" == window.document.activeElement.tagName) return;
                                    const key = e.key.toUpperCase();
                                    const code = e.code;
                                    if (!downKeys.has(code)) downKeys.add(code);
                                });
                                addEventListener("keyup", e => {
                                    const key = e.key.toUpperCase();
                                    const code = e.code;// made by AnonCheat
                                    if (downKeys.has(code)) downKeys.delete(code);
                                    if (!upKeys.has(code)) upKeys.add(code);
                                })
                            }
                        });
                    }

                    if (!defined(me.procInputs)) {
                        me.procInputs = me[_procInputs];
                    }
                    else// made by AnonCheat
                    {
                        me[_procInputs] = function() {
                            const player = this;
                            const inputs = arguments[0];
                            const world = arguments[1];
                            procInputs(player, world, renderer, inputs);
                            return me.procInputs.apply(this, arguments);
                        }
                    }
                }

            } catch (e) {
                e.stack = e.stack.replace(/\n.*Object\.apply \(<.*/, '');
                throw e;// made by AnonCheat
            }

            return ret;
        }
    });
    CanvasRenderingContext2D.prototype.fillRect = hook_scale;
    conceal_function(original_scale, hook_scale);// made by AnonCheat
})();// made by AnonCheat
