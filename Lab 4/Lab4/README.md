## Khởi tạo dự án Expo mới
npx create-expo-app Lab4

cd Lab4

## Cài đặt Redux Toolkit và UUID
npm install @reduxjs/toolkit react-redux uuid

## Cài đặt React Navigation và các thư viện hỗ trợ
npm install @react-navigation/native @react-navigation/stack @react-navigation/material-bottom-tabs @react-navigation/drawer --legacy-peer-deps

npm uninstall @react-navigation/material-bottom-tabs 

npx expo install react-native-screens react-native-safe-area-context react-native-gesture-handler react-native-vector-icons react-native-paper @react-native-async-storage/async-storage @react-navigation/bottom-tabs

npx expo install react-native-get-random-values

## Mở file package.json lên
- Tìm dòng có chữ "main".
- Đổi từ: "main": "expo-router/entry"
- Thành: "main": "node_modules/expo/AppEntry.js"

## Tạo file dummy.ts 
- Để fix lỗi file tsconfig.json
- Thêm "allowJs": true vào trong "compilerOptions": {}