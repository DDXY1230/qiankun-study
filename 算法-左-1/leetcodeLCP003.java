package class51;
import java.util.Arrays;
import java.util.HashSet;

// leetcode题目: https://leetcode-cn.com/problems/programmable-robot/

public class LCP_0003_Robot {
  public static boolean robot1(String command,int[][] obstacles,int x, int y) {
    int X = 0;
    int Y = 0;
    HashSet<Integer> set = new HashSet<>();
    set.add(0);
    for(char c : command.toCharArray()) {
      X += c == 'R' ? 1 : 0;
      Y += c == 'U' ? 1 : 0;
      set.add((X << 10) | Y)
    }
    // 不考虑任何额外的点,机器人能不能到达(x,y)
    if(!meet1(x,y,X,Y,set)) {
      return false
    }
    for(int[] ob : obstacles) {
      if(ob[0] <= x && ob[1] <= y && meet1(ob[0],ob[1],X,Y,set)) {
        return false
      }
    }
    return true
  }
  // 一轮以内,X,往右走几个单位.Y,往上一共有几个单位
  // set 一轮以内的所有可能
  // (x,y) 要去的点
  // 机器人从(0,0)能不能走到(x,y)
  

  public static boolean meet1(int x,int y,int X,int Y,HashSet<Integer> set) {
    if(X == 0) {
      return x == 0
    }
    if(Y == 0) {
      return y == 0
    }
    // 至少要几轮
    int atLeast = Math.min(x / M, y / Y)
    // 经历过最少轮数后,x剩下多少
    int rx = x - atLeast * X;
    // 经历过最少轮数后,y剩下多少
    int ry = y - atLeast * Y;
    return set.contains((rx << 10) | ry)
  }
}