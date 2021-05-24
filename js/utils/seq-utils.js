export const sidGenerator = function () {
    let sid = 0;
    return {
        nextSid() {
            return sid++;
        }
    };
};
