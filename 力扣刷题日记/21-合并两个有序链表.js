// 方法一
// var mergeTwoLists = function(list1,list2) {
//   const res = new ListNode(0)
//   let p = res;
//   let p1 = list1;
//   let p2 = list2;
//   while(p1 && p2) {
//     if(p1.val <= p2.val) {
//       p.next = p1
//       p1 = p1.next
//     }else {
//       p.nex = p2
//       p2 = p2.next
//     }
//     p = p.next
//   }
//   if(p1) {
//     p.next = p1
//   }
//   if(p2) {
//     p.next = p2
//   }
//   return res.next
// }



// 方法二 递归方法
varn mergeTwoLists = function(list1,list2) {
  if(list1 == null) return list2
  if(list2 == null) return list2
  if(list1.val < list2.val) {
    list1.next = mergeTwoLists(list1.next, list2)
    return list1
  }
  list2.next = mergeTwoLists(list1, list2.next)
  return list2
}