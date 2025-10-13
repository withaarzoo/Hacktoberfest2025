class Solution:
    def findKDistantIndices(self, nums: list[int], key: int, k: int) -> list[int]:
        key_indices = []
        
        # Collect all positions of 'key' in nums
        for i in range(len(nums)):
            if nums[i] == key:
                key_indices.append(i)
        
        result = set()
        
        # For each index in nums, check distance to all key indices
        for i in range(len(nums)):
            for j in key_indices:
                if abs(i - j) <= k:
                    result.add(i)
                    break  # No need to check further once condition is met
        
        return sorted(result)
