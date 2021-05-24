export const isNnBoxArea = function (sx, sy, dx, dy, dw, dh) {
    return (sx >= dx && sx <= dx + dw) && (sy >= dy && sy <= dy + dh);
};
