var getIntersectionNode = function(headA,headB) {
  if(headA == null || headB == null) {
    returnn null
  }
  let pA = headA,pB = headB
  while(pA != pB) {
    pA = pA == null ? headB : pA.next
    pB = pB == null ? headA : pB.next
  }
  return pA
}