'use client';

import '@ant-design/v5-patch-for-react-19';
import { App, ConfigProvider } from 'antd';
import { PESIRA_GREEN } from '@/lib/theme';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: PESIRA_GREEN,
          colorLink: PESIRA_GREEN,
          borderRadius: 8,
          fontFamily:
            "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        },
        components: {
          Table: { headerBg: '#fafafa', headerColor: '#1f2937' },
          Button: { primaryShadow: 'none' },
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
}
