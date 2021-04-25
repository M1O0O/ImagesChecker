const Colors = {};

Colors["_Reset_"] = "\x1b[0m";
Colors["_Under_"] = "\x1b[4m";
Colors["_Reverse_"] = "\x1b[7m";
Colors["_Red_"] = "\x1b[38;2;255;0;0m";
Colors["_Green_"] = "\x1b[38;2;0;255;0m";
Colors["_Yellow_"] = "\x1b[33m";
Colors["_Blue_"] = "\x1b[34m";
Colors["_Magenta_"] = "\x1b[35m";
Colors["_Cyan_"] = "\x1b[36m";
Colors["_White_"] = "\x1b[1m";
Colors["_Orange_"] = "\x1b[38;2;255;150;0m";
Colors["_Violet_"] = "\x1b[38;2;255;0;230m";

module.exports = (msg) => {
    msg += "\x1b[0m";
    
    Object.keys(Colors).forEach(col => {
        msg = msg.replace(new RegExp(col, "g"), Colors[col]);
    });
    
    console.log(msg);
};