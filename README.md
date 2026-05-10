# Sorting algorithm viewer

A sorting algorithm is a method used to arrange elements in a list or array in a specific order, typically numerical or lexicographical. These algorithms are fundamental to computer science as they optimize data retrieval and search operations, such as Binary Search.

## Core Classifications

Comparison vs. Non-Comparison: Comparison-based sorts (e.g., Quick Sort) use operators to compare elements, while non-comparison sorts (e.g., Radix Sort) use internal properties like digits or bit patterns.

Stability: A Stable Sort (e.g., Merge Sort) preserves the relative order of equal elements, whereas an unstable sort (e.g., Heap Sort) may not.

In-Place vs. Out-of-Place: In-place algorithms (e.g., Bubble Sort) use minimal extra memory (O(1)), while out-of-place algorithms (e.g., Merge Sort) require additional space (O(n))

## Common Algorithms Performance:

| Algorithm      | Best Time  | Average Time | Worst Time | Space    | Stable |
| -------------- | ---------- | ------------ | ---------- | -------- | ------ |
| Bubble Sort    | O(n)       | O(n^2)       | O(n^2)     | O(1)     | Yes    |
| Cocktail sort  | O(n)       | O(n^2)       | O(n^2)     | O(1)     | Yes    |
| Insertion Sort | O(n)       | O(n^2)       | O(n^2)     | O(1)     | Yes    |
| Selection Sort | O(n^2)     | O(n^2)       | O(n^2)     | O(1)     | No     |
| Quick Sort     | O(n\*logn) | O(n\*log n)  | O(n^2)     | O(log n) | No     |
| Merge Sort     | O(n\*logn) | O(n\*log n)  | O(n\*logn) | O(n)     | Yes    |
| Heap Sort      | O(n\*logn) | O(n\*log n)  | O(n\*logn) | O(1)     | No     |

## About the web view

Some algorithms are not good to visualize with bars, so in this first version I will implement just some that fit with this type of visualization.
