import "./globals.css";

export const metadata = {
  title: "SwiftLink",
  description: "Generate Shortened URL",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
