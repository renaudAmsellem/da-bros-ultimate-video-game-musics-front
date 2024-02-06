const isFormatSupported = (format) => {
    return new Audio().canPlayType(format) !== ""
}

export const isWebmSupported = isFormatSupported('audio/webm')