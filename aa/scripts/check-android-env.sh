#!/bin/bash

# Android Development Environment Check Script
# This script verifies that all required tools are installed and configured

echo "🔍 MyDeen Android Development Environment Check"
echo "=============================================="
echo ""

# Function to check if command exists
check_command() {
    if command -v $1 &> /dev/null; then
        echo "✅ $1 is installed"
        $1 $2 2>&1 | head -n 3
    else
        echo "❌ $1 is not installed"
        echo "   Install instructions: See ANDROID_DEVICE_SETUP.md"
    fi
    echo ""
}

# Function to check Java version specifically
check_java() {
    if command -v java &> /dev/null; then
        echo "✅ Java is installed"
        java -version 2>&1 | head -n 3
        
        # Check if it's the right version (17)
        java_version=$(java -version 2>&1 | grep "openjdk version" | cut -d '"' -f2 | cut -d '.' -f1)
        if [ "$java_version" = "17" ]; then
            echo "   ✅ Java version 17 detected (recommended)"
        else
            echo "   ⚠️  Java version $java_version detected. JDK 17 is recommended for React Native."
        fi
    else
        echo "❌ Java is not installed"
        echo "   Install OpenJDK 17: See ANDROID_DEVICE_SETUP.md"
    fi
    echo ""
}

# Check Node.js
echo "1. Checking Node.js..."
check_command "node" "-v"

# Check npm
echo "2. Checking npm..."
check_command "npm" "-v"

# Check Expo CLI
echo "3. Checking Expo CLI..."
if npm list -g @expo/cli &> /dev/null || command -v expo &> /dev/null; then
    echo "✅ Expo CLI is installed"
    npx expo --version 2>&1 | head -n 1
else
    echo "❌ Expo CLI is not installed globally"
    echo "   Install with: npm install -g @expo/cli"
fi
echo ""

# Check Java
echo "4. Checking Java..."
check_java

# Check ADB
echo "5. Checking Android Debug Bridge (ADB)..."
check_command "adb" "version"

# Check for connected Android devices
echo "6. Checking connected Android devices..."
if command -v adb &> /dev/null; then
    echo "Connected devices:"
    adb devices 2>&1
    
    device_count=$(adb devices | grep -v "List of devices attached" | grep -c "device$")
    if [ $device_count -gt 0 ]; then
        echo "   ✅ $device_count Android device(s) connected"
    else
        echo "   ⚠️  No Android devices connected"
        echo "   Make sure USB debugging is enabled and device is connected"
    fi
else
    echo "   ❌ Cannot check devices - ADB not installed"
fi
echo ""

# Check current directory for MyDeen app
echo "7. Checking MyDeen app setup..."
if [ -f "package.json" ]; then
    if grep -q "mydeen-app" package.json; then
        echo "✅ MyDeen app package.json found"
        
        if [ -f "app.config.js" ]; then
            echo "✅ Expo configuration found"
        else
            echo "❌ app.config.js not found"
        fi
        
        if [ -d "node_modules" ]; then
            echo "✅ Dependencies installed"
        else
            echo "⚠️  Dependencies not installed. Run: npm install"
        fi
        
        if [ -f ".env" ]; then
            echo "✅ Environment configuration found"
        else
            echo "⚠️  .env file not found. Create from .env.example"
        fi
    else
        echo "❌ This doesn't appear to be the MyDeen app directory"
    fi
else
    echo "❌ package.json not found. Make sure you're in the app directory (aa/)"
fi
echo ""

echo "=============================================="
echo "Environment check complete!"
echo ""
echo "📖 For detailed setup instructions, see:"
echo "   docs/ANDROID_DEVICE_SETUP.md"
echo ""
echo "🚀 To start development:"
echo "   npm install"
echo "   npx expo start"