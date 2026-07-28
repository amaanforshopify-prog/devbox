import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Dashboard } from '@/pages/Dashboard';
import { JsonToolkitPage } from '@/tools/json/page';
import { Base64 } from '@/pages/Base64';
import { PasswordGenerator } from '@/pages/PasswordGenerator';
import { UuidGenerator } from '@/pages/UuidGenerator';
import { HashGenerator } from '@/pages/HashGenerator';
import { RegexTester } from '@/pages/RegexTester';
import { MarkdownPreview } from '@/pages/MarkdownPreview';
import { Settings } from '@/pages/Settings';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="json-formatter" element={<JsonToolkitPage />} />
          <Route path="json-validator" element={<JsonToolkitPage />} />
          <Route path="base64" element={<Base64 />} />
          <Route path="password-generator" element={<PasswordGenerator />} />
          <Route path="uuid-generator" element={<UuidGenerator />} />
          <Route path="hash-generator" element={<HashGenerator />} />
          <Route path="regex-tester" element={<RegexTester />} />
          <Route path="markdown-preview" element={<MarkdownPreview />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}