package class48;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Problem_0472_ConcatenatedWords {
  public static class TrieNode {
    public boolean end;
    public TrieNode[] nexts;
    public TrieNode() {
      end = false;
      nexts = new TrieNode[26];
    }
  }
  public static void insert(TrieNode root, char[] s) {
    int path = 0;
    for(char c: s) {
      path = c - 'a';
      if(root.nexts[path] == null) {
        root.nexts[path] = new TrieNode();
      }
      root = root.nexts[path];
    }
    root.end = true;
  }
  // 方法一: 前缀树优化
  public static List<String> findAllConcatenatedWordsInADict1(String[] words) {
    List<String> ans = new ArrayList<>();
    if(words == null || words.length < 3) {
      return ans;
    }
    // 字符串数量>=3
    Arrays.sort(words,(str1,str2) -> str1.length() - str2.length());
    TrieNode root = new TrieNode();
    for(String str: words) {
      char[] s = str.toCharArray();
      if(s.length > 0 && split1(s,root,0)) {
        ans.add(str);
      }else {
        insert(root, s);
      }
    }
    return ans;
  }

  public static boolean split1(char[] s, TrieNode r, int i) {
    boolean ans = false;
    if(i == s.length) {
      ans = true;
    }else {
      TrieNode c = r;
			// s[i.....]
			// s[i..end]作前缀，看看是不是一个元件！f(end+1)...
			for (int end = i; end < s.length; end++) {
				int path = s[end] - 'a';
				if (c.nexts[path] == null) {
					break;
				}
				c = c.nexts[path];
				if (c.end && split1(s, r, end + 1)) {
					ans = true;
					break;
				}
			}
		}
		return ans;
  }
}