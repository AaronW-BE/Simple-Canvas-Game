export const rand = (min = 0, max = 10) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

export const randomRGB = function (min = 0, max = 255) {
    let r = rand(min, max).toString(16);
    let g = rand(min, max).toString(16);
    let b = rand(min, max).toString(16);
    return '#' + r + g + b;
};
