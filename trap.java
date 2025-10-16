import java.util.Stack;

class Solution {
    public int trap(int[] height) {
        int n = height.length;
        int water = 0;
        Stack<Integer> st = new Stack<>();

        for (int i = 0; i < n; i++) {
            // while current bar is higher than the top of the stack
            while (!st.isEmpty() && height[i] > height[st.peek()]) {
                int bottom = st.pop(); // index of the valley
                if (st.isEmpty()) break; // no left boundary

                int left = st.peek();  // left boundary index
                int width = i - left - 1; // distance between left & right
                int boundedHeight = Math.min(height[left], height[i]) - height[bottom];
                
                water += width * boundedHeight;
            }
            st.push(i); // push current index
        }

        return water;
    }
}
