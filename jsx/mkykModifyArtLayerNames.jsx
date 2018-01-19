(function (){

    var BLEND_MODE_NAMES = {
        "NORMAL": "",
        "COLORBLEND":"カラー",
        "COLORBURN":"焼き込みカラー",
        "COLORDODGE":"覆焼きカラー",
        "DARKEN":"比較（暗）",
        "DIFFERENCE":"差の絶対値",
        "DISSOLVE":"ディザ合成",
        "DIVIDE":"除算",
        "EXCLUSION":"除外",
        "HARDLIGHT":"ハード ライト",
        "HARDMIX":"ハードミックス",
        "HUE":"色相",
        "LIGHTEN":"比較（明）",
        "LINEARBURN":"焼き込み（リニア）",
        "LINEARDODGE":"覆焼き（リニア）加算",
        "LINEARLIGHT":"リニアライト",
        "LUMINOSITY":"輝度",
        "MULTIPLY":"乗算",
        "OVERLAY":"オーバーレイ",
        "PASSTHROUGH":"通過",
        "PINLIGHT":"ピンライト",
        "SATURATION":"彩度",
        "SCREEN":"スクリーン",
        "SOFTLIGHT":"ソフトライト",
        "SUBTRACT":"減算",
        "VIVIDLIGHT":"ビビッドライト"
    };

    var LAYER_KIND_NAMES = {
        "BLACKANDWHITE":"白黒",
        "BRIGHTNESSCONTRAST":"明るさコントラスト",
        "CHANNELMIXER":"チャンネルミキサー",
        "COLORBALANCE":"カラーバランス",
        "CURVES":"トーンカーブ",
        "EXPOSURE":"露光量",
        "GRADIENTFILL":"グラデーション（塗りつぶしレイヤー）",
        "GRADIENTMAP":"グラデーションマップ",
        "HUESATURATION":"色相・彩度",
        "INVERSION":"階調の反転",
        "LEVELS":"レベル補正",
        "NORMAL":"",
        "PATTERNFILL":"パターン（塗りつぶしレイヤー）",
        "PHOTOFILTER":"フィルター",
        "POSTERIZE":"ポスタライズ",
        "SELECTIVECOLOR":"特定色域の選択",
        "SMARTOBJECT":"スマートオブジェクト",
        "SOLIDFILL":"べた塗り（塗りつぶしレイヤー）",
        "TEXT":"テキストレイヤー",
        "THRESHOLD":"しきい値",
        "LAYER3D":"3Dレイヤー",
        "VIBRANCE":"自然な彩度",
        "VIDEO":"ビデオレイヤー",
    };

    function getBlendModeInJa(blendMode) {
        blendMode = "" + blendMode
        var index = blendMode.indexOf("BlendMode.");
        if (index >= 0) {
            blendMode = blendMode.substr(index + 1 + 9);
            if (BLEND_MODE_NAMES[blendMode] != void 0) {
                blendMode = BLEND_MODE_NAMES[blendMode]
            }
        }
        return blendMode;
    }

    function geLayerKindInJa(layerKind) {
        layerKind = "" + layerKind
        var index = layerKind.indexOf("LayerKind.");
        if (index >= 0) {
            layerKind = layerKind.substr(index + 1 + 9);
            if (LAYER_KIND_NAMES[layerKind] != void 0) {
                layerKind = LAYER_KIND_NAMES[layerKind]
            }
        }
        return layerKind;
    }

    function removeArtlayerNameInfo(sep) {
        var artLayers = app.activeDocument.artLayers;
        for (var i=0; i < artLayers.length; i++) {
            var artLayer = artLayers[i];
            var name = artLayer.name;
            var index = name.indexOf(sep)
            if (index >= 0) {
                name = name.substr(0, index)
                $.writeln(name)
                artLayer.name = name
            }
        }
    }
    function addArtlayerNameInfo(sep) {
        removeArtlayerNameInfo(sep)
        var artLayers = app.activeDocument.artLayers;
        for (var i=0; i < artLayers.length; i++) {
            var artLayer = artLayers[i];
            var name = artLayer.name;
            var index = name.indexOf(sep)
            var layerKind = artLayer.kind;
            layerKind = geLayerKindInJa(layerKind)
            if (layerKind != "") {
                layerKind = "[" + layerKind + "]";
            }
            var layerOpacity = Math.round(artLayer.opacity);
            if (layerOpacity == 100) {
                layerOpacity = "";
            } else {
                layerOpacity = layerOpacity + '%';
            }
            var blendMode = artLayer.blendMode;
            blendMode = getBlendModeInJa(blendMode);

            temp = [];
            if (blendMode != "") {
                temp.push(blendMode);
            }
            if (layerOpacity != "") {
                temp.push(layerOpacity);
            }
            if (layerKind != "") {
                temp.push(layerKind);
            }
            if (temp.length > 0) {
                temp = temp.join(" ");
                newName = name + sep + temp;
                $.writeln(newName);
                artLayer.name = newName;
            }
        }
    }
var SEP = ' : '; // 情報部分との区切り文字
try {
    addArtlayerNameInfo(SEP);
} catch (e) {
    alert(e);
}
})();


