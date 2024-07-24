package class52;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.PriorityQueue;

public class Problem_1488_AvoidFloodInTheCity {

  public static class Work implements Comparable<Work> {
    public int lake;
    public int nextRain;
    public Work(int l,int p){
      lake = l;
      nextRain = p;
    }
    @Override
    public int compareTo(Work o) {
      return nextRain - o.nextRain
    }
  }
  // rains[i] = j 第i天轮到j号湖下雨
  // 规定:下雨日,干啥: -1 不下雨日没事做:1
  // 不下雨日,如果没事没有湖泊可以抽返回:1
  public static int[] avoidFlood(int[] rains) {
    int n = rains.length;
    int[] ans = new int[n];
    int[] invalid = new int[0];
    // key: 某个湖泊
    // value: 这个湖泊在那个位置下雨,或者说在哪些天下雨
    // 4: {3,7,19,21} 4号湖泊在3、7、19、21下雨
    // 1: {13}
    // 2: {4,56}
    HashMap<Integer,LinkedList<Integer>> map = new HashMap<>();
    for(int i = 0; i < n; i++) {
      if(rains[i] != 0) {
        //说明第i天有湖泊要下雨
        if(!map.containsKey(rains[i])){
          map.put(rains[i],new LinkedList<>());
        }
        map.get(rains[i]).addLast(i);
      }
    }
    // 没抽干的湖泊表
    // 某个湖泊如果满了,加入set
    // 某个湖泊抽干了,从set中剔除
    HashSet<Integer> set = new HashSet<>();
    // 这个堆的堆顶表示最先处理的湖泊是哪一个
    PriorityQueue<Work> heap = new PriorityQueue();
    for(int i = 0; i < n; i++) {
      if(rains[i] != 0) { // 今天下雨干部了活,返回  -1
        if(set.contains(rains[i])){
          return invalid // 直接返回空数组,因为已经洪水了
        }
        // 放入到没抽干的表中
        set.add(rains[i])
        map.get(rains[i]).pollFirst();
        if(!map.get(rains[i]).isEmpty()) {
          heap.add(new Work(rains[i],map.get(rains[i]).peekFirst()))
        }
        // 题目规定
        ans[i] = -1
      }else {
        // 今天干活,干那个湖泊的活就返回那个湖泊的编号
        if(heap.isEmpty()) {
          ans[i] = 1 // 干活的小堆顶表为空,没活可干返回:1
        }else {
          Work cur = heap.poll();
          set.remove(cur.lake);
          ans[i] = cur.lake;
        }
      }
    }
    return ans;
  }
}