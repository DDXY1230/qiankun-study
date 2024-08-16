type BandType<T,K> = T extends K ? never : T;
function log<T>(x: BandType<T,number>) {} //  排除number类型的