'use strict';

import { split, join } from 'shamir';
import { randomBytes } from 'crypto';
 
const utf8Encoder = new TextEncoder();
const utf8Decoder = new TextDecoder();

function split_secret(secret, share_count, threshold) {
    const secretBytes = utf8Encoder.encode(secret);
    const shares = split(randomBytes, share_count, threshold, secretBytes);
    return JSON.stringify(shares);
}

function join_secret(shares, threshold) {
    const sharesBytes = JSON.parse(shares);
    if (sharesBytes.length > threshold) {
        sharesBytes = sharesBytes.slice(0, threshold);
    }
    const secret = join(sharesBytes);
    return utf8Decoder.decode(secret);
}

window.sss_create = (params) => {
    split_secret(params.secret, params.share_count, params.threshold);
}

window.sss_combine = (params) => {
    join_secret(params.shares, params.threshold);
}