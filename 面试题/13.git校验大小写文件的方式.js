/**
 * git 默认忽略大小写,所以有时候我们本地文件夹或者文件已经改成小写的时候,
 * 远程却还是大写的形式.这样就会出现其他文件引用该文件的时候报错
 * 解决方式:git config core.ignorecase false
 * 关闭忽略大小写就是敏感大小写开启即可
 *
 * 修改文件名,这样修改可以清除缓存
 * git mv compCard.vue _compCard.vue
 * git mv _compCard.vue CompCard.vue
 *
 */
