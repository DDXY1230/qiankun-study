/**
 * 版本号相同,输出最先的版本
 * 主次相同, 存在增量版本大于不存在
 * 里程碑按照字典序列排列
 */
function getResult(s1, s2) {
  const [major1, minor1, patch1, mile1] = getVersion(s1)
  const [major2, minor2, patch2, mile2] = getVersion(s2)
  if (major1 > major2) return s1;
  else if (major1 < major2) return s2;
  /**
   * 注意下面js判断与空串是否相同, 必须使用===, 不能使用== ,因为0==“”为true
   */
  if (patch1 !== "" || patch2 !== "") {
    if (patch2 === "") {
      return s1
    } else if (patch1 === "") {
      return s2
    }
    if (patch1 > patch2) {
      return s1
    } else if (patch1 < patch2) {
      return s2
    }
  }

  // s1,s2的里程碑的空串判断, 同增量版本
  if (mile2 === "") {
    return s1
  } else if (mile1 === "") {
    return s2
  }
  // 如果s1,s2的里程碑版本都不是空串, 则按照字典序比较
  return mile1 >= mile2 ? s1 : s2;
}

function getVersion(s) {
  let major = ""
  let minor = ""
  let patch = ""
  let mile = ""
  const i = s.indexOf("-")
  let major_minor_patch = ""
  if (i != -1) {
    mile = s.slice(i + 1)
    major_minor_patch = s.slice(0, i)
  } else {
    major_minor_patch = s
  }
  // 非里程碑的部分
  const tmp = major_minor_patch.split('.')
  major = Number(tmp[0])
  minor = Number(tmp[1])
  if (tmp.length > 2) {
    patch = Number(tmp[2])
  }
  return [major, minor, patch, mile]
}
console.log(getResult('2.04.2-bete', '2.3.1-alpha'))