# Safe Theme Usage Guide

## Problem: Hermes Runtime Error
When running React Native apps with Hermes enabled, you might encounter:
```
[runtime not ready]: TypeError: Cannot read property 'background' of undefined
JS engine: Hermes
```

## Root Cause
This error occurs when components try to access theme properties before the Redux store is fully initialized, especially during app startup or when the store state is undefined.

## Solution: Always Use Safe Theme Access Patterns

### ✅ Recommended: Use the Enhanced useThemeColors Hook
```tsx
import { useThemeColors } from '@/theme/theme';

function MyComponent() {
  // This hook now includes built-in safety fallbacks
  const colors = useThemeColors();
  
  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Safe theme usage!</Text>
    </View>
  );
}
```

### ✅ Recommended: Use safeThemeAccess Utility
```tsx
import { useThemeColors, safeThemeAccess } from '@/theme/theme';

function MyComponent() {
  const colors = useThemeColors();
  
  return (
    <View style={{ 
      backgroundColor: safeThemeAccess(colors, 'background', '#FFFFFF')
    }}>
      <Text style={{ 
        color: safeThemeAccess(colors, 'text', '#000000')
      }}>
        Extra safe theme usage!
      </Text>
    </View>
  );
}
```

### ✅ Recommended: Use Fallback Pattern (Already Used in Some Components)
```tsx
function MyComponent() {
  const colors = useThemeColors();
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background || '#FFFFFF', // Safe fallback
    },
    text: {
      color: colors.text || '#000000', // Safe fallback
    }
  });
  
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Text with fallback</Text>
    </View>
  );
}
```

### ❌ Avoid: Direct Property Access Without Fallbacks
```tsx
// DON'T DO THIS - Can crash on Hermes
function BadComponent() {
  const colors = useThemeColors();
  
  return (
    <View style={{ backgroundColor: colors.background }}> {/* Potential crash */}
      <Text style={{ color: colors.text }}>Risky usage</Text>
    </View>
  );
}
```

### ❌ Avoid: Accessing Nested Properties Without Safety Checks
```tsx
// DON'T DO THIS - Can crash if colors is undefined
const backgroundColor = colors.surface || colors.background; // Could crash if colors is undefined
```

## Enhanced Hook Features

The updated `useThemeColors` hook now includes:

1. **Null/undefined state protection**: Returns default theme if Redux state is not available
2. **Partial state handling**: Works even when preferences are partially loaded
3. **Error boundary**: Catches any theme selection errors and returns safe defaults
4. **TypeScript safety**: Ensures all theme properties are always defined

## Testing Your Components

Use this pattern to test theme safety:

```tsx
// Test component with undefined state
const TestWrapper = ({ children, mockState = undefined }) => {
  const mockStore = configureStore({
    reducer: { preferences: () => mockState },
    preloadedState: { preferences: mockState }
  });
  
  return (
    <Provider store={mockStore}>
      {children}
    </Provider>
  );
};

// Test with various states
test('component handles undefined theme state', () => {
  render(
    <TestWrapper mockState={undefined}>
      <MyComponent />
    </TestWrapper>
  );
  // Should not crash
});
```

## Debugging Tips

1. **Check store initialization**: Ensure Redux store is properly set up before rendering theme-dependent components
2. **Add logging**: Temporarily log theme values to identify when they become undefined
3. **Use React DevTools**: Inspect Redux state to see when preferences are loaded
4. **Test on Hermes**: Always test theme changes specifically with Hermes enabled

## For Expo Projects

In your `app.config.js`, ensure Hermes is enabled for testing:
```js
export default {
  expo: {
    jsEngine: 'hermes', // Enable Hermes for testing
    // ... other config
  }
};
```

This ensures you catch theme-related issues during development rather than in production.